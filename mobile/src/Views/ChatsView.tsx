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
      name: 'Marc',
      lastMessage: 'Last Message',
      lastMessageDate: '2024-04-01T05:01:00Z',
      unreadMessages: 1,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Marcs',
      lastMessage: 'Last Message',
      lastMessageDate: '2024-03-31T00:00:00Z',
      unreadMessages: 1,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Marcx',
      lastMessage: 'Last Message',
      lastMessageDate: '2024-01-01T00:00:00Z',
      unreadMessages: 1,
      image: 'https://via.placeholder.com/150',
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
            image: 'https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1435.jpg',
            title: 'AI Companion',
            subTitle: 'SubTitle',
            onPress: () =>
              navigation.navigate('SingleChat', {
                param1: 'AI Companion',
                param2: '0',
                param3: 'AI Assistant',
                param4: 'https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1435.jpg',
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
                  param2: '2',
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
