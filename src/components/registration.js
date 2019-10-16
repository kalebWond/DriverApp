import React from 'react';
import { StyleSheet, View, Text, StatusBar, PermissionsAndroid,
   TextInput, Image, TouchableOpacity } from 'react-native';

class Registration extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      phoneNumber: '+251',
      hasLocationPermission: ''
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount= () => {
    var that = this;
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'ባለጋሪ ተጓዥ App Location Permission',
            message:
              'ባለጋሪ ተጓዥ App needs access to your Location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You have the Location permission');
          that.setState({hasLocationPermission: true})
        } else {
          console.log('Location permission denied');
          that.setState({hasLocationPermission: false})
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestLocationPermission();
  }

  onSubmit = () => {
    if(this.state.phoneNumber.trim().length >= 4 && this.state.phoneNumber.length > 9) {
      this.props.navigation.navigate("Map", {
        "phone": this.state.phoneNumber,
        "hasLocationPermission": this.state.hasLocationPermission
      });
    }
    else {alert("Please, type a correct phone number")}
  }

 render() {
   return (
   <View style={styles.container}>
      <StatusBar backgroundColor="transparent"
              barStyle="light-content" />
      <Text style={styles.title}>Please, enter your phone number</Text>
      <View style={styles.inputContainer}>
        {/* <Text style={{fontSize: 20}}>+251</Text>  */}
        <TextInput
          defaultValue="+251 "
          maxLength={13}
          keyboardType={'phone-pad'}
          style={styles.phoneInput}
          onChangeText={(text) => this.setState({phoneNumber: text})}
          value={this.state.phoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.button}
        onPress={this.onSubmit} >
        <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>Submit</Text>
      </TouchableOpacity>
      <Image style={styles.img}
            source={require('../assests/img/car-4.png')}
          />
   </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    backgroundColor: "#ddd"
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%"
  },
  phoneInput: {
    flex: 1,
    borderColor: '#25bbf4',
    borderWidth: 1,
    padding: 10,
    // paddingLeft: 5,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: -50
  },
  button: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#156fca", 
    padding: 10,
    borderRadius: 50,
    marginTop: -50,
    elevation: 5

  },
  img: {
    width: 300,
    height: 250
  }
  });
export default Registration;
