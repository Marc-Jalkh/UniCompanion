/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IconButton, Text, TextInput, useTheme} from 'react-native-paper';
import scoreItems from './SearchAlgorithm';
import ListCard from '../Card/ListCard';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';
import {useNavigation} from '@react-navigation/native';

const searchStyle = StyleSheet.create({
  seperator: {
    height: 1,
    marginLeft: '20%',
    opacity: 0.5,
  },
  searchBar: {
    borderRadius: 10,
  },
});

class SearchableListProps {
  items: SearchableItem[];
  isSearchable: boolean;
  searchPlaceholder: string;
  rightIcon: boolean;

  constructor(
    items: SearchableItem[],
    isSearchable: boolean,
    searchPlaceholder: string,
    rightIcon: boolean = true,
  ) {
    this.items = items;
    this.isSearchable = isSearchable;
    this.searchPlaceholder = searchPlaceholder;
    this.rightIcon = rightIcon;
  }
}

class SearchableItem {
  image: string;
  title: string;
  subTitle: string | null;
  onPress: () => void;
  rightText: string | null;

  constructor(
    image: string,
    title: string,
    subTitle: string | null = null,
    onPress: () => void,
    rightText: string | null = null,
  ) {
    this.image = image;
    this.title = title;
    this.subTitle = subTitle;
    this.onPress = onPress;
    this.rightText = rightText;
  }
}

function SearchableList(props: SearchableListProps): React.JSX.Element {
  const [query, setQuery] = React.useState('');
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{...ScreensStyles.tabContainer, ...ScreensStyles.fullHeight}}>
      <View>
        <View style={ScreensStyles.horizontalContainer}>
          <TextInput
            style={ScreensStyles.container}
            value={query}
            onChangeText={setQuery}
            placeholder={props.searchPlaceholder}
            right={<Text>dsd</Text>}
            mode="outlined"
            outlineColor="transparent"
            outlineStyle={{
              ...searchStyle.searchBar,
              backgroundColor: theme.colors.surfaceVariant,
            }}
            placeholderTextColor={theme.colors.onSecondary}
            activeOutlineColor={theme.colors.secondary}
            textColor={theme.colors.secondary}
            left={
              query.length < 1 ? (
                <TextInput.Icon
                  icon="icon-name" // Replace "icon-name" with the desired icon name
                  color={theme.colors.onSecondary}
                />
              ) : null
            }
          />
          {props.rightIcon ? (
            <IconButton
              icon="icon-name"
              iconColor={theme.colors.primary}
              size={20}
              onPress={() => navigation.navigate('People')}
            />
          ) : null}
        </View>
        <Text
          variant="labelMedium"
          style={{
            color: theme.colors.onSecondary,
            ...ScreensStyles.smallMarginTop,
          }}>
          Try our new Ai powered Bot
        </Text>
      </View>
      <SearchList items={props.items} query={props.isSearchable ? query : ''} />
    </View>
  );
}

class SearchListProps {
  items: SearchableItem[];
  query: string;

  constructor(items: SearchableItem[], query: string) {
    this.items = items;
    this.query = query;
  }
}

function SearchList(props: SearchListProps): React.JSX.Element {
  const [items, setItems] = React.useState<SearchableItem[]>([]);
  const theme = useTheme();
  useEffect(() => {
    if (props.query === '') {
      setItems(props.items);
      return;
    }
    setItems(scoreItems(props.items, props.query));
  }, [props.items, props.query]);

  return (
    <FlatList
      data={items}
      renderItem={({item}) => (
        <ListCard
          image={item.image}
          title={item.title}
          subTitle={item.subTitle}
          onPress={item.onPress}
          rightText={item.rightText}
        />
      )}
      style={ScreensStyles.smallMarginTop}
      ItemSeparatorComponent={() => (
        <View
          style={{
            ...searchStyle.seperator,
            backgroundColor: theme.colors.onSecondary,
          }}
        />
      )}
      keyExtractor={item => item.title}
    />
  );
}

export {SearchableList, SearchableItem};
