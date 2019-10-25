import React from 'react';
import { StyleSheet, View, 
  Text, Image, Modal,
  StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { changeLanguage } from '../actions/changeLanguage';
import SettingsModal from './modal';

class Driver extends React.Component {
 
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false
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
}

_toggleModal = () => {
  this.setState({ modalVisible: !this.state.modalVisible });
};


 render() {
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
              <Text style={styles.answer}>{this.props.navigation.state.params.type}</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.yourDestination}</Text>
              <Text style={styles.answer}>{ this.props.navigation.state.params.destination}</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.question}>{this.props.phrases.driverStatus}</Text>
              <Text style={{...styles.answer, color: "blue"}}>{this.props.phrases.ontheway}</Text>
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