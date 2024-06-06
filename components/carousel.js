import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'

const shows = [
    { 
      id: 3, 
      name: 'Mystic Mermaid: Jewel of the Sea', 
      image: require('../assets/shows/mermaid1.png'), 
    },
    { 
      id: 4, 
      name: 'Otter Adventure Feeding', 
      image: require('../assets/shows/otter.png'), 
    },
    { 
      id: 5, 
      name: 'Penguin Parade', 
      image: require('../assets/shows/penguin.png'), 
    },
];

const CarouselComponent = () => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image source={item.image} style={styles.carouselImage} />
            </View>
        );
    };

    return (
        <Carousel
            data={shows}
            renderItem={renderItem}
            sliderWidth={ScreenWidth}
            itemWidth={ScreenWidth * 0.8}
            layout='default'
            loop={true}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    carouselImage: {
        width: ScreenWidth * 0.8,
        height: 200,
        resizeMode: 'cover',
    },
});

export default CarouselComponent;