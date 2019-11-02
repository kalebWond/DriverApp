import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, Image, Modal,
        TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { changeLanguage } from '../actions/changeLanguage';
import SettingsModal from './modal';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';

class Map extends React.Component {
 state = {
   initialRegion: {
    latitude: 9.5903024,
    longitude: 41.8570132,
    latitudeDelta: 0.005,
    longitudeDelta: 0.0021,
   },
   currentLocation: {
     latitude: 9.5903024,
     longitude: 41.8570132
   },
   destination: "",
   modalVisible: false
 }

 static navigationOptions = ({ navigation}) => {
    return {
      title: 'Tap your location',
      headerTintColor: '#333',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#888',
      },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('toggleModal')}>
          <Icon name="cog" size={30} style={{marginRight: 20}} color="#888" />
        </TouchableOpacity>
      )
    }
  }

componentDidMount = () => {
  this.props.navigation.setParams({ toggleModal: this._toggleModal });
  this.pingLocation();
}

_toggleModal = () => {
  this.setState({ modalVisible: !this.state.modalVisible });
};

pingLocation = () => {
   
  if (this.props.navigation.state.params.hasLocationPermission) {
    Geolocation.getCurrentPosition(
        (position) => {
          let {latitude, longitude} = position.coords;
          console.log(position.coords, "success");
          // console.log({...this.state.initialRegion, latitude, longitude});
          this.setState({
            initialRegion: {...this.state.initialRegion, latitude, longitude},
            currentLocation: {latitude, longitude}
            });
          console.log(this.state.initialRegion);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            if(error.code === 3) {
              this.pingLocation();
              console.log("Retrying...")
            }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
}
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
    alert(this.props.phrases.mapAlert);
  }
}

changeLocation (e) {
  // this.setState({ currentLocation: e.nativeEvent.coordinate });
  console.log('this.state.currentLocation');
}


 render() {
   return (
   <View style={styles.container}>
     <StatusBar backgroundColor="grey"
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
          <TextInput placeholder={this.props.phrases.yourDestination}
          style={styles.addressInput} value={this.state.destination}
          onChangeText={(text) => this.setState({destination: text})}
            />
          <TouchableOpacity onPress={this.pingLocation}>
            <Image style={styles.ping} source={require('../assests/img/location.png')} />
          </TouchableOpacity>
         </View>
         <TouchableOpacity style={styles.button}
            onPress={this.onBook} >
            <Text style={{fontSize: 18, color: "white", fontWeight: 'bold'}}>{this.props.phrases.bookRide} &rarr;</Text>
        </TouchableOpacity>
     </View>
     <SettingsModal toggleModal={this._toggleModal} modalVisible={this.state.modalVisible}
        onChangeLanguage={this.props.onChangeLanguage} />
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
    marginTop: 18,
    elevation: 5
  },
  });

  const mapStateToProps = (state) => {
    return {
      phrases: state.language.phrases
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onChangeLanguage: (language) => dispatch(changeLanguage(language))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Map);