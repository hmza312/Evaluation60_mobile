import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  Alert,
  Modal,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Row,
  Col
} from 'react-native';
import axiosInstance from '../../APIs/axiosApi';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
// import MenuImage from '../../components/MenuImage/MenuImage';
import Images from '../../constants/Images';
import nowTheme from '../../constants/Theme'
// import { Dropdown } from 'react-native-material-dropdown';
// import BackButton from '../../components/B';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AddModal from './Addimagemodal';
import treatment from './Treatment'
const { width, height } = Dimensions.get('screen');
var name;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Disease_Detection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DiseaseResult: {},
      modalVisible: false,
      uri: "",
      filename: '',
      type: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  cameraLaunch = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result.uri)
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        this.setState({ uri: result });
        this.setState({ filename: filename });
        this.setState({ type: type })

      }
      console.log("hah", this.state.data)
      console.log(result);
    } catch (E) {
      console.log(E);
    }

  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result.uri)
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        this.setState({ uri: result });
        this.setState({ filename: filename });
        this.setState({ type: type })

      }
      console.log("hah", this.state.data)
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  SendImage = async (event) => {
    event.preventDefault();
    const payload = { image: this.state.uri.base64 }
    console.log(payload)
    await fetch('https://d7167f99a769.ngrok.io/disease/classify/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then((json) =>
        this.setState({
          DiseaseResult: json,
          modalVisible: true
        })
      )
    console.log(this.state.DiseaseResult)
  }
  async handleSubmit(event) {


  }
  render() {
    let imageUri = `data:image/jpg;base64,${this.state.uri.base64}`;
    imageUri && console.log({ uri: imageUri.slice(0, 100) });
   
    return (
      <DismissKeyboard>

        <Block flex middle>


          <Block flex middle >
            <Block  >
              <Block flex space="evenly">
                <Block flex={1} middle space="between">
                  <Block center flex={0.9} >
                    <Block flex space="between">
                      <Block flex space="between">
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                              Alert.alert("Modal has been closed.");
                            }}
                          >


                            <View style={styles.centeredView}>
                              {
                                this.state.modalVisible ?
<ScrollView>
                                  <View style={styles.modalView}>
                                    <Image
                                      source={{ uri: `data:image/jpg;base64,${this.state.DiseaseResult.images.superimposed}` }}
                                      style={{ width: 300, height: 270 }}
                                    />


                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Predicted Disease </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.DiseaseResult.predictedCategory.name} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Disease Treatment </Text>
                                    {
                                      treatment.map((item) => {
                                        if (item.title === this.state.DiseaseResult.predictedCategory.name) {
                                          return (
                                            <View>
                                              <Text style={{ fontSize: 20, }}>{item.content}</Text>
                                            </View>
                                          )
                                        }
                                        else{
                                          return(
                                            <View></View>
                                          )
                                        }
                                      })
                                    }


                                    <TouchableHighlight
                                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                      onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                      }}
                                    >
                                      <Text style={styles.textStyle}>Close</Text>
                                    </TouchableHighlight>

                                  </View>
                                  </ScrollView>
                                  :
                                  <View style={styles.modalView}>
                                    <Text></Text>
                                  </View>
                              }
                            </View>

                          </Modal>

                          <Block width={width * 0.8} style={{ marginTop: (width / 3) }}  >
                            <Image
                              source={{ uri: imageUri }}
                              style={{ width: 328, height: 300 }}
                            />
                            <Block style={styles.Centered}>
                              <Block >
                                <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}  >
                                  <Text style={styles.buttonText}>Camera</Text>
                                </TouchableOpacity>
                              </Block>
                              <Block center>
                                <TouchableOpacity onPress={this._pickImage} style={styles.button}  >
                                  <Text style={styles.buttonText}>Select File</Text>
                                </TouchableOpacity>
                              </Block>
                            </Block>
                          </Block>

                          <TouchableHighlight
                            style={styles.openButton}
                            onPress={this.SendImage}
                          // onPress={() => {
                          //   this.setModalVisible(true);
                          // }}
                          >
                            <Text style={styles.textStyle}>Predict Disease</Text>
                          </TouchableHighlight>
                        </Block>


                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>

            </Block>
          </Block>


        </Block>

      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  Centered: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    width: 150,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7
  },
  registerContainer: {
    marginTop: 55,

  },
  openButton: {
    backgroundColor: "green",
    borderRadius: 20,
    marginTop: 30,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  inputsrow: {
    borderWidth: 1,
    width: 190,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 0
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },

});

export default Disease_Detection;
