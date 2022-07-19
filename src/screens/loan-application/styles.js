import { StyleSheet } from 'react-native';
import TextStyles from '../../theme/TextStyles';

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
    paddingBottom: 90,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 3,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    ...TextStyles.title,
  },
  subtitle: {
    ...TextStyles.medium,
    fontSize: 24,
  },
  loanAmountValue: {
    ...TextStyles.medium,
  },
  buttonsWrapper: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  successTitleContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 3,
  },
});

export default styles;
