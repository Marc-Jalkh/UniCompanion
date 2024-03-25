import React from 'react';
import {View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {RowData} from '../Common/component/TableDisplay/TableDisplay';
import TablesView from '../Common/component/TableDisplay/TablesView';

type DataObject = {
  [key: string]: RowData[];
};

function WalletView(): JSX.Element {
  const data: DataObject = {
    semester1: [
      {
        Source: 'Arts and sciences school',
        Amount: '1000',
        name: 'John',
        age: '30',
      },
      {Source: 'Scholarship', Amount: '-500'},
    ],
    semester2: [
      {Source: 'Arts and sciences school', Amount: '1000'},
      {Source: 'Scholarship', Amount: '-500'},
    ],
  };

  const theme = useTheme();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderVariantView />
      <TablesView data={data} />
    </View>
  );
}

export default WalletView;
