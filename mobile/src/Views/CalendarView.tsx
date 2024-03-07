import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {TabScreensStyles} from '../Common/utils/Assets/Styles/TabScreensStyles';
import {useTheme} from 'react-native-paper';

function CalendarView(): JSX.Element {
  return (
    <View
      style={{
        ...TabScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
    </View>
  );
}

export default CalendarView;
