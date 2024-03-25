import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

class ChatBubbleProps {
  isMe: boolean;
  message: string;
  time: string;

  constructor(isMe: boolean, message: string, time: string) {
    this.isMe = isMe;
    this.message = message;
    this.time = time;
  }
}

const ChatBubble = (props: ChatBubbleProps) => {
  const {isMe, message, time} = props;
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        isMe
          ? {...styles.myMessage, backgroundColor: theme.colors.onPrimary}
          : {backgroundColor: theme.colors.surface, ...styles.otherMessage},
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  leftContainer: {
    borderBottomLeftRadius: 0,
  },
  rightContainer: {
    borderBottomRightRadius: 0,
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageContainer: {
    flexDirection: 'column',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  message: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
});

export default ChatBubble;
