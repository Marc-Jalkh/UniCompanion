import React from 'react';
import {RefreshControl, View} from 'react-native';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {useTheme} from 'react-native-paper';
import {SearchableList} from '../Common/component/SearchableList/SearchableList';
import {useNavigation} from '@react-navigation/native';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import {useCustomApi} from '../Data/Domain/CustomUseCase';

function PeopleView(): JSX.Element {
  const api = useGetFromApi('users/all', (jsonData: any) => {
    var users: User[] = jsonData.map((uuser: any) => {
      return {
        id: uuser.id,
        name: uuser.name,
        image: uuser.image,
        usekId: uuser.usekId,
        faculty: uuser.faculty,
      };
    });

    return users;
  });

  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  React.useEffect(() => {
    load();
  }, [load]);

  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderVariantView />
      <SearchableList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refresh()}
            colors={[theme.colors.primary]}
          />
        }
        items={(data ?? []).map(user => {
          return {
            image: user.image,
            title: user.name,
            subTitle: user.usekId,
            onPress: () => {
              navigation.navigate('SingleChat', {
                param1: user.name,
                param2: user.id.toString(),
                param3: user.faculty,
                param4: user.image,
              });
            },
            rightText: 'Right Text',
            notification: '0',
          };
        })}
        isSearchable={true}
        searchPlaceholder="Search for chats"
        rightIcon={false}
      />
    </View>
  );
}

export default PeopleView;
