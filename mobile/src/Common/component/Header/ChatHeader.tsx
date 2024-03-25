import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Text, useTheme} from 'react-native-paper';
import {headerStyles} from './HeaderStyle';
import {useNavigation} from '@react-navigation/native';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';

class HeaderProps {
  Name: string;
  Status: string;
  Image: string;

  constructor(Name: string, Status: string, Image: string) {
    this.Name = Name;
    this.Status = Status;
    this.Image = Image;
  }
}

export function ChatHeader(props: HeaderProps): React.JSX.Element {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        ...headerStyles.chatContainerVariant,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{...headerStyles.title}}>{'<  '} </Text>
      </TouchableOpacity>
      <Avatar.Image size={50} source={{uri: props.Image}} />
      <View style={ScreensStyles.verticalContainer}>
        <Text style={{...headerStyles.name}}> {props.Name} </Text>
        <Text style={{...headerStyles.status, color: theme.colors.onSecondary}}>
          {' '}
          {props.Status}{' '}
        </Text>
      </View>
    </View>
  );
}
