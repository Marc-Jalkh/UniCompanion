import * as React from 'react';
import TabView from './TabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../Data/Domain/AuthenticationContext';
import OnBoardingView from '../Views/OnBoarding';
import LoginView from '../Views/LoginView';
import Posts from '../Views/Posts';
import ForgotPassView from '../Views/ForgotPassword';
import Post from '../Views/SinglePost';
import PeopleView from '../Views/PeopleView';
import WalletView from '../Views/WalletView';
import GradesView from '../Views/GradesView';
import CoursesView from '../Views/CoursesView';
import SingleChat from '../Views/SingleChat';
import CampusMap from '../Views/CampusMap';

type Routes = {
  Login: undefined;
  OnBoarding: undefined;
  TabView: undefined;
  Posts: undefined;
  id: {id: string};
  sadBoarding: undefined;
  ForgotPass: undefined;
  Post: {param1: Post};
  People: undefined;
  Wallet: undefined;
  Grades: undefined;
  Courses: undefined;
  SingleChat: {param1: string};
  'Campus Map': undefined;
};

const StackNavigator = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<Routes>();
  const {isAuthenticated, checkToken} = useAuth();
  React.useEffect(() => {
    checkToken();
  }, [checkToken]);
  return (
    <Stack.Navigator
      initialRouteName="TabView"
      screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="TabView" component={TabView} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="People" component={PeopleView} />
          <Stack.Screen name="Wallet" component={WalletView} />
          <Stack.Screen name="Grades" component={GradesView} />
          <Stack.Screen name="Courses" component={CoursesView} />
          <Stack.Screen name="SingleChat" component={SingleChat} />
          <Stack.Screen name="Campus Map" component={CampusMap} />
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
