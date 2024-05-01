import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';

export class PostCardProps {
  onPress: () => void;
  image: string;
  title: string;
  description: string;

  constructor(
    onPress: () => void,
    image: string,
    title: string,
    description: string,
  ) {
    this.onPress = onPress;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}

const cardStyle = StyleSheet.create({
  noShadow: {
    shadowOpacity: 0,
    marginVertical: 5,
  },
  cover: {
    margin: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
});

function PostCard(_props: PostCardProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <Card
      style={{backgroundColor: theme.colors.surface, ...cardStyle.noShadow}}
      onPress={_props.onPress}>
      <Card.Cover style={cardStyle.cover} source={{uri: _props.image}} />
      <Card.Content>
        <Text style={cardStyle.title}>{_props.title}</Text>
        <Text style={{color: theme.colors.onSecondary}}>
          {_props.description}
        </Text>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
