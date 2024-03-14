import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';

const cardStyle = StyleSheet.create({
  margin: {
    margin: 10,
  },
  someheight: {
    height: '80%',
    width: '100%',
    objectFit: 'contain',
    marginBottom: 10,
  },
});

class ImageCardProps {
  onPress: () => void;

  constructor(_onPress: () => void) {
    this.onPress = _onPress;
  }
}

function ImageButtonCard(props: ImageCardProps): JSX.Element {
  const _onPress = props.onPress;
  const theme = useTheme();
  return (
    <Card
      style={{
        ...ScreensStyles.fullHeight,
        ...ScreensStyles.marginRight,
        backgroundColor: theme.colors.surface,
      }}
      contentStyle={cardStyle.margin}
      onPress={_onPress}>
      <Card.Cover
        style={cardStyle.someheight}
        source={{uri: 'https://picsum.photos/700'}}
      />
      <Button
        mode="contained"
        textColor={theme.colors.surface}
        buttonColor={theme.colors.secondary}
        onPress={() => console.log('s')}
        style={ScreensStyles.customButton}>
        Campus Map
      </Button>
    </Card>
  );
}

export default ImageButtonCard;
