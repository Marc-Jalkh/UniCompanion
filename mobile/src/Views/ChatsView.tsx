import React, {useState} from 'react';
import {RefreshControl, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../Common/utils/FormatTime';
import {useCustomApi} from '../Data/Domain/CustomUseCase';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';

function ChatsView(): JSX.Element {
  const api = useGetFromApi('chats/normalChats', (jsonData: any) => {
    var chats: Chat[] = jsonData.map((chat: any) => {
      return {
        id: chat.user.id,
        name: chat.user.name,
        lastMessage: chat.last_message,
        lastMessageDate: chat.last_message_date,
        unreadMessages: chat.unreadMessages,
        image: chat.user.picture,
        role: chat.user.role,
      };
    });

    return chats;
  });
  const theme = useTheme();
  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  React.useEffect(() => {
    load();
  }, [load]);

  const navigation = useNavigation();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      <SearchableList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refresh()}
            colors={[theme.colors.primary]}
          />
        }
        items={[
          {
            image:
              'https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1435.jpg',
            title: 'AI Companion',
            subTitle:
              data?.filter(chat => chat.id.toString() === '0')[0]
                ?.lastMessage ?? 'Chat with the new Ai powered bot ',
            onPress: () =>
              navigation.navigate('SingleChat', {
                param1: 'AI Companion',
                param2: '0',
                param3: 'AI Assistant',
                param4:
                  'https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1435.jpg',
              }),
            rightText: 'Usek',
            notification: '0',
          },
          ...(data ?? [])
            .filter(chat => chat.id != '0')
            .map(chat => {
              return {
                image: chat.image,
                title: chat.name,
                subTitle: chat.lastMessage,
                onPress: () =>
                  navigation.navigate('SingleChat', {
                    param1: chat.name,
                    param2: chat.id,
                    param3: chat.role,
                    param4: chat.image,
                  }),

                rightText: formatDate(chat.lastMessageDate),
                notification: chat.unreadMessages.toString(),
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
