import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image, Modal, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import CurrencyInput from 'react-native-currency-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import backgroundImage from '../assets/Background.png';
import animatedOtter from '../assets/animatedotter.gif';
import Bundle from '../assets/data/bundledata.js';
import shows from '../assets/data/showdata.js';
import MerchandiseData from '../assets/data/merchandisedata.js';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState('Mon');
  const filteredBundles = Bundle.filter(bundle => bundle.id >= 1 && bundle.id <= 4);
  const filteredCarousel = shows.filter(show => show.id >= 3 && show.id <= 5);
  const [attempts, setAttempts] = useState(0);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [wonItem, setWonItem] = useState(null);

  const auth = getAuth();
  const db = getFirestore();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const otterPosition = useRef(new Animated.ValueXY({ x: width - 120, y: height - 220 })).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerRef.current) {
        setCurrentPage(prevPage => {
          const nextPage = (prevPage + 1) % filteredCarousel.length;
          pagerRef.current.setPage(nextPage);
          return nextPage;
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [filteredCarousel.length]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, `users/${currentUser.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setAttempts(userData.attempts || 0);
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const moveOtter = () => {
      const x = Math.random() * (width - 100);
      const y = Math.random() * (height - 200);
      Animated.timing(otterPosition, {
        toValue: { x, y },
        duration: 4000, // Perpanjang durasi animasi menjadi 4 detik
        useNativeDriver: false,
      }).start();
    };

    const interval = setInterval(moveOtter, 5000); // Interval pergerakan setiap 5 detik
    return () => clearInterval(interval);
  }, [otterPosition]);

  const filterShowsByDay = (day) => {
    const filteredShows = shows.filter(show => show.day.includes(day));
    return filteredShows;
  };

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  const handleOtterPress = async () => {
    if (attempts >= 5) {
      setModalMessage('You have reached the maximum number of attempts for today.');
      setModalVisible(true);
      return;
    }

    const win = Math.random() < 0.3;
    const userDocRef = doc(db, `rewards/${user.uid}`);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, { rewards: [], attempts: 0 });
    }

    if (win) {
      const reward = MerchandiseData[Math.floor(Math.random() * MerchandiseData.length)];
      const rewardWithQuantity = { ...reward, quantity: 1 };

      await updateDoc(userDocRef, {
        rewards: arrayUnion(rewardWithQuantity),
        attempts: increment(1),
      });
      setWonItem(reward);
      setModalMessage(`Congratulations! You won a ${reward.name}`);
    } else {
      await updateDoc(userDocRef, {
        attempts: increment(1),
      });
      setWonItem(null);
      setModalMessage('Sorry, better luck next time!');
    }
    setAttempts(attempts + 1);
    setModalVisible(true);
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.content}>
          {/* Animated Otter */}
          <Animated.View style={[styles.otterContainer, otterPosition.getLayout(), { zIndex: 1000 }]}>
            <TouchableOpacity onPress={handleOtterPress}>
              <Image source={animatedOtter} style={styles.otterImage} />
            </TouchableOpacity>
          </Animated.View>

          {/* Pager View for recommended shows */}
          <View style={styles.pagerViewContainer}>
            <PagerView ref={pagerRef} style={styles.pagerView} initialPage={0} onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
              {filteredCarousel.map((show) => (
                <View key={show.id} style={styles.page}>
                  <ImageBackground source={show.image} style={styles.pageImage}>
                    <View style={styles.darkness}>
                      <Text style={styles.pageName}>{show.name}</Text>
                    </View>
                    <View style={styles.seaBrewTextContainer}>
                      <Text style={styles.seaBrewText}>SeaBrew</Text>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </PagerView>
            {/* Carousel Indicators */}
            <View style={styles.indicatorContainer}>
              {filteredCarousel.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    { backgroundColor: currentPage === index ? '#4DC3FC' : 'white' }
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Container Top Pick Bundle */}
          <View style={styles.topPickContainer}>
            <Text style={styles.topPickTitle}>Top Pick Bundle</Text>
            <View style={styles.bundleWrapper}>
              {filteredBundles.map(bundle => (
                <View key={bundle.id} style={styles.bundleContainer}>
                  <View style={styles.bundleInfo}>
                    <Text style={styles.bundleName}>{bundle.name}</Text>
                    <Text style={styles.bundleDescription}>{bundle.desc}</Text>
                  </View>
                  <CurrencyInput 
                    style={styles.bundlePrice}
                    value={bundle.price}
                    prefix="IDR "
                    delimiter="."
                    separator=","
                    precision="0"
                    editable={false}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.seeAllContainer} onPress={() => navigation.navigate('BundleScreen')}>
              <Text style={styles.seeAllText}>See More </Text>
              <FontAwesome name="chevron-right" size={14} color="#375A82" style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Container Available Show */}
          <View style={styles.availableShowContainer}>
            <Text style={styles.availableShowTitle}>Available Show</Text>
            <View style={styles.dayButtonWrapper}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {days.map(day => (
                  <TouchableOpacity 
                    key={day} 
                    style={[styles.dayButton, selectedDay === day ? styles.selectedDay : null]} 
                    onPress={() => handleDayPress(day)}>
                    <Text style={[styles.dayButtonText, selectedDay === day ? styles.selectedDayText : null]}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.gridContainer}>
              {filterShowsByDay(selectedDay).map((show) => (
                <View key={show.id} style={styles.showContainer}>
                  <ImageBackground source={show.image} style={styles.showImage}>
                    <View style={styles.darkness}>
                      <Text style={styles.showName}>{show.name}</Text>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.seeAllContainer} onPress={() => navigation.navigate('ShowList')}>
              <Text style={styles.seeAllText}>See More </Text>
              <FontAwesome name="chevron-right" size={14} color="#375A82" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {wonItem && ( // Tampilkan gambar hadiah hanya jika ada hadiah yang dimenangkan
              <Image
                source={wonItem.image}
                style={{ width: 100, height: 100, marginBottom: 10 }}
              />
            )}
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  otterContainer: {
    position: 'absolute',
  },
  otterImage: {
    width: 70,
    height: 70,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 60,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'relative',
  },
  icon: {
    marginTop: 4.2,
    marginLeft: 5,
  },
  topPickContainer: {
    marginTop: 20,
  },
  topPickTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: '#375A82',
  },
  availableShowContainer: {
    width: '95%',
    marginTop: 20,
    marginBottom: 20,
  },
  availableShowTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
    color: '#375A82',
  },
  bundleWrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#B3E0F5',
    borderRadius: 10,
  },
  bundleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    alignItems: 'center',
  },
  bundleInfo: {
    flex: 1,
  },
  bundleName: {
    fontFamily: 'MontserratBold',
    fontSize: 13,
    color: '#375A82',
  },
  bundleDescription: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: '#375A82',
    width: '90%',
  },
  bundlePrice: {
    fontFamily: 'MontserratBold',
    fontSize: 15,
    color: '#375A82',
  },
  seeAllContainer: {
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seeAllText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#375A82',
  },
  dayButtonWrapper: {
    width: '100%',
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    paddingHorizontal: 5,
    marginHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: '#B3E0F5',
    width: 50,
    alignItems: 'center',
  },
  selectedDay: {
    color: 'white',
    backgroundColor: '#375A82',
  },
  dayButtonText: {
    fontFamily: 'MontserratMedium',
    fontSize: 13,
    color: '#375A82',
  },
  selectedDayText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'MontserratBold',
  },
  selectedDayTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  showImage: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkness: {
    backgroundColor: 'rgba(0,0,0,0.19)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showName: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 11,
    color: 'white',
    width: '90%',
    textAlign: 'center',
    opacity: 1.1,
  },
  pageName: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 26,
    color: 'white',
    width: '100%',
    textAlign: 'center',
    opacity: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  showContainer: {
    width: '48%',
    backgroundColor: '#B3E0F5',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
  },
  pagerViewContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  pagerView: {
    width: '100%',
    height: 200,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  seaBrewTextContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  seaBrewText: {
    fontFamily: 'BigShouldersStencilBold',
    fontSize: 15,
    color: '#B3E0F5',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    width: 250, 
    height: 250, 
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#375A82',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#375A82',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: 'white',
  },
});

export default Home;