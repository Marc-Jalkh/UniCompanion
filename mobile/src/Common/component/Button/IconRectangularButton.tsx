import React from 'react';
import {Card, IconButton, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';

class IconButtonProps {
  icon: string;
  title: string;
  onPress: () => void;

  constructor(icon: string, title: string, onPress: () => void) {
    this.icon = icon;
    this.title = title;
    this.onPress = onPress;
  }
}

function IconRectangularButton(props: IconButtonProps): JSX.Element {
  const {icon, title, onPress} = props;
  const theme = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface,
        ...ScreensStyles.fullHeight,
      }}
      onPress={onPress}>
      <Card.Content>
        <IconButton
          icon={icon}
          iconColor={theme.colors.primary}
          containerColor={theme.colors.surface}
          size={40}
          onPress={onPress}
        />
        <Card.Title titleVariant="headlineSmall" title={title} />
      </Card.Content>
    </Card>
  );
}

export default IconRectangularButton;
