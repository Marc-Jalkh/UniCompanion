import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../Common/utils/FormatTime';

function ChatsView(): JSX.Element {
  const data: Chat[] = [
    {
      id: '1',
      name: 'Gilbert',
      lastMessage: 'Last Message',
      lastMessageDate: '2024-04-01T05:01:00Z',
      unreadMessages: 1,
      image:
        'https://media.licdn.com/dms/image/D4E03AQHdNkl0p9HCbA/profile-displayphoto-shrink_800_800/0/1683628386031?e=2147483647&v=beta&t=J3mxzPE6iWuyhYiuHeLF12p0d9MImD_9asd6HAzLqFo',
    },
    {
      id: '2',
      name: 'Registrar',
      lastMessage: 'Last Message',
      lastMessageDate: '2024-03-31T00:00:00Z',
      unreadMessages: 1,
      image: 'https://www.usek.edu.lb/ContentFiles/1Logo.jpg',
    },
    {
      id: '3',
      name: 'Dr Antoine Aoun',
      lastMessage: 'Last Message',
      lastMessageDate: '2024-01-01T00:00:00Z',
      unreadMessages: 1,
      image:
        'https://s3.amazonaws.com/media.mixrank.com/profilepic/ef374903c53039b18de6f9ca47c01377',
    },
  ];
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      <SearchableList
        items={[
          {
            image:
              'https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1435.jpg',
            title: 'AI Companion',
            subTitle: 'SubTitle',
            onPress: () =>
              navigation.navigate('SingleChat', {
                param1: 'AI Companion',
                param2: '0',
                param3: 'AI Assistant',
                param4:
                  'https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1435.jpg',
              }),
            rightText: 'Right Text',
          },
          ...data.map(chat => {
            return {
              image: chat.image,
              title: chat.name,
              subTitle: chat.lastMessage,
              onPress: () =>
                navigation.navigate('SingleChat', {
                  param1: chat.name,
                  param2: '1',
                  param3: 'Student',
                  param4: chat.image,
                }),

              rightText: formatDate(chat.lastMessageDate),
            };
          }),
        ]}
        isSearchable={true}
        searchPlaceholder="Search for chats"
        rightIcon={true}
      />
    </View>
  );
}

export default ChatsView;
