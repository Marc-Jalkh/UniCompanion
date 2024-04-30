import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';

class ProfileCardProps {
  name: string;
  faculty: string;
  id: string;
  avatar: string;

  constructor(name: string, faculty: string, id: string, avatar: string) {
    this.name = name;
    this.faculty = faculty;
    this.id = id;
    this.avatar = avatar;
  }
}

const cardStyle = StyleSheet.create({
  noShadow: {
    shadowOpacity: 0,
  },
  spacing: {
    margin: 10,
    marginHorizontal: 17,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  columnLeft: {
    flexDirection: 'column',
    width: '60%',
  },
  column: {
    flexDirection: 'column',
    width: '40%',
  },
  imgCol: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  marginBtm: {
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
  subTtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  headding: {
    fontSize: 20,
    fontWeight: '500',
  },
});

function ProfileCard(_props: ProfileCardProps): React.JSX.Element {
  const theme = useTheme();
  const [height, setHeight] = React.useState(0);
  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface,
        ...cardStyle.noShadow,
      }}
      contentStyle={cardStyle.spacing}>
      <Card.Content style={cardStyle.content}>
        <View
          style={cardStyle.columnLeft}
          onLayout={event => {
            setHeight(event.nativeEvent.layout.height);
          }}>
          <Text style={{...cardStyle.subTtitle}}>Name:</Text>
          <Text numberOfLines={1} style={{...cardStyle.headding}}>
            {_props.name}
          </Text>
          <Text style={{...cardStyle.subTtitle}}>Faculty:</Text>
          <Text numberOfLines={1} style={{...cardStyle.headding}}>
            {_props.faculty}
          </Text>
          <Text style={{...cardStyle.subTtitle}}>ID:</Text>
          <Text
            numberOfLines={1}
            style={{...cardStyle.headding, ...cardStyle.marginBtm}}>
            {_props.id}
          </Text>
        </View>

        <View style={cardStyle.column}>
          <Image
            style={{height: height, ...cardStyle.imgCol}}
            source={{uri: _props.avatar}}
            resizeMode="cover"
          />
        </View>
      </Card.Content>
    </Card>
  );
}

export default ProfileCard;
