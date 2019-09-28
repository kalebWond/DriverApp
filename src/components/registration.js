import React from 'react';
import { StyleSheet, View, Text, StatusBar,
   TextInput, Image, TouchableOpacity } from 'react-native';

class Registration extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      phoneNumber: '+251 ' 
    };
  }

 render() {
   return (
   <View style={styles.container}>
      <StatusBar backgroundColor="blue"
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
      <TouchableOpacity style={styles.button}>
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
    borderColor: '#156fca',
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
