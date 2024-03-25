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

function GradesView(): JSX.Element {
  const data: DataObject = {
    semester1: [
      {
        Course: 'Applied Mathematics',
        Code: 'MAT201',
        Grade: '98',
      },
      {
        Course: 'Parallel AND DIstributed programing',
        Code: 'MAT201',
      },
    ],
    'Spring 2025': [
      {
        Course: 'Applied Mathematics',
        Code: 'MAT201',
        Grade: '98',
      },
      {
        Course: 'Parallel AND DIstributed programing',
        Code: 'MAT201',
      },
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

export default GradesView;
