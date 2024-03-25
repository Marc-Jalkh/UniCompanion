// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import RoundButton from '../Common/component/Button/RoundButton';
import PostCard from '../Common/component/Card/PostCard';
import IntoCard from '../Common/component/Card/IntoCard';
import {useNavigation} from '@react-navigation/native';

function HomeView(): React.JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderView />
      <ScrollView
        style={ScreensStyles.scrollTabContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{color: theme.colors.onSecondary}}>
            Hello text from api 👋
          </Text>
          <Text variant="titleLarge">Name From Api</Text>
        </View>
        <View
          style={{
            ...ScreensStyles.horizontalContainer,
            ...ScreensStyles.alignCenter,
            ...ScreensStyles.marginTop,
          }}>
          <RoundButton
            onPress={() =>
              Linking.openURL('https://myusek.usek.edu.lb/banner-sis')
            }
            icon="plus"
            title="My Usek"
          />
          <RoundButton
            onPress={() =>
              Linking.openURL(
                'https://banner-self.usek.edu.lb/StudentSelfService',
              )
            }
            icon="plus"
            title="Banner"
          />
          <RoundButton
            onPress={() => Linking.openURL('https://elearning.usek.edu.lb/')}
            icon="plus"
            title="E-Learning"
          />
          <RoundButton
            onPress={() => navigation.navigate('Wallet')}
            icon="plus"
            title="Wallet"
          />
        </View>
        <IntoCard title="Post" subTitle="Post" gpa="3.99" grade="100/100" />
        <View style={ScreensStyles.marginTop}>
          <View style={ScreensStyles.horizontalContainerSpaced}>
            <Text variant="titleLarge">Post</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
              <Text variant="titleSmall">show all</Text>
            </TouchableOpacity>
          </View>
          <View style={ScreensStyles.marginTop}>
            <PostCard
              onPress={() => navigation.navigate('Post', {param1: '1'})}
              image="https://picsum.photos/720"
              title="Post"
              description="Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum ."
            />
            <PostCard
              onPress={() => navigation.navigate('Post', {param1: '2'})}
              image="https://picsum.photos/720"
              title="Post"
              description="Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum ."
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeView;
