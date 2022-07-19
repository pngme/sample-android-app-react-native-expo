import React from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import styles from './styles';
import TextField from '../../components/TextInputField';

const Login = ({ navigation }) => (
  <SafeAreaView style={styles.safeAreaContent}>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.scrollViewWrapper}>
      <View style={styles.screenWrapper}>
        <View style={styles.content}>
          <TextField label="First Name" value="username" disabled />
          <TextField label="Password" value="********" disabled />
        </View>
        <View style={styles.buttonsWrapper}>
          <Button title="Sign in" disabled />
          <View style={styles.secondButtonMarginTop}>
            <Button title="Sign up" onPress={() => navigation.navigate('Signup')} />
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default Login;
