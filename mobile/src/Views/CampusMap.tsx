import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Text, useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  image: {
    height: 200,
    borderRadius: 5,
    width: '100%',
    objectFit: 'cover',
    backgroundColor: 'gray',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.4,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  spacing: {
    marginHorizontal: 15,
    marginTop: 15,
  },
});
interface CampusLocation {
  icon: string;
  name: string;
}

function CampusMap(): JSX.Element {
  const theme = useTheme();
  const campusLocations: CampusLocation[] = [
    {icon: 'building', name: 'Main Building'},
    {
      icon: 'building',
      name: 'Library',
    },
    {
      icon: 'building',
      name: 'Cafeteria',
    },
    {
      icon: 'building',
      name: 'Dormitory',
    },
    {
      icon: 'building',
      name: 'Gym',
    },
    {
      icon: 'building',
      name: 'Stadium',
    },
    {
      icon: 'building',
      name: 'Parking Lot',
    },
  ];
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderVariantView />
      <View style={styles.spacing}>
        <Image
          style={styles.image}
          source={require('../Common/utils/Assets/img/usekMap.png')}
        />
      </View>
      <FlatList
        style={ScreensStyles.scrollTabContainer}
        data={campusLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              ...styles.item,
              borderBottomColor: theme.colors.onSecondary,
            }}>
            <Image
              source={{uri: 'https://via.placeholder.com/30'}}
              style={styles.icon}
            />
            <View style={ScreensStyles.marginLeft}>
              <Text variant="titleMedium">{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default CampusMap;
