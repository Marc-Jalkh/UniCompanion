import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ScreensStyles} from '../Common/utils/Assets/Styles/ScreensStyles';
import {HeaderVariantView} from '../Common/component/Header/Header';
import {Divider, Text, useTheme} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

const postStyle = StyleSheet.create({
  image: {
    height: 200,
    borderRadius: 10,
  },
  veritcal: {
    marginVertical: 5,
  },
  divider: {
    borderRadius: 200,
  },
});

function Post(): React.JSX.Element {
  const route = useRoute();
  const param1Value = route.params?.param1;

  const post = {
    image: 'https://picsum.photos/720',
    published: '2 weeks ago',
    title: 'dsad1' + param1Value,
    description:
      'Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum',
  };
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
        <Image style={postStyle.image} source={{uri: post.image}} />
        <Text style={postStyle.veritcal} variant="titleLarge">
          {post.title}
        </Text>
        <Text style={{color: theme.colors.onSecondary}} variant="titleSmall">
          {post.published}
        </Text>
        <Divider
          style={{
            ...postStyle.veritcal,
            ...postStyle.divider,
            backgroundColor: theme.colors.onPrimary,
          }}
          bold={true}
        />
        <Text style={postStyle.veritcal} variant="bodyLarge">
          {post.description}
        </Text>
      </ScrollView>
    </View>
  );
}

export default Post;
