import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import axios from 'axios';
import AppText from '../Components/AppText';
import colors from '../../res/colors.json';
import Icon from 'react-native-vector-icons/Ionicons';
import MapIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {sizeFont, sizeHeight, sizeWidth} from '../../utils/Utils';

interface Property {
  id: string;
  name: string;
  images: string[];
  liked: boolean;
}

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.housivity.com/api/v1/property?city=Gandhinagar&projectType=["pgHostel"]&page=1',
        );
        const updatedData: Property[] = response.data.propertyList.map(
          (item: Property) => ({
            ...item,
            liked: false,
          }),
        );
        setData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleLiked = (id: string) => {
    const updatedData = data.map(item =>
      item.id === id ? {...item, liked: !item.liked} : item,
    );
    setData(updatedData);
  };

  const renderImages: ListRenderItem<{uri: string}> = ({item}) => (
    <Image
      source={{
        uri: `https://logiqproperty.blr1.digitaloceanspaces.com/${item.uri}`,
      }}
      style={styles.image}
    />
  );

  const renderItem: ListRenderItem<Property> = ({item}) => {
    return (
      <View style={styles.card}>
        <FlatList
          horizontal
          data={item.images.map(image => ({uri: image}))}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderImages}
          showsHorizontalScrollIndicator={false}
        />
        <View>
          <View style={styles.subHorizontalContainer}>
            {item.displayPrice.fixedPrice !== null && (
              <AppText style={styles.txtStyle}>
                ₹{item.displayPrice.fixedPrice.toLocaleString()}
              </AppText>
            )}
            <TouchableOpacity onPress={() => toggleLiked(item.id)}>
              <Icon
                name={item.liked ? 'heart' : 'heart-outline'}
                size={sizeWidth(6)}
                color={colors.orange}
              />
            </TouchableOpacity>
          </View>

          <AppText style={[styles.txtStyle, {fontWeight: '500'}]}>
            {item.name}
          </AppText>
          <View style={styles.locationContainer}>
            <MapIcon
              name={'map-marker'}
              size={sizeWidth(6)}
              color={colors.orange}
            />
            <AppText style={styles.txtStyle}>
              {item.address.area}, {item.address.city.name}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizeWidth(3),
    backgroundColor: colors.light_gray,
  },
  card: {
    marginBottom: sizeHeight(2),
    borderRadius: sizeWidth(3),
    backgroundColor: colors.white,
    padding: sizeWidth(3.5),
    elevation: 3,
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
});

export default HomeScreen;


