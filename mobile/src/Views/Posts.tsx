import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import PostCard from '../Common/component/Card/PostCard';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useCustomApi} from '../Data/Domain/CustomUseCase';
import {useGetFromApi} from '../Data/Remote/utils/Helpers';

function Posts(): React.JSX.Element {
  const api = useGetFromApi('posts/getAll', (jsonData: any) => {
    var posts: Post[] = jsonData.map((post: any) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.picture,
        date: post.date,
      };
    });
    return posts;
  });
  const {data, isLoading, load, refresh} = useCustomApi(() => api);
  useEffect(() => {
    load();
  }, [load]);

  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderVariantView />
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
          <Text variant="titleMedium">Check out the latest posts!</Text>
        </View>
        {data &&
          data.map(item => (
            <PostCard
              onPress={() => navigation.navigate('Post', {param1: item})}
              key={item.title}
              image={item.image}
              title={item.title}
              description={item.content}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Posts;
