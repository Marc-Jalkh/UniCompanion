import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {TabScreensStyles} from '../Common/utils/Assets/Styles/TabScreensStyles';
import {Text, useTheme} from 'react-native-paper';

function ForYouView(): React.JSX.Element {
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
      <View>
        {/* vertical card */}
        <View>{/* 2card here */}</View>
      </View>
      {/* horizontal card */}
    </View>
  );
}

export default ForYouView;
