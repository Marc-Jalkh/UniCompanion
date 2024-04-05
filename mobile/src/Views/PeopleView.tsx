import React from 'react';
import {View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';

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
      id: 1,
      name: 'Marcs',
      image: 'https://via.placeholder.com/150',
      usekId: '202200507',
      faculty: '',
    },
    {
      id: 1,
      name: 'Marcx',
      image: 'https://via.placeholder.com/150',
      usekId: '202200507',
      faculty: '',
    },
  ];
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
            onPress: () => console.log('On Press'),
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
