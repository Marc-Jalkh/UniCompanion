import React from 'react';

import Launch from './src/Launch';
import {ColorThemeProvider} from './src/Common/utils/theme/ColorThemeContex';

function App(): React.JSX.Element {
  return (
    <ColorThemeProvider>
      <Launch />
    </ColorThemeProvider>
  );
}

export default App;
