import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';

function ForgotPassView(): React.JSX.Element {
  const themeMode = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const AlertButton = () =>
    Alert.alert(
      'Forgot Password!',
      'An email will be sent to you to reset your password',
      [{text: 'OK', onPress: () => navigation.navigate('Login')}],
    );
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: themeMode.colors.background,
      }}>
      <Text
        variant="displaySmall"
        style={{
          ...ScreensStyles.alignCenter,
          ...ScreensStyles.marginTop,
          color: themeMode.colors.secondary,
        }}>
        UniCompaniøn
      </Text>
      <View style={ScreensStyles.onBoardingContainer}>
        <TextInput
          style={ScreensStyles.fullWidth}
          mode="outlined"
          label="Email: "
          placeholder="Enter your Email"
          value={email}
          onChangeText={text => setEmail(text)}
          textColor={themeMode.colors.secondary}
          placeholderTextColor={themeMode.colors.onSecondary}
          outlineColor={themeMode.colors.secondary}
        />
        <Button
          mode="contained"
          style={{
            ...ScreensStyles.customButton,
            ...ScreensStyles.marginTop,
          }}
          contentStyle={ScreensStyles.smallPaddingVertical}
          buttonColor={themeMode.colors.secondary}
          textColor={themeMode.colors.background}
          onPress={() => AlertButton()}>
          Reset Password
        </Button>
        <View style={ScreensStyles.horizontalContainer}>
          <Text
            variant="bodyMedium"
            style={{
              color: themeMode.colors.onSecondary,
              ...ScreensStyles.paddingVertical,
              ...ScreensStyles.alignCenter,
            }}>
            You Remember now?{' '}
          </Text>
          <Button
            mode="text"
            textColor={themeMode.colors.secondary}
            onPress={() => navigation.navigate('Login')}>
            click here
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ForgotPassView;
