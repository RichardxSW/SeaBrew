import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MerchandiseDetailPage = ({ route }) => {
  const { item, points, onExchange } = route.params;

  const handleExchange = () => {
    onExchange(item.points, item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.merchandiseName}>{item.name}</Text>
      <Text style={styles.detailTitle}>Detail</Text>
      <Text style={styles.detailText}>Special merchandise from SeaBrew</Text>
      <Text style={styles.points}>Total Points: {points} Points</Text>
      <Text style={styles.price}>Price: {item.points} Points</Text>
      <TouchableOpacity style={styles.exchangeButton} onPress={handleExchange}>
        <Text style={styles.exchangeButtonText}>Exchange now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  merchandiseName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  points: {
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    marginVertical: 10,
  },
  exchangeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  exchangeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MerchandiseDetailPage;
