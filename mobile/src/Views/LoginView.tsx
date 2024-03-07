import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {TabScreensStyles} from '../Common/utils/Assets/Styles/TabScreensStyles';
import {useAuth} from '../Data/Domain/AuthenticationContext';

function LoginView(): React.JSX.Element {
  const themeMode = useTheme();
  const navigation = useNavigation();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  return (
    <View
      style={{
        ...TabScreensStyles.container,
        backgroundColor: themeMode.colors.background,
      }}>
      <Text
        variant="displaySmall"
        style={{
          ...TabScreensStyles.alignCenter,
          ...TabScreensStyles.marginTop,
          color: themeMode.colors.secondary,
        }}>
        UniCompaniøn
      </Text>
      <View style={TabScreensStyles.onBoardingContainer}>
        <TextInput
          style={TabScreensStyles.fullWidth}
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
          style={TabScreensStyles.fullWidth}
          mode="outlined"
          label="Password"
          placeholder="Type something"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={passwordVisibility}
          textColor={themeMode.colors.secondary}
          placeholderTextColor={themeMode.colors.onSecondary}
          outlineColor={themeMode.colors.secondary}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordVisibility(!passwordVisibility)}
            />
          }
        />
        <Button
          mode="contained"
          style={{
            ...TabScreensStyles.customButton,
            ...TabScreensStyles.marginTop,
          }}
          contentStyle={TabScreensStyles.smallPaddingVertical}
          buttonColor={themeMode.colors.secondary}
          textColor={themeMode.colors.background}
          onPress={() => login()}>
          Login
        </Button>
        <View style={TabScreensStyles.horizontalContainer}>
          <Text
            variant="bodyMedium"
            style={{
              color: themeMode.colors.onSecondary,
              ...TabScreensStyles.paddingVertical,
              ...TabScreensStyles.alignCenter,
            }}>
            Forgot your password?{' '}
          </Text>
          <Button
            mode="text"
            textColor={themeMode.colors.secondary}
            onPress={() => navigation.navigate('Login')}>
            Reset Password
          </Button>
        </View>
      </View>
    </View>
  );
}

export default LoginView;
