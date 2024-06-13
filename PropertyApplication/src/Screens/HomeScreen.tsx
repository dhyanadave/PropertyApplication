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

import {addProperty, removeProperty} from '../Redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {home_screen} from '../../utils/Conts';

interface Property {
  id: string;
  name: string;
  images: string[];
  liked: boolean;
}

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const likedProperties = useSelector(state => state.likedProperties);

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

  const toggleLiked = property => {
    if (property.liked) {
      dispatch(removeProperty(property.id));
    } else {
      dispatch(addProperty(property));
    }
    const updatedData = data.map(item =>
      item.id === property.id ? {...item, liked: !item.liked} : item,
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
            <TouchableOpacity onPress={() => toggleLiked(item)}>
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
      <View style={styles.header}>
        <AppText>{home_screen}</AppText>
      </View>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignSelf: 'center'}}
          size="large"
          color="#0000ff"
        />
      ) : (
        <View style={styles.flatListView}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  flatListView: {padding: sizeWidth(3)},
  header: {
    width: '100%',
    backgroundColor: colors.white,
    elevation: 3,
    marginBottom: sizeHeight(0.5),
    padding: sizeWidth(3),
  },
});

export default HomeScreen;
