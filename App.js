/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';import
{
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
          onPress={() =>
          {
            var SQLite = require('react-native-sqlite-storage') 
            var db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB);

            db.transaction((tx) => {

              ts.executeSql(`CREATE TABLE data ( 
                key text PRIMARY KEY, 
                value text NOT NULL `
               );

              tx.executeSql('SELECT key, value FROM data', [], (tx, results) => {
                  console.log("Query completed");
            
                  // Get rows with Web SQL Database spec compliance.
            
                  var len = results.rows.length;
                  for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log(`key: ${row.name}, value: ${row.deptName}`);
                  }
            
                  // Alternatively, you can use the non-standard raw method.
            
                  /*
                    let rows = results.rows.raw(); // shallow copy of rows Array
            
                    rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
                  */
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
