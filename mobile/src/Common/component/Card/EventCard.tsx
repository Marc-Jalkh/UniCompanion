import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';

const cardStyle = StyleSheet.create({
  noShadow: {
    shadowOpacity: 0,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

class EventCardProps {
  title: string;
  timing: string;
  location: string;
  isNow: boolean;

  constructor(title: string, timing: string, location: string, isNow: boolean) {
    this.isNow = isNow;
    this.timing = timing;
    this.location = timing;
    this.title = title;
  }
}

function EventCard(props: EventCardProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <Card
      style={{backgroundColor: theme.colors.surface, ...cardStyle.noShadow}}>
      <Card.Content>
        <View style={cardStyle.horizontalContainer}>
          <Text variant="titleMedium">{props.title}</Text>
          <Text style={{color: theme.colors.onSecondary}} variant="labelLarge">
            {props.timing}
          </Text>
        </View>
        <View style={cardStyle.horizontalContainer}>
          <Text style={{color: theme.colors.onSecondary}} variant="labelLarge">
            {props.location}
          </Text>
          {props.isNow ? <Text variant="labelLarge">NOW</Text> : null}
        </View>
      </Card.Content>
    </Card>
  );
}

export default EventCard;
