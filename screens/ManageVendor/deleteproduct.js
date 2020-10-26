import React from "react";
import { StyleSheet, TouchableHighlight,Image,Dimensions,View, ScrollView,FlatList,TouchableOpacity} from "react-native";
import { Block, theme, Text, } from "galio-framework";
import axios from 'axios';
import styles from '../../Styles/Style';
import { Card, Button } from "../../components";
import articles from "../../constants/articles";
import { nowTheme } from '../../constants';
import axiosInstance from '../../APIs/axiosApi';
// import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

class DeleteProductVendor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      isLoading:true,
      
    }
    this.removeItem=this.removeItem.bind(this)
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
  
  // onPressProduct = item => {
  //   this.props.navigation.navigate('ProductDetail', { item });
  // };

 async removeItem(itemId) {
  axiosInstance.deleteproduct(itemId).then(res => {
    if(res.status === 204){            
      alert('Data successfully deleted');
      console.log(res);
    }                  
            })
          .then(err => {
              console.log(err)
          })
    }

  renderProducts = ({item}) => {
    return (
      <Block>
        <TouchableHighlight underlayColor = 'rgba(73,182,77,1,0.9)'>
          <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: item.productPicture }} />
            <Text 
              style={styles.title}
            >
              {item.productName}</Text>
              <TouchableOpacity opacity={0.4} underlayColor = 'rgba(73,182,77,1,0.9)' onPress={()=>this.removeItem(item.id)}>
                              <Text
                                style={{ fontFamily: 'sans-serif-condensed' }}
                                size={18}
                                fontWeight='bold'
                                border='2px'
                                color='red'
                              >
                                Delete
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
   createButton: {
      width: 0.5,
      marginTop: 25,
      marginBottom: 0
    },  
});

export default DeleteProductVendor;
