import {StyleSheet} from 'react-native';

export const TabScreensStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onBoardingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 20,
  },
  paddingVertical: {
    paddingVertical: 20,
  },
  smallPaddingVertical: {
    paddingVertical: 5,
  },
  fullWidth: {
    width: '100%',
    marginVertical: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customButton: {
    textAlign: 'center',
    borderRadius: 10,
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
