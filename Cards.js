import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

class Cards extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      phoneNumber: '+251' 
    };
  }

 render() {
   return (
     <View style={styles.container}>
       <TouchableOpacity style={styles.card}>

       </TouchableOpacity>
       <TouchableOpacity style={styles.card}>

       </TouchableOpacity>
       <TouchableOpacity style={styles.card}>

       </TouchableOpacity>
     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eeeccc",
    padding: 20,
    justifyContent: "space-between"
  },
  card: {
    width: "100%",
    height: "32%",
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10
  }
});
export default Cards;
