import React from 'react';

import Launch from './src/Launch';
import {PaperProvider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/Common/utils/theme/colors';
import {useColorScheme} from 'react-native';

// import {themeMode} from './src/Common/utils/theme/store';

function App(): React.JSX.Element {
  const themeMode = useColorScheme();

  return (
    <PaperProvider
      theme={
        // lightTheme
        // eslint-disable-next-line eqeqeq
        themeMode != 'light' ? lightTheme : darkTheme
      }>
      <Launch />
    </PaperProvider>
  );
}

export default App;
