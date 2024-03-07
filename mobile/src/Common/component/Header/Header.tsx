import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {headerStyles} from './HeaderStyle';
import {useNavigation} from '@react-navigation/native';

export class HeaderProps {
  pageTitle!: String | undefined;

  constructor(pageTitle: String | undefined = undefined) {
    this.pageTitle = pageTitle;
  }
}

function HeaderView(): React.JSX.Element {
  const navigation = useNavigation();
  const [pageTitle, setPageTitle] = useState(
    navigation?.getState()?.routes[navigation?.getState()?.index]?.name ?? '',
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const newPageTitle =
        navigation?.getState()?.routes[navigation?.getState()?.index]?.name;
      setPageTitle(newPageTitle);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={headerStyles.container}>
      <Image
        style={headerStyles.icon}
        source={require('../../utils/Assets/usek.png')}
      />
      {pageTitle && <Text style={{...headerStyles.title}}>{pageTitle}</Text>}
      <Button
        icon={require('../../utils/Assets/icons/bell.png')}
        mode="text"
        style={headerStyles.button}
        // eslint-disable-next-line react-native/no-inline-styles
        labelStyle={{fontSize: 25}}
        onPress={() => console.log('Pressed')}
        children={undefined}
      />
    </View>
  );
}

export default HeaderView;
