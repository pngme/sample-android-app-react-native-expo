import React from 'react';
import { Button, SafeAreaView, ScrollView, View, Text } from 'react-native';

import styles from './styles';

const Welcome = (props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.safeAreaContent}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewWrapper}>
        <View style={styles.screenWrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>Hello! World's best banking app</Text>
          </View>

          <View style={styles.buttonsWrapper}>
            <Button title="APPLY FOR A LOAN" onPress={() => navigation.navigate('Permissions')} />
            <View style={styles.secondButtonMarginTop}>
              <Button title="MY ACCOUNTS" disabled />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
