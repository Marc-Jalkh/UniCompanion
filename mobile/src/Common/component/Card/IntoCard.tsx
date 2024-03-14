import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';

class IntroCardProps {
  title: string;
  subTitle: string;
  gpa: string;
  grade: string;

  constructor(title: string, subTitle: string, gpa: string, grade: string) {
    this.title = title;
    this.subTitle = subTitle;
    this.gpa = gpa;
    this.grade = grade;
  }
}

const cardStyle = StyleSheet.create({
  noShadow: {
    shadowOpacity: 0,
  },
  spacing: {
    margin: 12,
    marginHorizontal: 17,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  column: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
  subTtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  headding: {
    fontSize: 34,
    fontWeight: '600',
  },
});

function IntoCard(_props: IntroCardProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.colors.secondary,
        ...cardStyle.noShadow,
        ...ScreensStyles.marginTop,
      }}
      contentStyle={cardStyle.spacing}>
      <Card.Title
        titleStyle={{color: theme.colors.surface, ...cardStyle.title}}
        subtitleStyle={{
          color: theme.colors.onSecondary,
          ...cardStyle.subTtitle,
        }}
        title={_props.title}
        subtitle={_props.subTitle}
      />
      <Card.Content style={cardStyle.content}>
        <View style={cardStyle.column}>
          <Text
            style={{color: theme.colors.background, ...cardStyle.subTtitle}}>
            GPA:
          </Text>
          <Text style={{color: theme.colors.background, ...cardStyle.headding}}>
            {_props.gpa}
          </Text>
        </View>

        <View style={cardStyle.column}>
          <Text
            style={{color: theme.colors.background, ...cardStyle.subTtitle}}>
            Grade:
          </Text>
          <Text style={{color: theme.colors.background, ...cardStyle.headding}}>
            {_props.grade}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

export default IntoCard;
