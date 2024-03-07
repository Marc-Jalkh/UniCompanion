// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import HeaderView from '../Common/component/Header/Header';
import {TabScreensStyles} from '../Common/utils/Assets/Styles/TabScreensStyles';

function HomeView(): React.JSX.Element {
  return (
    <View
      style={{
        ...TabScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />

      <View>
        <Text>Hello text from api</Text>
        <Text>Name From Api</Text>
      </View>
      <View>{/* 4 circles */}</View>
      {/* Coponent card */}
      <View>
        <Text>Post</Text>
        {/* Cards  */}
      </View>
    </View>
  );
}

export default HomeView;
