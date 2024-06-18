import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MerchandiseDetailPage = ({ route }) => {
  const { item, points, onExchange } = route.params;

  const handleExchange = () => {
    onExchange(item.points, item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.brandName}>Seabrew</Text>
        </View>
        <Text style={styles.merchandiseName}>{item.name}</Text>
        <Text style={styles.detailText}>{item.desc}</Text>
        <Text style={styles.sizeText}>Size: {item.size}</Text>
      </View>
      <TouchableOpacity style={styles.exchangeButton} onPress={handleExchange}>
        <Text style={styles.exchangeButtonText}>Exchange now - {item.points} Pts</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  brandName: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    fontSize: 20,
    color: '#375A82',
    fontFamily: 'BigShouldersStencilBold',
  },
  merchandiseName: {
    fontSize: 24,
    fontFamily: 'MontserratBold',
    textAlign: 'left',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  sizeText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'left',
    fontFamily: 'MontserratSemiBold',
  },
  exchangeButton: {
    backgroundColor: '#375A82',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  exchangeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
});

export default MerchandiseDetailPage;