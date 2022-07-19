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
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 3,
  },
  permissionsCheckbox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    ...TextStyles.title,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    ...TextStyles.medium,
  },
  buttonsWrapper: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default styles;
