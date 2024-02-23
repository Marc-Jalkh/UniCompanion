import React from 'react';
import {View} from 'react-native';
import {useTheme, ActivityIndicator} from 'react-native-paper';

const PageLoader = () => {
  const {colors} = useTheme();

  return (
    <View>
      <ActivityIndicator animating={true} color={colors.primary} size="large" />
    </View>
  );
};

export default PageLoader;
