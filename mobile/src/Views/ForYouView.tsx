import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Text, useTheme} from 'react-native-paper';
import ImageButtonCard from '../Common/component/Card/ImageButtonCard';
import IconRectangularButton from '../Common/component/Button/IconRectangularButton';
import ProgressCard from '../Common/component/Card/ProgressCard';

const ForYouStyles = StyleSheet.create({
  halfScreen: {
    height: '50%',
    flexDirection: 'row',
  },
});

function ForYouView(): React.JSX.Element {
  const theme = useTheme();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderView />
      <View
        style={{...ScreensStyles.tabContainer, ...ScreensStyles.fullHeight}}>
        <View>
          <Text style={{color: theme.colors.onSecondary}}>Quote:</Text>
          <Text variant="titleMedium">" Quote From Api "</Text>
        </View>
        <View style={ScreensStyles.verticalMargin}>
          <View
            style={{
              ...ScreensStyles.fullWidth,
              ...ForYouStyles.halfScreen,
            }}>
            <View style={{...ScreensStyles.halfScreen}}>
              <ImageButtonCard onPress={() => {}} />
            </View>
            <View style={ScreensStyles.halfScreen}>
              <View
                style={{
                  ...ScreensStyles.halfHeight,
                  ...ScreensStyles.smallPaddingBottom,
                }}>
                <IconRectangularButton
                  onPress={() => console.log('Create Post')}
                  icon="plus"
                  title="Wallet"
                />
              </View>
              <View
                style={{
                  ...ScreensStyles.halfHeight,
                  ...ScreensStyles.smallPaddingTop,
                }}>
                <IconRectangularButton
                  onPress={() => console.log('Create Post')}
                  icon="plus"
                  title="Grade"
                />
              </View>
            </View>
          </View>
          <ProgressCard
            major="Computer Science"
            level="Bachelor degree"
            progress={0.5}
          />
        </View>
      </View>
    </View>
  );
}

export default ForYouView;
