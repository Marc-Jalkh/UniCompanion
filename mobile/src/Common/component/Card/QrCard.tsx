import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

class QrCardProps {
  onPress: () => void;
  title: string;
  qr: string;

  constructor(onPress: () => void, title: string, qr: string) {
    this.onPress = onPress;
    this.title = title;
    this.qr = qr;
  }
}

const cardStyle = StyleSheet.create({
  noShadow: {
    shadowOpacity: 0,
  },
  margin: {
    margin: 12,
  },
  cover: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  center: {
    marginHorizontal: 25,
  },
  title: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
});

function QrCard(_props: QrCardProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <Card
      style={{backgroundColor: theme.colors.surface, ...cardStyle.noShadow}}
      contentStyle={{...cardStyle.margin, ...cardStyle.cover}}
      onPress={_props.onPress}>
      <Card.Content>
        <Text style={cardStyle.title}>{_props.title}</Text>
        {/* <QRCode
          value={_props.qr}
          color={theme.colors.secondary}
          size={200} // Set the size of the QR code
        /> */}
        <View style={cardStyle.center}>
          <QRCode value={_props.qr} size={250} color={theme.colors.secondary} />
        </View>
      </Card.Content>
    </Card>
  );
}

export default QrCard;
