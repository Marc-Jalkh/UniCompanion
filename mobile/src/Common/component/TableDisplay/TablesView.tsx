import React from 'react';
import {ScrollView, View} from 'react-native';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';
import TableView, {RowData} from './TableDisplay';
import {Text} from 'react-native-paper';

type DataObject = {
  [key: string]: RowData[];
};
class TableViewProps {
  data: DataObject;
  refreshControl?: JSX.Element;
  constructor(data: DataObject, refreshControl?: JSX.Element) {
    this.data = data;
    this.refreshControl = refreshControl;
  }
}
function TablesView(props: TableViewProps): JSX.Element {
  return (
    <ScrollView
      style={ScreensStyles.scrollTabContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={props.refreshControl}>
      {Object.keys(props.data).map(key => (
        <View key={key} style={ScreensStyles.marginTop}>
          <Text variant="titleMedium">{key} :</Text>
          <TableView data={props.data[key]} />
        </View>
      ))}
    </ScrollView>
  );
}

export default TablesView;
