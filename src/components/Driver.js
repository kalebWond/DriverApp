import React from 'react';
import { StyleSheet, View, 
  Text, Image, 
  StatusBar, TouchableOpacity } from 'react-native';

class Driver extends React.Component {
 
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Trip Details',
    headerTintColor: '#333',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#888',
    },

  };

componentDidMount() {
  console.log(this.props.navigation.state)
}

 render() {
   return (
     <View style={styles.container}>
       <StatusBar backgroundColor="transparent"
            barStyle="light-content" />
        <View style={styles.card}>
          <View style={styles.imgCont}>
            <Image style={styles.image} source={require('../assests/img/man-1.png')} />
          </View>
          <View style={styles.details}>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>Driver name</Text>
              <Text style={styles.answer}>Taddesse Getachew</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>Phone number</Text>
              <Text style={styles.answer}>+251 956 456 547</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>Car model</Text>
              <Text style={styles.answer}>Toyota</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>Your destination</Text>
              <Text style={styles.answer}>{ this.props.navigation.state.params.destination}</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>Driver Status</Text>
              <Text style={{...styles.answer, color: "blue"}}>On the way</Text>
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
    backgroundColor: "#eee",
  },
  card: {
    width: "75%",
    height: "70%",
    elevation: 5,
    borderRadius: 5,
    justifyContent: "space-between",
    padding: 20,
    marginTop: -30
   },
   imgCont: {
    alignItems: "center",
    marginTop: -35
   },
   image: {
    width: 90, 
    height: 90
   },
   details: {
    flex: 1,
    justifyContent: "space-evenly",
   },
   detailGroup: {
    justifyContent: "space-between",
    flexDirection: "row",

   },
   question: {

   },
   answer: {
     fontSize: 15,
     fontWeight: "bold"
   }
});
export default Driver;
