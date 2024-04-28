import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {ChatHeader} from '../Common/component/Header/ChatHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatBubble from '../Common/component/other/ChatBubble';
import {useRoute} from '@react-navigation/native';
import {Socket, io} from 'socket.io-client';
import {useAuth} from '../Data/Domain/AuthenticationContext';

const SingleChatStyle = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    minHeight: 30,
    paddingTop: 5,
    maxHeight: 150,
  },
  inputStyle: {
    paddingHorizontal: 10,
    flexGrow: 1,
    minHeight: 35,
    borderRadius: 10,
    maxHeight: 150,
  },
});

const SingleChat: React.FC = () => {
  const theme = useTheme();
  const {id} = useAuth();
  const flatListRef = useRef<FlatList | null>(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<{
    [key: string]: Message[];
  }>({});
  const route = useRoute();
  const param1Value: string = route.params?.param1;
  const param2Value: string = route.params?.param2;
  const param3Value: string = route.params?.param3;
  const param4Value: string = route.params?.param4;
  const socket = useRef<Socket | null>(null);
  if (!socket.current) {
    socket.current = io('http://192.168.2.240:3000');
  }
  function dateToMessageDate(date: Date): string {
    const dates = new Date(date);
    const hours = dates.getHours();
    const minutes = dates.getMinutes();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hoursString}:${minutesString}`;
  }

  const handleNewMessage = useCallback((newMessage: Message) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);
  function dateToDay(date: string): string {
    if (date === new Date().toISOString().slice(0, 10)) {
      return 'Today';
    } else if (
      date ===
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10)
    ) {
      return 'Yesterday';
    }
    return date;
  }
  useEffect(() => {
    if (socket.current) {
      socket.current.on('connect', () => {
        socket.current?.emit('joinRoom', {user1_id: id, user2_id: param2Value});
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [id, param2Value]);

  useEffect(() => {
    var grouped: {[key: string]: Message[]} = {}; // Add index signature to groupedMessages object
    messages.forEach(msg => {
      var date = new Date(msg.date).toISOString().slice(0, 10);
      if (grouped[date]) {
        grouped[date].push(msg);
      } else {
        grouped[date] = [msg];
      }
    });
    setGroupedMessages(grouped);
  }, [messages]);

  //useeffect if connection is disconnected reconnect
  useEffect(() => {
    if (!socket.current?.connected) {
      socket.current?.connect();
    }
  }, [socket]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('message', data => {
        if (data.sender_id === id) {
          return;
        }
        const newMessage: Message = {
          isMine: false,
          date: new Date(data.date),
          message: data.message,
        };
        handleNewMessage(newMessage);
      });
    }
  }, [handleNewMessage, id]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on('previousMessages', data => {
        var incomingMessages: Message[] = [];
        data.forEach((msg: any) => {
          const newMessage: Message = {
            isMine: msg.sender_id === id,
            date: new Date(msg.date),
            message: msg.message,
          };
          incomingMessages.push(newMessage);
        });
        setMessages([...messages, ...incomingMessages]);
      });
    }
  }, [id, messages]);

  const saveMessage = async () => {
    try {
      const newMessage: Message = {
        isMine: true,
        date: new Date(),
        message: message,
      };
      if (socket.current) {
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        socket.current.emit('chatMessage', {
          // Access the current property of the socket ref
          message: message,
          user2_id: param2Value,
          user1_id: id,
        });
        setMessage('');
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  return (
    <SafeAreaView
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.surface,
      }}
      edges={['right', 'left', 'bottom']}>
      <KeyboardAvoidingView
        style={ScreensStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ChatHeader
          Name={param1Value}
          Status={param3Value}
          Image={param4Value}
        />
        <View
          style={{
            ...ScreensStyles.container,
            backgroundColor: theme.colors.background,
          }}>
          <FlatList
            ref={flatListRef}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginHorizontal: 15, flexGrow: 1}}
            data={Object.keys(groupedMessages)}
            onContentSizeChange={() => scrollToBottom()}
            renderItem={({item}) => (
              <View>
                <Text style={ScreensStyles.alignCenter}>{dateToDay(item)}</Text>
                {groupedMessages[item].map((msg, index) => (
                  <ChatBubble
                    key={index}
                    isMe={msg.isMine}
                    message={msg.message}
                    time={dateToMessageDate(msg.date)}
                  />
                ))}
              </View>
            )}
            keyExtractor={item => item}
          />

          <View
            style={[
              SingleChatStyle.inputContainer,
              {backgroundColor: theme.colors.surface},
            ]}>
            <TextInput
              style={{
                ...SingleChatStyle.inputStyle,
                backgroundColor: theme.colors.surfaceVariant,
                color: theme.colors.primary,
              }}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message here..."
              placeholderTextColor={theme.colors.onSecondary}
              multiline
            />
            <IconButton
              icon="camera"
              iconColor={theme.colors.primary}
              size={30}
              onPress={() => saveMessage()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SingleChat;
