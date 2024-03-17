import {StyleSheet} from 'react-native';

export const ScreensStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onBoardingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  tabContainer: {
    margin: 15,
  },
  scrollTabContainer: {
    marginHorizontal: 15,
    marginTop: 15,
    flexGrow: 1,
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 20,
  },
  smallMarginTop: {
    marginTop: 10,
  },
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  paddingVertical: {
    paddingVertical: 20,
  },
  smallPaddingVertical: {
    paddingVertical: 5,
  },
  smallPaddingTop: {
    paddingTop: 5,
  },
  smallPaddingBottom: {
    paddingBottom: 5,
  },
  fullWidth: {
    width: '100%',
    marginVertical: 10,
  },
  fullHeight: {
    height: '100%',
  },
  halfHeight: {
    height: '50%',
  },
  halfScreen: {
    width: '50%',
  },
  verticalMargin: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalContainerSpaced: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
