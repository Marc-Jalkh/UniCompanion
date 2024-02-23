import React from 'react';

import Launch from './src/Launch';
import {PaperProvider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/Common/utils/theme/colors';
import {useTheme} from '@react-navigation/native';
// import {themeMode} from './src/Common/utils/theme/store';

function App(): React.JSX.Element {
  return (
    <PaperProvider
      theme={
        darkTheme
        // themeMode === 'light' ? lightTheme : darkTheme
      }>
      <Launch />
    </PaperProvider>
  );
}

export default App;
