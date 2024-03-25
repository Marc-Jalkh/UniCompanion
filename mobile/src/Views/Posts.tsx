import React from 'react';
import {ScrollView, View} from 'react-native';
import PostCard, {PostCardProps} from '../Common/component/Card/PostCard';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {Text, useTheme} from 'react-native-paper';

function Posts(): React.JSX.Element {
  const post: PostCardProps[] = [
    {
      onPress: () => console.log('Post'),
      image: 'https://picsum.photos/720',
      title: 'dsad1',
      description: 'dsadsadasda',
    },
    {
      onPress: () => console.log('Post'),
      image: 'https://picsum.photos/720',
      title: 'dsad2',
      description: 'dsadsadasda',
    },
    {
      onPress: () => console.log('Post'),
      image: 'https://picsum.photos/720',
      title: 'dsa3d',
      description: 'dsadsadasda',
    },
    {
      onPress: () => console.log('Post'),
      image: 'https://example.com/image.jpg',
      title: 'dsad4',
      description: 'dsadsadasda',
    },
  ];
  const theme = useTheme();
  return (
    <View
      style={{
        ...ScreensStyles.container,
        backgroundColor: theme.colors.background,
      }}>
      <HeaderVariantView />
      <ScrollView
        style={ScreensStyles.scrollTabContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text variant="titleMedium">Check out the latest posts!</Text>
        </View>
        {post.map(item => (
          <PostCard
            onPress={item.onPress}
            key={item.title}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Posts;
