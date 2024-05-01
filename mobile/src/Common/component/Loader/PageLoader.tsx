import React from 'react';
import {View} from 'react-native';
import {useTheme, ActivityIndicator} from 'react-native-paper';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';

const PageLoader = () => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        ...ScreensStyles.fullHeight,
        ...ScreensStyles.alignCenter,
      }}>
      <ActivityIndicator animating={true} color={colors.primary} size="large" />
    </View>
  );
};

export default PageLoader;
