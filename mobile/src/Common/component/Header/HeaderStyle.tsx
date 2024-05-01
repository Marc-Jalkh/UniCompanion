import {StyleSheet} from 'react-native';

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 19,
  },
  containerVariant: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 30,
    paddingHorizontal: 19,
    alignItems: 'center',
  },
  chatContainerVariant: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 60,
    paddingHorizontal: 19,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
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
