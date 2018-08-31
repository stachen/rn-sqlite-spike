/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'; import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


function errorCB(err) {
  console.log("SQL Error: " + err);
}

function successCB() {
  console.log("SQL executed fine");
}

function openCB() {
  console.log("Database OPENED");
}


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button
          title="Create Wallet and DID"
          onPress={() => {
            var SQLite = require('react-native-sqlite-storage')
            var db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB);

            db.transaction((tx) => {

              tx.executeSql(`CREATE TABLE IF NOT EXISTS wallet ( 
                key text PRIMARY KEY, 
                value text NOT NULL) `
              );

            }, (e) => { console.log(e) });



            console.log("Inserting into table");
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO wallet (key, value) VALUES (\'blah1\', \'blah1\')', [], (tx, results) => {
              });
            });


            console.log("Reading from table");
            db.transaction((tx) => {
              tx.executeSql('SELECT key, value FROM wallet', [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                  let row = results.rows.item(i);
                  console.log(`key: ${row.key}, value: ${row.value}`);
                }
              });
            });

          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
