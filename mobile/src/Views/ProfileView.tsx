import React, {useCallback, useEffect} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Button, useTheme} from 'react-native-paper';
import {useAuth} from '../Data/Domain/AuthenticationContext';
import QrCard from '../Common/component/Card/QrCard';
import ProfileCard from '../Common/component/Card/ProfileCard';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import {useCustomApi} from '../Data/Domain/CustomUseCase';

function ProfileView(): JSX.Element {
  const {logout, id} = useAuth();

  const api = useGetFromApi('users/student/' + id, (jsonData: any) => {
    var user: User = {
      id: jsonData.id,
      name: jsonData.name,
      usekId: jsonData.id,
      faculty: jsonData.faculty,
      image: jsonData.image,
    };

    return user;
  });

  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  const [qrCode, setQrCode] = React.useState('error');
  React.useEffect(() => {
    load();
  }, [load]);
  const refreshQrCode = useCallback(() => {
    const currentTime = new Date().getTime().toString();
    setQrCode(`${data?.usekId ?? 0}${currentTime}`);
  }, [data?.usekId]);

  useEffect(() => {
    refreshQrCode();
  }, [refreshQrCode]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshQrCode();
    }, 30000); // Refresh every 30 seconds

    // Cleanup function to clear the interval when the component unmounts or changes
    return () => clearInterval(intervalId);
  }, [refreshQrCode]); // Empty dependency array ensures that this effect runs only once after the initial render

  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      <ScrollView
        style={[ScreensStyles.tabContainer, ScreensStyles.fullHeight]}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }>
        <ProfileCard
          name={data?.name ?? 'error'}
          faculty={data?.faculty ?? 'error'}
          id={data?.usekId ?? 'error'}
          avatar={
            data?.image ?? 'https://www.usek.edu.lb/ContentFiles/1Logo.jpg'
          }
        />
        <View style={ScreensStyles.marginTop}>
          <QrCard onPress={() => refreshQrCode()} title={qrCode} qr={qrCode} />
        </View>
        <Button
          mode="outlined"
          style={{...ScreensStyles.customButton, ...ScreensStyles.marginTop}}
          onPress={() => logout()}>
          Logout
        </Button>
      </ScrollView>
    </View>
  );
}

export default ProfileView;
