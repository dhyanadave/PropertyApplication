import React from 'react';
import {View, FlatList, Image, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import AppText from '../Components/AppText';
import colors from '../../res/colors.json';
import {sizeFont, sizeHeight, sizeWidth} from '../../utils/Utils';
import { saved_property } from '../../utils/Conts';

interface Property {
  id: string;
  name: string;
  images: string[];
  displayPrice: {
    fixedPrice: number | null;
  };
  address: {
    area: string;
    city: {
      name: string;
    };
  };
}

const SavedPropertiesScreen: React.FC = () => {
  const savedProperties = useSelector((state: any) => state.likedProperties);

  const renderItem = ({item}: {item: Property}) => (
    <View style={styles.card}>
      <FlatList
        horizontal
        data={item.images.map(image => ({uri: image}))}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Image
            source={{
              uri: `https://logiqproperty.blr1.digitaloceanspaces.com/${item.uri}`,
            }}
            style={styles.image}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View>
        <View style={styles.subHorizontalContainer}>
          {item.displayPrice.fixedPrice !== null && (
            <AppText style={styles.txtStyle}>
              ₹{item.displayPrice.fixedPrice.toLocaleString()}
            </AppText>
          )}
        </View>

        <AppText style={[styles.txtStyle, {fontWeight: '500'}]}>
          {item.name}
        </AppText>
        <View style={styles.locationContainer}>
          <AppText style={styles.txtStyle}>
            {item.address.area}, {item.address.city.name}
          </AppText>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={styles.header}>
        <AppText>{saved_property}</AppText>
      </View>
      <View style={styles.container}>
        <View>
          <FlatList
            data={savedProperties}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: sizeWidth(3),
    backgroundColor: colors.white,
  },

  card: {
    marginBottom: sizeHeight(2),
    borderRadius: sizeWidth(3),
    backgroundColor: colors.white,
    padding: sizeWidth(3.5),
    elevation: 2,
    borderColor: colors.light_gray,
    borderWidth: sizeWidth(0.2),
  },
  image: {
    width: sizeWidth(65),
    height: sizeHeight(19),
    borderRadius: sizeWidth(3),
    marginRight: sizeWidth(5),
  },
  subHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: sizeHeight(2),
  },
  txtStyle: {
    fontSize: sizeFont(4),
    color: colors.black,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizeHeight(2),
  },
  header: {
    width: '100%',
    backgroundColor: colors.white,
    elevation: 3,
    marginBottom: sizeHeight(0.5),
    padding: sizeWidth(3),
  }
});

export default SavedPropertiesScreen;
