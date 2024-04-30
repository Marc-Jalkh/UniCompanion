import React from 'react';
import {SearchableItem} from '../SearchableList/SearchableList';
import {Avatar, Text, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const cardStyle = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  centerImage: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  text: {
    marginLeft: 10,
    marginTop: 5,
  },
  rightText: {
    marginTop: 5,
  },
});

function ListCard(item: SearchableItem): React.JSX.Element {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={item.onPress} style={cardStyle.card}>
      <View style={cardStyle.row}>
        <Avatar.Image
          size={60}
          style={cardStyle.centerImage}
          source={{uri: item.image}}
        />
        <View style={cardStyle.text}>
          <Text variant="titleMedium">{item.title}</Text>
          {item.subTitle === null ? null : (
            <Text
              variant="labelMedium"
              style={{color: theme.colors.onSecondary}}>
              {item.subTitle}
            </Text>
          )}
        </View>
      </View>
      <Text
        variant="labelMedium"
        style={{...cardStyle.rightText, color: theme.colors.onSecondary}}>
        {item.rightText}
      </Text>
    </TouchableOpacity>
  );
}

export default ListCard;
