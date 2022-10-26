import { Button, NativeModules, PermissionsAndroid, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { go } from '@pngme/react-native-sms-pngme-android';
import Checkbox from 'expo-checkbox';
import Constants from 'expo-constants';

import styles from './styles';
import { useUser } from '../../context/user-context';

const Permissions = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [toggleCheckBox, setToggleCheckBox] = useState(user.pngmePermissionWasSelected);

  const navigateToLoanScreen = () => {
    navigation.navigate('LoanApplication');
  };

  // Here we check if permission can be asked again, if user clicks on `never ask again` it will return false
  const canPermissionBeAskedAgain = async() => {
    try {
      const canIt = await NativeModules.PermissionsAndroid.shouldShowRequestPermissionRationale(PermissionsAndroid.PERMISSIONS.READ_SMS)
      return canIt;
    } catch(e) {
      return true
    }
  }

  const requestSMSPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const handleContinue = async() => {
    if (toggleCheckBox && !user.pngmePermissionWasSelected) {
      // if user confirm they want to use Pngme, we store that selection
      setUser({ pngmePermissionWasSelected: true });
      await go({
        clientKey: Constants.manifest.extra.pngmeSdkToken,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: `234${user.phoneNumber}`,
        isKycVerified: false,
        companyName: 'Acme Bank',
        externalId: '',
        hidePngmeDialog: false, // if you want to hide the Pngme dialog, set this to true
      });
    } else if (toggleCheckBox && user.pngmePermissionWasSelected) {
      const reRequestSMSPermission = await canPermissionBeAskedAgain();
      if (reRequestSMSPermission) {
        await requestSMSPermission();
      }
    }
    navigateToLoanScreen();
  }

  const renderCheckboxLine = (label, isSelected, onValueChange, disabled = false) => (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isSelected}
        onValueChange={onValueChange}
        style={styles.checkbox}
        disabled={disabled}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContent}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewWrapper}>
        <View style={styles.screenWrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>Select Optional permissions</Text>
          </View>
          <View style={styles.permissionsCheckbox}>
            {renderCheckboxLine('Share location', false, () => {}, true)}
            {renderCheckboxLine('Receive promotions', false, () => {}, true)}
            {renderCheckboxLine(
              'Use Pngme',
              toggleCheckBox,
              setToggleCheckBox,
              user.pngmePermissionWasSelected
            )}
          </View>
          <View style={styles.buttonsWrapper}>
            <Button title="CONTINUE" onPress={handleContinue} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Permissions;
