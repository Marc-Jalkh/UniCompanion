import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Text, useTheme} from 'react-native-paper';
import ImageButtonCard from '../Common/component/Card/ImageButtonCard';
import IconRectangularButton from '../Common/component/Button/IconRectangularButton';
import ProgressCard from '../Common/component/Card/ProgressCard';
import {useNavigation} from '@react-navigation/native';
import {ForYou} from '../Data/Domain/models/ForYou';

const ForYouStyles = StyleSheet.create({
  halfScreen: {
    height: '50%',
    flexDirection: 'row',
  },
});

function ForYouView(): React.JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();
  const data = new ForYou(
    'Computer Science',
    'Bachelor degree',
    '0.75',
    'Quote From Api',
  );
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderView />
      <ScrollView style={{...ScreensStyles.tabContainer}}>
        <View style={[ScreensStyles.verticalMargin, ScreensStyles.fullHeight]}>
          <View>
            <Text style={{color: theme.colors.onSecondary}}>Quote:</Text>
            <Text variant="titleMedium">{data.quote}</Text>
          </View>
          <View
            style={[
              ScreensStyles.marginTopPercentage,
              ScreensStyles.fullHeight,
            ]}>
            <View
              style={{
                ...ScreensStyles.fullWidth,
                ...ForYouStyles.halfScreen,
              }}>
              <View style={{...ScreensStyles.halfScreen}}>
                <ImageButtonCard
                  onPress={() => navigation.navigate('Campus Map')}
                />
              </View>
              <View style={ScreensStyles.halfScreen}>
                <View
                  style={{
                    ...ScreensStyles.halfHeight,
                    ...ScreensStyles.smallPaddingBottom,
                  }}>
                  <IconRectangularButton
                    onPress={() => navigation.navigate('Wallet')}
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
                    onPress={() => navigation.navigate('Grades')}
                    icon="plus"
                    title="Grade"
                  />
                </View>
              </View>
            </View>
            <ProgressCard
              major={data.degree}
              level={data.level}
              progress={parseFloat(data.progress)}
              onPress={() => navigation.navigate('Courses')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ForYouView;
