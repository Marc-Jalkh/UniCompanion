import * as React from 'react';
import TabView from './TabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../Data/Domain/AuthenticationContext';
import OnBoardingView from '../Views/OnBoarding';
import LoginView from '../Views/LoginView';
import Posts from '../Views/Posts';
import ForgotPassView from '../Views/ForgotPassword';
import Post from '../Views/SinglePost';

type Routes = {
  Login: undefined;
  OnBoarding: undefined;
  TabView: undefined;
  Posts: undefined;
  id: {id: string};
  sadBoarding: undefined;
  ForgotPass: undefined;
  Post: {param1: string};
};

const StackNavigator = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<Routes>();
  const {isAuthenticated} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName="TabView"
      screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="TabView" component={TabView} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="OnBoarding" component={OnBoardingView} />
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="ForgotPass" component={ForgotPassView} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
