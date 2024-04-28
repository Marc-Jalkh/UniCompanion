import React from 'react';
import {View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';
import {useNavigation} from '@react-navigation/native';

function PeopleView(): JSX.Element {
  const data: User[] = [
    {
      id: 1,
      name: 'Marc',
      image: 'https://via.placeholder.com/150',
      usekId: '202200507',
      faculty: '',
    },
    {
      id: 2,
      name: 'Marcs',
      image: 'https://via.placeholder.com/150',
      usekId: '202200507',
      faculty: 'test',
    },
    {
      id: 3,
      name: 'Marcx',
      image: 'https://via.placeholder.com/150',
      usekId: '202200507',
      faculty: '',
    },
  ];
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderVariantView />
      <SearchableList
        items={data.map(user => {
          return {
            image: user.image,
            title: user.name,
            subTitle: user.usekId,
            onPress: () => {
              navigation.navigate('SingleChat', {
                param1: user.name,
                param2: user.id.toString(),
                param3: user.faculty,
                param4: user.image,
              });
            },
            rightText: 'Right Text',
          };
        })}
        isSearchable={true}
        searchPlaceholder="Search for chats"
        rightIcon={false}
      />
    </View>
  );
}

export default PeopleView;
