import React from "react";
import { StyleSheet, TouchableHighlight,Image,Dimensions,View, TouchableOpacity,FlatList,Modal,Alert} from "react-native";
import { } from "galio-framework";
import axios from 'axios';
import styles from '../../Styles/Style';
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
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

class UpdateProduct extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      isLoading:true,
      obj:{},
      modalVisible:false,
      modalVisibleimage:false,
      type:"",
      uri:null,
      filename:"",
      productName:"",
            category:"",
            productPicture: "",
            productQuantity:"",
            qtType:"",
            productType:"",
            id:'',
            productPrice:"",
            description:"" 
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
   async handleSubmit(id,item){
      console.log(id)
      console.log(this.state.productName)
  console.log(this.state.category)
  console.log(this.state.productQuantity)
  console.log(this.state.qtType)
  console.log(this.state.productType)
  console.log(this.state.productPrice)
  console.log("hazma",item.productName)
  console.log("hazma",item.category)
  console.log("hazma",item.productQuantity)
  console.log("hazma",item.productUnit)
  console.log("hazma",item.prodyctType)
  console.log("hazma",item.productPrice)
  console.log("hazma",item.productPicture)
  console.log("hazma",item.description)

  console.log(this.state.description)
 
 
      var quantity= this.state.productQuantity+" "+this.state.qtType;
        
      const uploadData = new FormData();
          uploadData.append('user',await axiosInstance.getUserpk())
          if(this.state.productName!=""){
          uploadData.append('productName',this.state.productName)}
          else{
              uploadData.append('productName',item.productName)
          }
          if(this.state.category!="")
{            uploadData.append('category',this.state.category)}
else{
  uploadData.append('category',item.category) 
}if(this.state.uri!=null){
        uploadData.append('productPicture',{uri:this.state.uri, name:this.state.filename,type:this.state.type })
      }
          else{
              uploadData.append('productPicture',item.productPicture)
          }
         if(this.state.productQuantity!=""){
          uploadData.append('productQuantity', this.state.productQuantity)
         } 
         else{
          uploadData.append('productQuantity', item.productQuantity)
         }
         if(this.state.qtType!=""){
          uploadData.append('productUnit', this.state.qtType)
         } 
         else{
          uploadData.append('productUnit', item.productUnit)
         }
         if(this.state.productType!=""){
          uploadData.append('prodyctType', this.state.productType)
         }
         else{
          uploadData.append('prodyctType',item.prodyctType)
         }
         if(this.state.productPrice!=""){
          uploadData.append('productPrice', this.state.productPrice)
         }
         else{
          uploadData.append('productPrice', item.productPrice)
         }
          if(this.state.description!=""){
              uploadData.append('description', this.state.description)
          }
          else{
              uploadData.append('description', item.description)
          }
         
      console.log(uploadData)
      
      axiosInstance.updateproduct(id,uploadData)
      .then(res =>{
        if(res.status === 200){ 
          alert('Data successfully updated');
          console.log(res)
        }
       })
      .catch(error=> console.error(error));
           
  }
  
  
  setModalVisible = (visible,itrm) => {
    this.setState({ modalVisible: visible });
    this.setState({ obj: itrm });
    this.setState({ id: itrm.id });
    
  }
  setModalVisibleiamge = (visible) => {
  
    this.setState({ modalVisibleimage: visible });
  }
  async componentDidMount() {
    
    await axiosInstance.getUserProducts().then(res=>{
      if(res.status === 200){
        this.setState({
          isLoading: false,
          products: res.data 
        })
        console.log(this.state.products)
      }
      else{
        console.log("data no fetch successfully");
      }
   })
   .then(error => {
     console.log(error);
   })
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
        let localUri = result.uri;
  let filename = localUri.split('/').pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  this.setState({ uri:localUri});
   this.setState({ filename: filename});
   this.setState({type:type})}
  
      console.log(result.uri);
    } catch (E) {
      console.log(E);
    }
  };
  
  onPressProduct = item => {
    this.props.navigation.navigate('ProductDetail', { item });
  };


  renderProducts = ({item}) => {
    console.log(item.id)
    return (
      <Block>
      
        
      <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
        <View style={styless.centeredView}>
              <View style={styless.modalView}>
             
                                                  <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisibleimage}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={styless.centeredView}>
              <View style={styless.modalView}>
             
          <Image
            source={{ uri: this.state.uri }}
            style={{ width: 200, height: 200 }}
          />
         
          <TouchableOpacity onPress={this._pickImage} style={styless.button}  >
              <Text style={styless.buttonText}>Select File</Text>
          </TouchableOpacity> 
          
          <TouchableHighlight
                style={{ ...styless.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisibleiamge(!this.state.modalVisibleimage);
                }}
              >
                <Text style={styless.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
     
            </View>
          </View>
        </Modal> 
         <TouchableHighlight
          style={styless.openButton}
          onPress={() => {
              this.setModalVisibleiamge(true);
            }}
        >
          <Text style={styless.textStyle}>Upload Picture</Text>
        </TouchableHighlight>
                            
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                              <Input
                                placeholder="Product Name"
                                style={styless.inputs}
                                onChangeText={productName=> this.setState({productName})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styless.inputIcons}
                                  />
                                }
                              />
                              
                            
                         
                            
                           
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
                            
                            <Block width={width * 0.8} row style={{ marginBottom: 5 }}>

                            
                              <Input
                                placeholder="Product Quantity"
                                style={styless.inputsrow}
                                onChangeText={productQuantity=> this.setState({productQuantity})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="caps-small2x"
                                    family="NowExtra"
                                    style={styless.inputIcons}
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
                                    containerStyle={{height: 30, width:125,marginTop:"3%", marginLeft:'2%'}}
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
                          
                              <Input
                                placeholder="Product Price"
                                style={styless.inputs}
                                onChangeText={productPrice=> this.setState({productPrice})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styless.inputIcons}
                                  />
                                }
                              />
                          
                              <Input
                                placeholder="Product Description"
                                style={styless.inputs}
                                onChangeText={description=> this.setState({description})}
                             
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styless.inputIcons}
                                  />
                                }
                              />
                            
                          <Block center>
                            <Button color="primary" round style={styless.createButton} onPress={()=>this.handleSubmit(this.state.id,this.state.obj)}>
                              <Text
                                style={{ fontFamily: 'sans-serif-condensed' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                Update Product
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                     
                      
          <TouchableHighlight
                style={{ ...styless.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible,{});
                }}
              >
                <Text style={styless.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
       
          </View>
          </View>
        </Modal>
       
        <TouchableHighlight underlayColor = 'rgba(73,182,77,1,0.9)' >
          <View style={styles.containerfar}>
            <Image style={styles.photo} source={{ uri: item.productPicture }} />
            <Text 
              style={styles.title}
            >
              {item.productName}</Text>
              <TouchableOpacity opacity={0.4} underlayColor = 'rgba(73,182,77,1,0.9)' onPress={() => {
                  this.setModalVisible(true,item);
                }}
              >
                              <Text
                                style={{ fontFamily: 'sans-serif-condensed' }}
                                size={18}
                                fontWeight='bold'
                                border='2px'
                                color='green'
                              >
                                Update
                              </Text>
                              </TouchableOpacity>
                            
          </View>
          
        </TouchableHighlight>  
        </Block>
        
                
      
    );
  };

  render() {
    if(this.state.isLoading) 
      return(
        <View flex={1} center style={{backgroundColor:"white",justifyContent:"center"}}>
        <Text style={{color:"black", fontFamily:"montserrat-bold",textAlign:'center'}}>LOADING . . .</Text>
      </View>
    )
    else{
      return (
        <View >
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.products}
            renderItem={this.renderProducts}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      );
    }
  }
}

const styless = StyleSheet.create({
  shadows:{
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
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
    width:'100%',
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

export default UpdateProduct;
