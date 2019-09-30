import React from 'react';
import { StyleSheet, View, StatusBar, Image,
        TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class Map extends React.Component {
 state = {
   initialRegion: {
    latitude: 9.5903024,
    longitude: 41.8570132,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
   },
   currentLocation: {
     latitude: 9.5928629,
     longitude: 41.8600771
   },
   destination: ""
 }

 static navigationOptions = {
  title: 'Tap your pick up location on the map',
  headerTintColor: '#333',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#888',
    fontSize: 15,
  },

};

onBook = () => {
  if(this.state.destination.trim().length > 3) {
    this.props.navigation.navigate("Card", {
      phone: this.props.navigation.getParam("phone","0913467913"),
      pickup: this.state.currentLocation,
      destination: this.state.destination
    });
    console.log(this.props.navigation.state.params);

  }
  else {
    alert("Please, Input a valid destination");
  }
}

changeLocation (e) {
  // this.setState({ currentLocation: e.nativeEvent.coordinate });
  console.log('this.state.currentLocation');
}
 render() {
   return (
   <View style={styles.container}>
     <StatusBar backgroundColor="transparent"
            barStyle="light-content" />
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       onPress={ (e) => this.setState({currentLocation: e.nativeEvent.coordinate})}
       region={ this.state.initialRegion } >
       <Marker
          coordinate={this.state.currentLocation}
          onDragEnd={(e) => this.setState({currentLocation: e.nativeEvent.coordinate})}
          draggable
          />

     </MapView>
     <View style={styles.formContainer}>
         <View style={styles.inputContainer}>
          <TextInput placeholder="Your destination"
          style={styles.addressInput} value={this.state.destination}
          onChangeText={(text) => this.setState({destination: text})}
            />
          <Image style={styles.ping} source={require('../assests/img/location.png')} />
         </View>
         <TouchableOpacity style={styles.button}
            onPress={this.onBook} >
            <Text style={{fontSize: 18, color: "white", fontWeight: 'bold'}}>Book a ride &rarr;</Text>
        </TouchableOpacity>
     </View>
   </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: "75%",
  },
  formContainer: {
    width: "100%",
    height: "25%",
    backgroundColor: "#eee",
    justifyContent: "center"
    // alignItems: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-evenly"
  },
  addressInput: {
    width: "70%",
    borderColor: '#25bbf4',
    borderWidth: 1,
    padding: 8,
    paddingLeft: 10,
    fontSize: 15,
    margin: 10,
    borderRadius: 10,
    marginBottom: 2,
    left: "15%"
  },
  ping: {
    width: 50,
    height: 50
  },
  button: {
    alignSelf: "center",
    // width: "70%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#156fca",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    marginTop: 20,
    elevation: 5
  },
  });
export default Map;
