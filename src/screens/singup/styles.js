import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaContent: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewWrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  screenWrapper: {
    padding: 30,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  secondButtonMarginTop: {
    marginTop: 10,
  },
});

export default styles;
