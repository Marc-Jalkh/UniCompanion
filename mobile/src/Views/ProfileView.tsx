import React from 'react';
import {View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {TabScreensStyles} from '../Common/utils/Assets/Styles/TabScreensStyles';
import {Button, useTheme} from 'react-native-paper';
import { useAuth } from '../Data/Domain/AuthenticationContext';

function ProfileView(): JSX.Element {
  const {logout} = useAuth();
  return (
    <View
      style={{
        ...TabScreensStyles.container,
        backgroundColor: useTheme().colors.background,
      }}>
      <HeaderView />
      {/* Card1 */}
      {/* Card 2 */}
      <Button
        mode="outlined"
        style={TabScreensStyles.customButton}
        onPress={() => logout()}>
        Logout
      </Button>
    </View>
  );
}

export default ProfileView;
