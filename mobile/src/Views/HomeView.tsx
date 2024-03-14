// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import RoundButton from '../Common/component/Button/RoundButton';
import PostCard from '../Common/component/Card/PostCard';
import IntoCard from '../Common/component/Card/IntoCard';

function HomeView(): React.JSX.Element {
  const theme = useTheme();
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
            onPress={() => console.log('Create Post')}
            icon="plus"
            title="Wallet"
          />
          <RoundButton
            onPress={() => console.log('Create Post')}
            icon="plus"
            title="Wallet"
          />
          <RoundButton
            onPress={() => console.log('Create Post')}
            icon="plus"
            title="Wallet"
          />
          <RoundButton
            onPress={() => console.log('Create Post')}
            icon="plus"
            title="Wallet"
          />
        </View>
        <IntoCard title="Post" subTitle="Post" gpa="3.99" grade="100/100" />
        <View style={ScreensStyles.marginTop}>
          <Text variant="titleLarge">Post</Text>
          <View style={ScreensStyles.marginTop}>
            <PostCard
              onPress={() => console.log('Post')}
              image="https://picsum.photos/720"
              title="Post"
              description="Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum ."
            />
            <PostCard
              onPress={() => console.log('Post')}
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
