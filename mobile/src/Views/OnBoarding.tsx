import React from 'react';
import {View} from 'react-native';
import {TabScreensStyles} from '../Common/utils/Assets/Styles/TabScreensStyles';
import {Button, Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

function OnBoardingView(): React.JSX.Element {
  const themeMode = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...TabScreensStyles.container,
        backgroundColor: themeMode.colors.background,
      }}>
      <View style={TabScreensStyles.onBoardingContainer}>
        <Text
          variant="displaySmall"
          style={{
            ...TabScreensStyles.alignCenter,
            color: themeMode.colors.secondary,
          }}>
          Come & Learn
        </Text>
        <Text
          variant="displaySmall"
          style={{
            ...TabScreensStyles.alignCenter,
            color: themeMode.colors.secondary,
          }}>
          with us it's fun 🎓
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: themeMode.colors.onSecondary,
            ...TabScreensStyles.paddingVertical,
            ...TabScreensStyles.alignCenter,
          }}>
          Uni Companion is your best friend in your academic journey, it's a one
          stop solution for all your academic needs.{' '}
        </Text>
        <Button
          mode="contained"
          style={TabScreensStyles.customButton}
          contentStyle={TabScreensStyles.smallPaddingVertical}
          buttonColor={themeMode.colors.secondary}
          textColor={themeMode.colors.background}
          onPress={() => navigation.navigate('Login')}>
          Let's Get Started
        </Button>
      </View>
    </View>
  );
}

export default OnBoardingView;
