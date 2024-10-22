import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Avatar, Card, ProgressBar, Text, useTheme} from 'react-native-paper';
import {ScreensStyles} from '../../utils/Assets/Styles/ScreensStyles';

class ProgressCardProps {
  major: string;
  level: string;
  progress: number;
  onPress: () => void;

  constructor(
    major: string,
    level: string,
    progress: number,
    onPress: () => void,
  ) {
    this.major = major;
    this.level = level;
    this.progress = progress;
    this.onPress = onPress;
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

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 5,
  },
  subTtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  ProgressBar: {
    marginTop: 10,
    borderRadius: 30,
    height: 7,
  },
});

function ProgressCard(_props: ProgressCardProps): React.JSX.Element {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface,
        ...ScreensStyles.marginTop,
      }}
      onPress={_props.onPress}
      contentStyle={cardStyle.spacing}>
      <Card.Title
        titleStyle={{...cardStyle.subTtitle}}
        subtitleStyle={{...cardStyle.title}}
        title={_props.level}
        subtitle={_props.major}
        // eslint-disable-next-line react/no-unstable-nested-components
        right={_ => (
          <Image
            source={require('../../utils/Assets/icons/graduate.png')}
            width={60}
            height={60}
            tintColor={theme.colors.primary}
          />
        )}
      />
      <Card.Content>
        <View style={{...ScreensStyles.fullWidth}}>
          <View style={cardStyle.content}>
            <Text style={{...cardStyle.subTtitle}}>Progress:</Text>
            <Text style={{...cardStyle.subTtitle}}>
              {_props.progress * 100}%
            </Text>
          </View>
          <ProgressBar
            progress={_props.progress}
            color={theme.colors.primary}
            indeterminate={loading}
            style={{
              backgroundColor: theme.colors.onPrimary,
              ...cardStyle.ProgressBar,
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

export default ProgressCard;
