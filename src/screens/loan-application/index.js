import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import styles from './styles';
import Colors from '../../theme/Colors';

const Permissions = (props) => {
  const { navigation } = props;

  const [loanAmountValue, setLoanAmountValue] = useState(100);
  const [showSuccess, setShowSuccess] = useState(false);

  const renderLoanApplicationAmount = () => (
    <View style={styles.screenWrapper}>
      <View style={styles.titleContent}>
        <Text style={styles.title}>Loan application</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Loan Amount</Text>
        <Text style={styles.loanAmountValue}>{`${loanAmountValue} NGN`}</Text>
      </View>

      <Slider
        containerStyle={{ width: '90%' }}
        thumbTintColor={Colors.primary}
        minimumTrackTintColor={Colors.primary}
        maximumValue={5000}
        step={1}
        value={loanAmountValue}
        onValueChange={(value) => setLoanAmountValue(value[0])}
      />

      <View style={styles.buttonsWrapper}>
        <Button title="NEXT" onPress={() => setShowSuccess(true)} />
      </View>
    </View>
  );

  const renderSuccessMessage = () => (
    <View style={styles.screenWrapper}>
      <View style={styles.successTitleContent}>
        <Text style={styles.title}>Loan application received!</Text>
      </View>
      <View style={styles.buttonsWrapper}>
        <Button title="HOME" onPress={() => navigation.navigate('Welcome')} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContent}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewWrapper}>
        {showSuccess ? renderSuccessMessage() : renderLoanApplicationAmount()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Permissions;
