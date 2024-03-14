import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';

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
        icon={props.icon}
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
