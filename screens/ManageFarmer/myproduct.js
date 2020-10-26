import React from "react";
import { StyleSheet, TouchableHighlight,Image,Dimensions,View, ScrollView,FlatList} from "react-native";
import { Block, theme, Text, } from "galio-framework";
import axiosInstance from '../../APIs/axiosApi';

import { Card, Button } from "../../components";
import articles from "../../constants/articles";
import { nowTheme } from '../../constants';
import styles from '../../Styles/Style';
import * as selectors from '../MainReducer/selectors';
import * as actions from '../MainReducer/actions'
import {connect} from 'react-redux';
const { width } = Dimensions.get("screen");

class MyProduct extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      isLoading:true 
    }
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
  
  onPressProduct = item => {
    const {chooseProductItem} = this.props;

    chooseProductItem(item);

    this.props.navigation.navigate('ProductDetail');
  };


  renderProducts = ({item}) => {
    return (
      <Block>
        <TouchableHighlight underlayColor = 'rgba(73,182,77,1,0.9)' onPress={() => this.onPressProduct(item)}>
          <View style={styles.containerfar}>
            <Image style={styles.photo} source={{ uri: item.productPicture }} />
            <Text 
              style={styles.title}
            >
              {item.productName}</Text>
            <Text style={styles.category}>{item.category}</Text>
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
  }  
});

const mapStateToProps = () => ({
  
});

export default connect(mapStateToProps, {...actions})(MyProduct);
