import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const MerchandiseRewardPage = ({ route }) => {
  const { rewards } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>My Rewards</Text>
        <View style={styles.merchandiseContainer}>
          {rewards.map((item, index) => (
            <View key={index} style={styles.merchandiseItem}>
              <Image source={item.image} style={styles.image} />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  merchandiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  merchandiseItem: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default MerchandiseRewardPage;
