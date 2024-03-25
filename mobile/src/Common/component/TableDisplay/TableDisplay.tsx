import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {TableStyles} from './TableStyling';

export interface RowData {
  [key: string]: string;
}

interface TableViewProps {
  data: RowData[];
}

const TableView: React.FC<TableViewProps> = ({data}) => {
  // Extracting keys from the first data item to use as header titles
  const headerTitles = Object.keys(data[0]);

  return (
    <View style={TableStyles.container}>
      {/* Header row */}
      <View style={TableStyles.headerRow}>
        {headerTitles.map((title, index) => (
          <View style={TableStyles.headerCell} key={index}>
            <Text style={TableStyles.headerCellText}>{title}</Text>
          </View>
        ))}
      </View>

      {/* Data rows */}
      {data.map((item, index) => (
        <View style={TableStyles.row} key={index}>
          {headerTitles.map((title, headerIndex) => (
            <View style={TableStyles.cell} key={headerIndex}>
              <Text style={TableStyles.cellText}>{item[title]}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default TableView;
