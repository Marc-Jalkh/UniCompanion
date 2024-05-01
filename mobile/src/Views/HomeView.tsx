// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Linking,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import HeaderView from '../Common/component/Header/Header';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import RoundButton from '../Common/component/Button/RoundButton';
import PostCard from '../Common/component/Card/PostCard';
import IntoCard from '../Common/component/Card/IntoCard';
import {useNavigation} from '@react-navigation/native';
import {useCustomApi} from '../Data/Domain/CustomUseCase';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';
import PageLoader from '../Common/component/Loader/PageLoader';
import {HomeData} from '../Data/Domain/models/HomeData';

function HomeView(): React.JSX.Element {
  const welcomeMessage = () => {
    var date = new Date();
    var hours = date.getHours();
    if (hours < 12) {
      return 'Good Morning 👋';
    }
    if (hours < 18) {
      return 'Good Afternoon 👋';
    }
    return 'Good Evening 👋';
  };

  const api = useGetFromApi('home/get', (jsonData: any) => {
    var posts: Post[] = jsonData.posts.map((post: any) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.picture,
        date: post.date,
      };
    });
    var homeData: HomeData = {
      welcomeMessage: welcomeMessage(),
      user: jsonData.user,
      posts: posts,
      semester: jsonData.semester,
      gpa: jsonData.gpa,
      grade: jsonData.grade,
    };

    return homeData;
  });

  const {data, isLoading, load, refresh} = useCustomApi(() => api);

  React.useEffect(() => {
    load();
  }, [load]);
  const theme = useTheme();
  const navigation = useNavigation();
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderView />
      <ScrollView
        style={ScreensStyles.scrollTabContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refresh()}
            colors={[theme.colors.primary]}
          />
        }>
        <View>
          <Text style={{color: theme.colors.onSecondary}}>
            {data?.welcomeMessage}
          </Text>
          <Text variant="titleLarge">{data?.user}</Text>
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
            icon={require('../Common/utils/Assets/img/usek.png')}
            title="My Usek"
          />
          <RoundButton
            onPress={() =>
              Linking.openURL(
                'https://banner-self.usek.edu.lb/StudentSelfService',
              )
            }
            icon={require('../Common/utils/Assets/icons/banner.png')}
            title="Banner"
          />
          <RoundButton
            onPress={() => Linking.openURL('https://elearning.usek.edu.lb/')}
            icon={require('../Common/utils/Assets/icons/moodle.png')}
            title="E-Learning"
          />
          <RoundButton
            onPress={() => navigation.navigate('Wallet')}
            icon={require('../Common/utils/Assets/icons/wallet.png')}
            title="Wallet"
          />
        </View>
        <IntoCard
          title="Semester:"
          subTitle={data?.semester ?? 'Not enrolled'}
          gpa={data?.gpa ?? '0.0'}
          grade={data?.grade ?? '0/100'}
          onPress={() => navigation.navigate('Grades')}
        />
        <View style={ScreensStyles.marginTop}>
          <View style={ScreensStyles.horizontalContainerSpaced}>
            <Text variant="titleLarge">Post</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
              <Text variant="titleSmall">show all</Text>
            </TouchableOpacity>
          </View>
          <View style={ScreensStyles.marginTop}>
            {data?.posts.map((post: Post, index: number) => (
              <PostCard
                key={index}
                onPress={() => navigation.navigate('Post', {param1: post})}
                image={post.image}
                title={post.title}
                description={post.content.slice(0, 100) + '...'}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeView;
