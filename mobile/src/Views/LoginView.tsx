import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useAuth} from '../Data/Domain/AuthenticationContext';

function LoginView(): React.JSX.Element {
  const themeMode = useTheme();
  const navigation = useNavigation();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {login, errorMsg, setError} = useAuth();
  useEffect(() => {
    if (errorMsg !== '') {
      Alert.alert(errorMsg);
      setError('');
    }
  }, [errorMsg, setError]);
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: themeMode.colors.background,
      }}>
      <View style={[ScreensStyles.container, ScreensStyles.alignCenter]}>
        <Image
          style={[
            ScreensStyles.OnBoardingImage,
            {tintColor: themeMode.colors.secondary},
          ]}
          source={require('../Common/utils/Assets/img/usek.png')}
        />
      </View>
      <View
        style={[ScreensStyles.onBoardingContainer, ScreensStyles.marginTop]}>
        <TextInput
          style={ScreensStyles.fullWidth}
          mode="outlined"
          label="Id: "
          placeholder="Enter your id"
          value={id}
          onChangeText={text => setId(text)}
          textColor={themeMode.colors.secondary}
          placeholderTextColor={themeMode.colors.onSecondary}
          outlineColor={themeMode.colors.secondary}
        />
        <TextInput
          style={ScreensStyles.fullWidth}
          mode="outlined"
          label="Password"
          placeholder="Type something"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={passwordVisibility}
          textColor={themeMode.colors.secondary}
          placeholderTextColor={themeMode.colors.onSecondary}
          outlineColor={themeMode.colors.secondary}
          // right={
          //   // <TextInput.Icon
          //   //   icon="eye"
          //   //   onPress={() => setPasswordVisibility(!passwordVisibility)}
          //   // />
          // }
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
          onPress={() => login(id, password)}>
          Login
        </Button>
        <View style={ScreensStyles.horizontalContainer}>
          <Text
            variant="bodyMedium"
            style={{
              color: themeMode.colors.onSecondary,
              ...ScreensStyles.paddingVertical,
              ...ScreensStyles.alignCenter,
            }}>
            Forgot your password?{' '}
          </Text>
          <Button
            mode="text"
            textColor={themeMode.colors.secondary}
            onPress={() => navigation.navigate('ForgotPass')}>
            Reset Password
          </Button>
        </View>
      </View>
    </View>
  );
}

export default LoginView;
function alert(errorMsg: string) {
  throw new Error('Function not implemented.');
}

