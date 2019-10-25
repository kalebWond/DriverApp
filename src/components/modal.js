import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SettingsModal extends React.Component {

    render() {
        return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={this.props.toggleModal}>
          <View>
            <View style={{alignItems: "flex-end", marginRight: 20, marginTop: 20}}>
              <TouchableOpacity onPress={this.props.toggleModal }>
                <Icon name="close" size={35} style={{marginRight: 20}} color="#156fca" />                    
              </TouchableOpacity>
            </View>
            <View style={{height:"90%", alignItems: "center", justifyContent:"center"}}>
              <Text style={{fontSize: 30, fontWeight:"600", marginBottom: 25, color: "#156fca"}}>Choose Language</Text>

              <TouchableOpacity onPress={() => {
                this.props.onChangeLanguage("am"); 
                this.props.toggleModal()}}>
                <Text style={{ fontSize: 22, marginBottom: 10}}>አማርኛ</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.props.onChangeLanguage("or"); 
                this.props.toggleModal()}}>
                <Text style={{ fontSize: 22, marginBottom: 10}}>Afaan oromoo</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.props.onChangeLanguage("so"); 
                this.props.toggleModal()}}>
                <Text style={{ fontSize: 22, marginBottom: 10}}>af somali</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.props.onChangeLanguage("en"); 
                this.props.toggleModal()}}>
                <Text style={{ fontSize: 22, marginBottom: 10}}>English</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )
    }
}

export default SettingsModal;