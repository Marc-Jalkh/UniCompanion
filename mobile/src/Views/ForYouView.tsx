import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {Text, useTheme} from 'react-native-paper';
import ImageButtonCard from '../Common/component/Card/ImageButtonCard';
import IconRectangularButton from '../Common/component/Button/IconRectangularButton';
import ProgressCard from '../Common/component/Card/ProgressCard';
import {useNavigation} from '@react-navigation/native';
import {ForYou} from '../Data/Domain/models/ForYou';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import {useCustomApi} from '../Data/Domain/CustomUseCase';

const ForYouStyles = StyleSheet.create({
  halfScreen: {
    height: '50%',
    flexDirection: 'row',
  },
});

function ForYouView(): React.JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();
  const api = useGetFromApi('foryou/', (jsonData: any) => {
    var forYouData: ForYou = {
      quote: jsonData.quote,
      degree: jsonData.degree,
      level: jsonData.level,
      progress: jsonData.progress,
    };

    return forYouData;
  });

  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  React.useEffect(() => {
    load();
  }, [load]);
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderView />
      <ScrollView
        style={{...ScreensStyles.tabContainer}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refresh()}
            colors={[theme.colors.primary]}
          />
        }>
        <View style={[ScreensStyles.verticalMargin, ScreensStyles.fullHeight]}>
          <View>
            <Text style={{color: theme.colors.onSecondary}}>Quote:</Text>
            <Text variant="titleMedium">
              Stay Hungry, Stay foolish! - Steve Jobs
            </Text>
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
                    icon={require('../Common/utils/Assets/icons/wallet.png')}
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
                    icon={require('../Common/utils/Assets/icons/grades.png')}
                    title="Grade"
                  />
                </View>
              </View>
            </View>
            <ProgressCard
              major={data?.degree ?? 'Degree'}
              level={data?.level ?? 'Level'}
              progress={parseFloat(data?.progress ?? '0')}
              onPress={() => navigation.navigate('Courses')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ForYouView;
