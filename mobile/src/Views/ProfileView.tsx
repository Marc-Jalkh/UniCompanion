import React, {useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Button, useTheme} from 'react-native-paper';
import {useAuth} from '../Data/Domain/AuthenticationContext';
import QrCard from '../Common/component/Card/QrCard';
import ProfileCard from '../Common/component/Card/ProfileCard';

function ProfileView(): JSX.Element {
  const {logout} = useAuth();
  const data: User = {
    id: 1,
    name: 'Marc',
    image:
      'https://media.licdn.com/dms/image/C4E03AQFoiDXIjMOCuQ/profile-displayphoto-shrink_800_800/0/1653386732747?e=2147483647&v=beta&t=D2Atmb-eycuFWuxT8BslZ1nBy9P3BuARBU62PdvBrrE',
    usekId: '202200507',
    faculty: 'Arts & Sciences',
  };

  const [qrCode, setQrCode] = React.useState('error');

  const refreshQrCode = useCallback(() => {
    const currentTime = new Date().getTime().toString();
    setQrCode(`${data.usekId}${currentTime}`);
  }, [data.usekId]);

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
        style={[ScreensStyles.tabContainer, ScreensStyles.fullHeight]}>
        <ProfileCard
          name={data.name}
          faculty={data.faculty}
          id={data.usekId}
          avatar={data.image}
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
