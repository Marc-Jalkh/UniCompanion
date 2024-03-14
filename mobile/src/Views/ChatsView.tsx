import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';

function ChatsView(): JSX.Element {
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      <SearchableList
        items={[
          {
            image: 'https://via.placeholder.com/150',
            title: 'Title',
            subTitle: 'SubTitle',
            onPress: () => console.log('On Press'),
            rightText: 'Right Text',
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Marc',
            subTitle: 'SubTitle',
            onPress: () => console.log('On Press'),
            rightText: 'Right Text',
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Carl',
            subTitle: 'SubTitle',
            onPress: () => console.log('On Press'),
            rightText: 'Right Text',
          },
        ]}
        isSearchable={true}
        searchPlaceholder="Search for chats"
      />
    </View>
  );
}

export default ChatsView;
