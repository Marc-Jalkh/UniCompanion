import React from 'react';
import {ScrollView, View} from 'react-native';
import PostCard from '../Common/component/Card/PostCard';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

function Posts(): React.JSX.Element {
  const data: Post[] = [
    {
      title: 'First Post',
      content: 'description',
      date: '2024-04-01T05:01:00Z',
      image: 'https://picsum.photos/720',
    },
    {
      title: 'second Post',
      content: 'description',
      date: '2024-04-01T05:01:00Z',
      image: 'https://picsum.photos/720',
    },
    {
      title: 'third Post',
      content: 'description',
      date: '2024-03-01T05:01:00Z',
      image: 'https://picsum.photos/720',
    },
  ];

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
        showsVerticalScrollIndicator={false}>
        <View>
          <Text variant="titleMedium">Check out the latest posts!</Text>
        </View>
        {data.map(item => (
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
