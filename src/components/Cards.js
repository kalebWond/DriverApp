import React from 'react';
import { StyleSheet, View, 
  Text, Image, Modal, SafeAreaView, ScrollView,
  StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { changeLanguage } from '../actions/changeLanguage';
import SettingsModal  from './modal';
import { database } from '../config/firebase';

class Cards extends React.Component {
 
  constructor(props) {
    super(props);

  }

  state = {
    modalVisible: false
  }

  static navigationOptions = ({ navigation}) => {
    return {
      title: 'Choose Service Type',
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
  }

  _toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  onPressCard = (type) => {

    let key = database.ref('/rides').push().key;
    database.ref('/rides').child(key).set({
      phoneNumber: this.props.navigation.getParam("phone"),
      pickup: this.props.navigation.getParam("pickup"),
      destination: this.props.navigation.getParam("destination"),
      type: type,
      passengerKey: this.props.navigation.getParam("passengerKey"),
      driverStatus: 'pending',    // ['pending', 'on the way', 'arrived']
    }, () => {
      this.props.navigation.navigate('Driver',{
        ...this.props.navigation.state.params, 
        type: type,
        rideKey: key
      });
    });

  }
 render() {
   return (
     <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <TouchableOpacity style={styles.card}
          onPress= {() => this.onPressCard("bajaj")} >
          <Image style={{width: 100, height: 80, marginBottom: 10}}  source={require('../assests/img/car-5.png')} />
          <View style={styles.textGroup}>
          <Text style={styles.detail}>{this.props.phrases.carType}: {this.props.phrases.bajaj}</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>

      <TouchableOpacity style={styles.card}
          onPress= {() => this.onPressCard("regular")} >
          <Image style={styles.images}  source={require('../assests/img/car-1.png')} />
          <View style={styles.textGroup}>
            <Text style={styles.detail}>{this.props.phrases.carType}: {this.props.phrases.sedan}</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>

       <TouchableOpacity style={styles.card}
          onPress= {() => this.onPressCard("sedan")} >
          <Image style={styles.images} source={require('../assests/img/car-2.png')} />
          <View style={styles.textGroup}>
            <Text style={styles.detail}>{this.props.phrases.carType}: {this.props.phrases.regular}</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>

       <TouchableOpacity style={styles.card}
          onPress= {() => this.onPressCard("ambulance")} >
          <Image style={styles.images} source={require('../assests/img/car-3.png')} />
          <View style={styles.textGroup}>
            <Text style={styles.detail}>{this.props.phrases.carType}: {this.props.phrases.ambulance}</Text>
            <Text style={styles.detail}>12:00am - 05:00pm: 10 br</Text>
            <Text style={styles.detail}>05:00pm - 12:00am: 15 br</Text>
          </View>
       </TouchableOpacity>

       <SettingsModal toggleModal={this._toggleModal} modalVisible={this.state.modalVisible}
        onChangeLanguage={this.props.onChangeLanguage} />
      </ScrollView>
    </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // marginTop: 10,
    marginBottom: 10,
    padding: 15,
    // height: "35%",
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

export default connect(mapStateToProps,mapDispatchToProps)(Cards);