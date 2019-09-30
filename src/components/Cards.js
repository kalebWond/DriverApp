import React from 'react';
import { StyleSheet, View, 
  Text, Image, 
  StatusBar, TouchableOpacity } from 'react-native';

class Cards extends React.Component {
 
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Choose Service Type',
    headerTintColor: '#333',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#888',
    },

  };
onPressCard = () => {
  this.props.navigation.navigate('Driver',{
    ...this.props.navigation.state.params
  });
  console.log(this.props.navigation.state.params);

}
 render() {
   return (
     <View style={styles.container}>
       <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
        />
       <TouchableOpacity style={styles.card}
          onPress= {this.onPressCard} >
          <Image style={styles.images}  source={require('../assests/img/car-1.png')} />
          <View style={styles.textGroup}>
            <Text style={styles.detail}>Car type: Regular</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.card}
          onPress={() => alert("Sorry, this service is not yet available")} >
          <Image style={styles.images} source={require('../assests/img/car-2.png')} />
          <View style={styles.textGroup}>
            <Text style={styles.detail}>Car type: Regular</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.card}
          onPress={() => alert("Sorry, this service is not yet available")} >
          <Image style={styles.images} source={require('../assests/img/car-3.png')} />
          <View style={styles.textGroup}>
            <Text style={styles.detail}>Car type: Regular</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>
     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    padding: 20,
    justifyContent: "space-between",
  },
  // header: {
  //   fontSize: 20,
  //   textAlign: "center",
  //   marginBottom: 5,
  //   marginTop: -15
  // },
  card: {
    width: "100%",
    height: "32%",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  images: {
    width: 150,
    height: 100,
    marginTop: -15
  },
  textGroup: {
    // flexDirection: "row",
    width: "70%",
    alignItems: "center",
  },
  detail: {
    fontSize: 15,
    marginBottom: 5
  }
});

export default Cards;
