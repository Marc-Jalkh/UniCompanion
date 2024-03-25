import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Button, useTheme} from 'react-native-paper';
import {useAuth} from '../Data/Domain/AuthenticationContext';
import QrCard from '../Common/component/Card/QrCard';
import ProfileCard from '../Common/component/Card/ProfileCard';

function ProfileView(): JSX.Element {
  const {logout} = useAuth();
  const [qrCode, setQrCode] = React.useState(
    '202200507' + new Date().getTime().toString(),
  );

  const refreshQrCode = useCallback(() => {
    const currentTime = new Date().getTime().toString();
    setQrCode(`202200507${currentTime}`);
  }, []);

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
      <View style={ScreensStyles.tabContainer}>
        <ProfileCard
          name="Marc El Jalkh  "
          faculty="Arts & Sciences"
          id="202200507"
          avatar="https://picsum.photos/720"
        />
        <View style={ScreensStyles.marginTop}>
          <QrCard onPress={() => refreshQrCode()} title="QrCard" qr={qrCode} />
        </View>
        <Button
          mode="outlined"
          style={{...ScreensStyles.customButton, ...ScreensStyles.marginTop}}
          onPress={() => logout()}>
          Logout
        </Button>
      </View>
    </View>
  );
}

export default ProfileView;
