import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Button, useTheme} from 'react-native-paper';
import {useAuth} from '../Data/Domain/AuthenticationContext';
import QrCard from '../Common/component/Card/QrCard';
import ProfileCard from '../Common/component/Card/ProfileCard';

function ProfileView(): JSX.Element {
  const {logout} = useAuth();
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
          <QrCard
            onPress={() => console.log('QrCard')}
            title="QrCard"
            qr="text0"
          />
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
