/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  console.log('section');
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function useUserViewModel() {
  const [counter, setCounter] = useState(0);
  //use state with use ref or callback ?
  const [user, setUser] = useState(null);
  console.log('user', user);
  useEffect(() => {
    console.log('user updated', counter);
  }, [counter]);

  return {
    user,
    updateUser: (newUser: React.SetStateAction<null>) => {
      setUser(newUser);
      setCounter(counter + 1);
    },
  };
}

const AppContext = createContext({});

function NewAppScreen(): React.JSX.Element {
  const {UserViewModel} = useContext(AppContext);
  const [usere, setUser] = useState(null);
  console.log(UserViewModel);
  return (
    <>
      <Text>hello</Text>
      <Text>{UserViewModel.user}</Text>
      <Button
        onPress={() => {
          UserViewModel.updateUser('new user');
        }}
        title="update User"
      />
      <Text>{usere}</Text>
      <Button onPress={() => setUser("hello")} title="update User" />
    </>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [UserViewModel] = useState(useUserViewModel());
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log('big problem');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppContext.Provider value={{userViewModel}}>
        <NewAppScreen />
        <Section title="Step One">
          <DebugInstructions />
        </Section>
      </AppContext.Provider>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
