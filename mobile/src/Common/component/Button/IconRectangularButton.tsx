import React from 'react';
import {Card, IconButton, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';
import {Image, ImageSourcePropType} from 'react-native';
class IconButtonProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;

  constructor(icon: ImageSourcePropType, title: string, onPress: () => void) {
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
          // eslint-disable-next-line react/no-unstable-nested-components
          icon={() => (
            <Image
              source={icon}
              width={40}
              height={40}
              tintColor={theme.colors.primary}
              resizeMode="contain"
              style={{width: 40, height: 40}}
            />
          )}
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
