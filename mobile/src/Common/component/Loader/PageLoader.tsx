import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useColorTheme} from '../../utils/theme/ColorThemeContex';

const PageLoader = () => {
  const {colors} = useColorTheme();

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default PageLoader;
