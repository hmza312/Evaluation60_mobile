import React from 'react';
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
  ScrollView
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

const { width, height } = Dimensions.get('screen');
var name;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class AddProductsFarmer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value: 1,
      modalVisible:false,
      uri:"",
      filename:'',
      type:'',
      data:[],
      productName:"",
      category:"",
      productQuantity:"",
      qtType:"",
      productType:"",
      productPrice:"",
      description:"" ,
      CompanyName:"",
  }
  this.handleSubmit=this.handleSubmit.bind(this);

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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result.uri)  
  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  this.setState({ uri:localUri});
   this.setState({ filename: filename});
   this.setState({type:type})

    }
    console.log("hah",this.state.data)
    console.log(result);
  } catch (E) {
    console.log(E);
  }
};
async handleSubmit(event) {
 

  event.preventDefault();

  var quantity= this.state.productQuantity+" "+this.state.qtType;
  console.log(this.state.productName)
  console.log(this.state.category)
  console.log(this.state.productQuantity)
  console.log(this.state.qtType)
  console.log(this.state.productType)
  console.log(this.state.productPrice)
  console.log(this.state.image)
  console.log(this.state.description)
  console.log(await axiosInstance.getUserpk())
  console.log("imageall",this.state.image)
  console.log("image",this.state.name)
 

  const uploadData = new FormData();
      uploadData.append('user',await axiosInstance.getUserpk())
      uploadData.append('productName',this.state.productName)
      uploadData.append('category',this.state.category)
      uploadData.append('productPicture',{uri:this.state.uri, name:this.state.filename,type:this.state.type })
      uploadData.append('productQuantity', this.state.productQuantity)
      uploadData.append('productUnit', this.state.qtType)
      uploadData.append('prodyctType', this.state.productType)
      uploadData.append('productPrice', this.state.productPrice)
      uploadData.append('description', this.state.description)
      uploadData.append('CompanyName', "")
console.log(uploadData)
//  http://1eb751475d14.ngrok.io/media/FarmerProducts/Tomato/0aa8966d-5232-45e4-9103-15b79e16eb87.jpg
try {
      await axiosInstance.addProduct(uploadData).then(response=>{
          if(response.status === 201){
              console.log(response);
              alert('product successfully added');
              //window.location.reload();
      }
      else{
          alert("Something went wrong! Try again.");
      }
      })
      
  } catch (error) {
      console.log(error);
  }

}

    // static navigationOptions = ({ navigation }) => {
    //   return {s
    //     title: 'Add Farmer Products',
    //     headerTransparent: 'true',
    //     headerLeft: (
    //       <BackButton
    //         onPress={() => {
    //           navigation.goBack();
    //         }}
    //       />
    //     )
    //   };
    // };
    render() {
      const data = [{
          value: 'Vegetable',
        }, {
          value: 'Fruits',
        }, {
          value: 'Whole Grain',
        },
        ];
      
        const data1 = [{
            value: 'Kg',
          }, {
            value: 'Mun',
          }
          ];
          const data2 = [{
            value: 'Harvested Crops',
          }, {
            value: 'Standing Crops',
          }
          ];
        
      return (
        <DismissKeyboard>
         
          <Block flex middle>
            <ImageBackground
              source={Images.RegisterBackground}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
             
              <Block flex middle >
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9} >
                        <Block flex space="between">
                          <Block flex space="between">
                          <Block  width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
             
          <Image
            source={{ uri: this.state.uri }}
            style={{ width: 200, height: 200 }}
          />
         

          <TouchableOpacity onPress={this._pickImage} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity> 
          
          <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
       
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
              this.setModalVisible(true);
            }}
        >
          <Text style={styles.textStyle}>Upload Picture</Text>
        </TouchableHighlight>
                            </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Product Name"
                                style={styles.inputs}
                                onChangeText={productName=> this.setState({productName})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                              
                            </Block>
                         
                            
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <DropDownPicker
                                items={[
                                    {label: 'Vegetable', value: 'Vegetable'},
                                    {label: 'Fruits', value: 'Fruits'},
                                    {label: 'WholeGrains', value: 'WholeGrains'},
                                ]}
                                defaultValue={this.state.category}
                                containerStyle={{height: 40}}
                               
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                placeholder="Select Product Type"
                                onChangeItem={item => this.setState({
                                    category: item.value
                                })}
                            />
                            </Block>
                           
                            {/* <Block width={width * 0.8}  style={{ marginBottom: 5 }}> */}
                            <Block width={width * 0.8} row style={{ marginBottom: 5 }}>

                              <Input
                                placeholder="Product Quantity"
                                style={styles.inputsrow}
                                onChangeText={productQuantity=> this.setState({productQuantity})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="caps-small2x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                              <DropDownPicker
                                    items={[
                                        {label: 'Kg', value: 'Kg' },
                                        {label: 'Mun', value: 'Mun'},
                                        {label: 'Acer', value: 'Acer'} 
                                    ]}
                                    style={{borderRadius:80}}
                                    defaultValue={this.state.qtType}
                                    placeholder="Select Unit"
                                    containerStyle={{height: 30, width:125,marginTop:"3%", marginLeft:'4%'}}
                                    style={{backgroundColor: '#fafafa'}}
                                    
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        qtType: item.value
                                    })}
                                />
                              </Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <DropDownPicker
                                  items={[
                                      {label: 'Harvested Crops', value: 'Harvested Crops'},
                                      {label: 'Standing Crops', value: 'Standing Crops'},
                                  ]}
                                  defaultValue={this.state.productType}
                                  placeholder="Select Crops Type"
                                  containerStyle={{height: 40}}
                                  style={{backgroundColor: '#fafafa'}}
                                  itemStyle={{
                                      justifyContent: 'flex-start'
                                  }}
                                  dropDownStyle={{backgroundColor: '#fafafa'}}
                                  onChangeItem={item => this.setState({
                                      productType: item.value
                                  })}
                              />
                            </Block>
                            <Block width={width * 0.8}  style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Product Price"
                                style={styles.inputs}
                                onChangeText={productPrice=> this.setState({productPrice})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Product Description"
                                style={styles.inputs}
                                onChangeText={description=> this.setState({description})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            
                            </Block>
                          {/* </Block> */}
                          <Block center>
                            <Button color="primary" round style={styles.createButton} onPress={this.handleSubmit}>
                              <Text
                                style={{ fontFamily: 'sans-serif-condensed' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                Add Product
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
             
            </ImageBackground>
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
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    button: {
      width: 250,
      height: 60,
      backgroundColor: '#3740ff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginBottom:12    
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
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    registerContainer: {
      marginTop: 55,
      width: width * 0.9,
      height: height < 812 ? height * 0.8 : height * 0.8,
      backgroundColor: nowTheme.COLORS.WHITE,
      borderRadius: 4,
      shadowColor: nowTheme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: 'hidden'
    },
    openButton: {
      backgroundColor: "lightblue",
      borderRadius: 20,
      marginTop:30,
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
      width:190,
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
  
  export default AddProductsFarmer;
  