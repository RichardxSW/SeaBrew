import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, ImageBackground, ActivityIndicator } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import QRCode from "react-native-qrcode-svg";
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import MerchandiseData from '../assets/data/merchandisedata';

const MerchandiseRewardPage = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const fetchRewards = async () => {
    setLoading(true);
    try {
      const rewardsRef = doc(db, `rewards/${user.uid}`);
      const docSnap = await getDoc(rewardsRef);
      if (docSnap.exists()) {
        const rewardsData = docSnap.data().rewards;
        if (Array.isArray(rewardsData)) {
          setRewards(rewardsData);
        } else {
          console.log('No rewards array found!');
        }
      } else {
        console.log('No rewards found!');
      }
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRewards();
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchRewards();
      }
    }, [user])
  );

  const handlePress = (reward) => {
    setSelectedReward(reward);
    setModalVisible(true);
  };

  const getMerchandiseImage = (id) => {
    const merchandise = MerchandiseData.find(item => item.id === id);
    return merchandise ? merchandise.image : null;
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.merchandiseContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#375A82" />
            ) : rewards.length === 0 ? (
              <View style={styles.noRewardsContainer}>
                <Text style={styles.noRewardsText}>No rewards claimed yet</Text>
              </View>
            ) : (
              rewards.map((item, index) => (
                <TouchableOpacity key={index} style={styles.merchandiseItem} onPress={() => handlePress(item)}>
                  <View style={styles.imageContainer}>
                    <Image source={getMerchandiseImage(item.id)} style={styles.image} />
                    <Text style={styles.brandName}>Seabrew</Text>
                  </View>
                  <View style={styles.innerContainer}>
                    <Text style={styles.mercname}>{item.name}</Text>
                    <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedReward && (
                <>
                  <Text style={styles.modalTitle}>{selectedReward.name}</Text>
                  <Image source={require('../assets/qrillust.png')} style={{ width: 200, height: 200 }} />
                  <Text style={styles.modalQuantity}>Quantity: {selectedReward.quantity}</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    width: '100%', // Melebarkan kontainer sampai samping
    paddingHorizontal: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#375A82',
    padding: 10,
    borderRadius: 10,
  },
  merchandiseContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  merchandiseItem: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#B3E0F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  mercname: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'MontserratBold',
  },
  quantityText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat',
    marginTop: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  brandName: {
    position: 'absolute',
    bottom: 10,
    left: 38,
    fontSize: 13,
    color: '#375A82',
    fontFamily: 'BigShouldersStencilBold',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'MontserratBold',
  },
  modalQuantity: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Montserrat',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#375A82',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  noRewardsContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  noRewardsText: {
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#375A82',
    marginBottom: 20,
  },
});

export default MerchandiseRewardPage;