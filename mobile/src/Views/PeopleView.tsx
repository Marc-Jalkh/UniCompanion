import React from 'react';
import {View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';

function PeopleView(): JSX.Element {
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderVariantView />
      <SearchableList
        items={[
          {
            image: 'https://via.placeholder.com/150',
            title: 'Title',
            subTitle: null,
            onPress: () => console.log('On Press'),
            rightText: null,
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Marc',
            subTitle: null,
            onPress: () => console.log('On Press'),
            rightText: null,
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Carl',
            subTitle: null,
            onPress: () => console.log('On Press'),
            rightText: 'Right Text',
          },
        ]}
        isSearchable={true}
        searchPlaceholder="Search for chats"
        rightIcon={false}
      />
    </View>
  );
}

export default PeopleView;
