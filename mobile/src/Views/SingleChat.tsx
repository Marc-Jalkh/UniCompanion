import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {ChatHeader} from '../Common/component/Header/ChatHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatBubble from '../Common/component/other/ChatBubble';
import {useRoute} from '@react-navigation/native';

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
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<{
    [key: string]: Message[];
  }>({});
  const route = useRoute();
  const param1Value: string = route.params?.param1;

  function dateToMessageDate(date: Date): string {
    const dates = new Date(date);
    const hours = dates.getHours();
    const minutes = dates.getMinutes();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hoursString}:${minutesString}`;
  }
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
    loadMessages();
  }, []);

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

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('msg');
      if (storedMessages) {
        setMessages(
          JSON.parse(storedMessages).sort(
            (
              a: {time: string | number | Date},
              b: {time: string | number | Date},
            ) => {
              const dateA = new Date(a.time);
              const dateB = new Date(b.time);
              return dateA.getTime() - dateB.getTime();
            },
          ),
        );
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessage = async () => {
    try {
      const newMessage: Message = {
        id: String(messages.length + 1),
        isMine: true,
        date: new Date(),
        message: message,
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      await AsyncStorage.setItem('msg', JSON.stringify(updatedMessages));
      setMessage('');
    } catch (error) {
      console.error('Error saving message:', error);
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
          Status="Online"
          Image="https://randomuser.me/api/portraits"
        />
        <View
          style={{
            ...ScreensStyles.container,
            backgroundColor: theme.colors.background,
          }}>
          <FlatList
            style={ScreensStyles.scrollTabContainer}
            data={Object.keys(groupedMessages)}
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
