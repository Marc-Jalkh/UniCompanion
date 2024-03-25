import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';
import {useNavigation} from '@react-navigation/native';

function ChatsView(): JSX.Element {
  const navigation = useNavigation();
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
            onPress: () => navigation.navigate('SingleChat', {param1: 'Title'}),
            rightText: 'Right Text',
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Marc',
            subTitle: 'SubTitle',
            onPress: () => navigation.navigate('SingleChat', {param1: 'Marc'}),
            rightText: 'Right Text',
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Carl',
            subTitle: 'SubTitle',
            onPress: () => navigation.navigate('SingleChat', {param1: 'Carl'}),
            rightText: 'Right Text',
          },
        ]}
        isSearchable={true}
        searchPlaceholder="Search for chats"
        rightIcon={true}
      />
    </View>
  );
}

export default ChatsView;
