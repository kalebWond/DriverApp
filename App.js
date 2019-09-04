import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


class App extends React.Component {
 state = {
   initialRegion: {
    latitude: 9.5903023,
    longitude: 41.8570132,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
   },
   currentLocation: {
     latitude: 9.5928629,
     longitude: 41.8600771
   }
 }
 onComponentDidMount = () => {
   alert('hello');
 }
 render() {
   return (
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={ this.state.initialRegion }
     >
       <Marker
          coordinate={this.state.currentLocation}
          onDragEnd={(e) => this.setState({ currentLocation: e.nativeEvent.coordinate })}
          />

     </MapView>
   </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "90%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  });
export default App;
