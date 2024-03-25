import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

class RoundButtonProps {
  onPress: () => void;
  icon: string;
  title: string;

  constructor(onPress: () => void, icon: string, title: string) {
    this.onPress = onPress;
    this.icon = icon;
    this.title = title;
  }
}

const RoundButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  roundButton: {
    alignItems: 'center',
  },
});

function RoundButton(props: RoundButtonProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <View style={RoundButtonStyle.container}>
      <IconButton
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={() => (
          <Icon name={props.icon} size={40} color={theme.colors.primary} />
        )}
        mode="contained"
        iconColor={theme.colors.primary}
        containerColor={theme.colors.surface}
        style={RoundButtonStyle.roundButton}
        size={55}
        onPress={props.onPress}
      />
      <Text style={{color: theme.colors.onSecondary}}>{props.title}</Text>
    </View>
  );
}

export default RoundButton;
