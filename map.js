import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { PermissionsAndroid } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

// async function requestCameraPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         'title': 'Cool Photo App Camera Permission',
//         'message': 'Cool Photo App needs access to your camera ' +
//                    'so you can take awesome pictures.'
//       }
//     )
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the camera")
//     } else {
//       console.log("Camera permission denied")
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }

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
   }
 }
 componentDidMount = () => {
  // Geolocation.getCurrentPosition((data) => {
  //   alert(data)
  // },
  // (err) => {
  //   alert(err)
  // }
  // )
}
 render() {
   return (
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={ this.state.initialRegion } >
       <Marker
          coordinate={this.state.currentLocation}
          onDragEnd={(e) => this.setState({ currentLocation: e.nativeEvent.coordinate })}
          />

     </MapView>
     <View style={styles.formContainer}>
        <View>
          <TextInput placeholder="Your location"
            style={styles.addressInput}
          /> 
         </View>
         <View>
          <TextInput placeholder="Your destination"
          style={styles.addressInput}
            />
         </View>
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
    height: "70%",
  },
  formContainer: {
    width: "100%",
    height: "30%",
    backgroundColor: "#eee",
  },
  addressInput: {
    width: "60%",
    borderColor: 'orange',
    borderWidth: 1,
    padding: 5,
    // paddingLeft: 5,
    fontSize: 15,
    borderRadius: 10,
    margin: 10
  }
  });
export default Map;
