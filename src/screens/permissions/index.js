import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
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

  const handleContinue = async () => {
    if (toggleCheckBox) {
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
      });
      navigateToLoanScreen();
    } else {
      navigateToLoanScreen();
    }
  };

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
