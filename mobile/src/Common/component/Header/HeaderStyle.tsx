import {StyleSheet} from 'react-native';

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 19,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 45,
    resizeMode: 'contain',
  },
  button: {
    width: 45,
    height: 40,
    padding: 0,
    margin: 0,
    marginTop: 10,
  },
});
