import React from 'react';
import { StyleSheet, View, 
  Text, Image, 
  StatusBar, TouchableOpacity } from 'react-native';

class Driver extends React.Component {
 
  constructor(props) {
    super(props);
  }

 render() {
   return (
     <View style={styles.container}>
       <StatusBar backgroundColor="orange"
            barStyle="light-content" />
        <View style={styles.card}>
          
          <View style={styles.details}>

            <View style={styles.detailGroup}>
              <Text>Driver name</Text>
              <Text>Taddesse Getachew</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text>Gender</Text>
              <Text>Male</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text>Phone number</Text>
              <Text>+251 956 456 547</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text>Car model</Text>
              <Text>Toyota Vitz</Text>
            </View>

          </View>
        </View>
     </View>
   )};
  }
const styles = StyleSheet.create({
   container: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      borderWidth: 1
   },
  card: {
    width: "70%",
    height: "70%",
    backgroundColor: "#eee",
    elevation: 5,
    borderRadius: 5
   },
   detailGroup: {
    justifyContent: "space-between",
    flexDirection: "row",

   }
});
export default Driver;
