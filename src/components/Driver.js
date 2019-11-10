import React from 'react';
import { StyleSheet, View, 
  Text, Image, Modal, TouchableHighlight,
  StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { changeLanguage } from '../actions/changeLanguage';
import SettingsModal from './modal';
import { database } from '../config/firebase';
import * as Progress from 'react-native-progress';

class Driver extends React.Component {
 
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    searchingDriver: true,
    key: '',
    status: ''
  }

  static navigationOptions = ({ navigation}) => {
    return {
      title: 'Trip Details',
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

componentDidMount() {
  this.props.navigation.setParams({ toggleModal: this._toggleModal });
  database.ref('/rides').on('value', (snapshot) => {
    console.log(snapshot.val(), "snapshot")
    if(snapshot.val() === null) {
      return;
    }
    let key = this.props.navigation.getParam("rideKey");
    console.log(key, "rideKey");
    let data = snapshot.val()[key];
    if(data === undefined) {
      return;
    }
    this.setState({ key });

    let status = data['driverStatus'];
    if(status !== "pending") {
      this.setState({ searchingDriver: false, status: status });
    } else { this.setState({ searchingDriver: true }) }
    console.log( status, "firebase");
  })
}

_toggleModal = () => {
  this.setState({ modalVisible: !this.state.modalVisible });
};

cancelRequest = () => {
  this.props.navigation.navigate('Map', {
    phone: this.props.navigation.getParam("phone")
  })
  console.log(this.state.key)
  let a = database.ref('/rides').child(this.state.key).set(null);
  console.log(a);
}

 render() {
   if(this.state.searchingDriver) {
     return (
      <View style={{ height: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
        <Progress.Pie progress={0.4} indeterminate={true} size={200} color="#ddd" />
        <Text style={{fontSize: 22}}>Requesting ride...</Text>
        <TouchableOpacity onPress={ this.cancelRequest } style={styles.cancel}>
          <Text style={{ fontSize: 20, color: "#156fca", fontWeight: "700" }}> Cancel the Request </Text>
        </TouchableOpacity>
        <SettingsModal toggleModal={this._toggleModal} modalVisible={this.state.modalVisible}
        onChangeLanguage={this.props.onChangeLanguage} />
      </View>
      )
   }

   return (
     <View style={styles.container}>
       <StatusBar backgroundColor="grey"
            barStyle="light-content" />
        <View style={styles.card}>
          <View style={styles.imgCont}>
            <Image style={styles.image} source={require('../assests/img/man-1.png')} />
          </View>
          <View style={styles.details}>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.driverName}</Text>
              <Text style={styles.answer}>Taddesse Getachew</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.phone}</Text>
              <Text style={styles.answer}>+251 956 456 547</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.type}</Text>
              <Text style={styles.answer}>{this.props.phrases[`${this.props.navigation.state.params.type}`]}</Text>
            </View>
            
            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.yourDestination}</Text>
              <Text style={styles.answer}>{ this.props.navigation.state.params.destination}</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.driverStatus}</Text>
              <Text style={{...styles.answer, fontSize: 18, color: "blue"}}>{this.state.status}</Text>
            </View>
          </View>
        </View>
        <SettingsModal toggleModal={this._toggleModal} modalVisible={this.state.modalVisible}
        onChangeLanguage={this.props.onChangeLanguage} />
     </View>
   )};
  }
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  cancel: {
    width: "70%",
    borderWidth: 3,
    borderColor: "#156fca",
    borderRadius: 7,
    alignItems: 'center',
    padding: 10
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
    width: "45%"
   },
   answer: {
    // width: "50%",
    fontSize: 15,
    fontWeight: "bold",
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

export default connect(mapStateToProps, mapDispatchToProps)(Driver);