import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import TextField from '../../components/TextInputField';
import { useUser } from '../../context/user-context';
import styles from './styles';

const SignUp = ({ navigation }) => {
  const { setUser } = useUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.safeAreaContent}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewWrapper}>
        <View style={styles.screenWrapper}>
          <View style={styles.content}>
            <TextField label="First Name" value={firstName} onChangeText={setFirstName} />
            <TextField label="Last Name" value={lastName} onChangeText={setLastName} />
            <TextField label="Email" value={email} onChangeText={setEmail} />
            <TextField
              label="Phone"
              prefix="+234"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.buttonsWrapper}>
            <Button
              title="CREATE ACCOUNT"
              onPress={() => {
                setUser({
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                });
                navigation.navigate('Permissions');
              }}
              disabled={!firstName || !lastName || !email || !phoneNumber}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
