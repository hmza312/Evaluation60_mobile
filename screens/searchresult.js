import React from "react";
import {connect} from 'react-redux';
import { StyleSheet, TouchableHighlight,Image,Dimensions,View, ScrollView,FlatList} from "react-native";
import { Block, theme, Text, } from "galio-framework";
import axios from 'axios';
import styles from '../Styles/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card, Button } from "../components";
import articles from "../constants/articles";
import { nowTheme } from '../constants';

import * as selectors from './MainReducer/selectors';
import * as actions from './MainReducer/actions'; 

const { width } = Dimensions.get("screen");

class SerachResult extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      isLoading:true
    }
  }

async componentDidMount() {    
   
        this.setState({
          isLoading: false,
          products: this.props.naviagtion.getParam(data,null)
        })
        console.log(this.state.products)
    }
  onPressProduct = item => {
    const {chooseProductItem} = this.props;

    chooseProductItem(item);

    this.props.navigation.navigate('ProductDetail');
  };


  renderProducts = ({item}) => {
    let RatingStars = []
       for(var i = 0; i < item.rating; i++) {
           RatingStars.push(<AntDesign name="star" color="#ebe300" size={20} />)
       }
   return (
     <Block>
       <TouchableHighlight underlayColor = 'rgba(73,182,77,1,0.9)' onPress={() => this.onPressProduct(item)}>
         <View style={styles.container}>
           <Image style={styles.photo} source={{ uri: item.productPicture }} />
           <Text 
             style={styles.title}
           >
             {item.productName}
             </Text>
             <Text className="rating">
             {RatingStars}
              </Text>  
                
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
            data={ this.state.product}
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


const mapStateToProps = (state) => ({
    product: selectors.getProduct(state),
  });
  
  export default connect(mapStateToProps, {...actions})(SerachResult);



