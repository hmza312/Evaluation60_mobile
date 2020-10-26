import React from 'react';
import {connect} from 'react-redux';
import {Text, View, ToastAndroid, Image, FlatList, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
// Select Templete A example
import Icon from '../components/Icon';
import { Block } from 'galio-framework';
import axios from 'axios';
import axioInstance from '../APIs/axiosApi'
import ReadMore from 'react-native-read-more-text';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {rateWidth, rateHeight, deviceWidth, deviceHeight} from './Cart/device';
import ButtonAddCart from './buttonadd';
import * as selectors from '../screens/MainReducer/selectors';
import * as cartActions from './Cart/actions';
import * as actions from '../screens/MainReducer/actions';
import {USER_API_BASE_URL} from '../APIs/axiosApi';

class DetailScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        profile:{},
        token : "",
        category : "",
        isLoading: true
  }
}
async componentDidMount() { 
  
  await axios.get(USER_API_BASE_URL+`users/${this.props.product.user}/`).then(res=>{
  if(res.status === 200){
      this.setState({
        isLoading: false,
        profile: res.data 
      })
      console.log(this.state.profile)
    }
    else{
      console.log("data no fetch successfully");
    }
    
 })
 .then(error => {
   console.log(error);
 })
}

    backClick = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  favouriteProducts = () => {
    const {favouriteProductFromCart} = this.props;
    const {product} = this.props;
    favouriteProductFromCart(product);
   alert("added to cart")

    // TODO
    // Add to server
  };

  addProductToCartAction = () => {
  
   
    const {addProductToCart} = this.props;
    addProductToCart(this.props.product);
    alert("added to cart")
   
    // TODO
    // Add to sesion or server
  };

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.productMoreText} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.productMoreText} onPress={handlePress}>
        Show less
      </Text>
    );
  };
  _handleTextReady = () => {
    // ...
  };

  addReview = () => {
    const {navigation} = this.props;
    navigation.navigate('Review');
  };
  favouriteProducts = () => {
    const {favouriteProductFromCart} = this.props;
    const {product} = this.props;
    favouriteProductFromCart(product);
    alert('Liked this product!');

    // TODO
    // Add to server
  };
  renderReviews({item}){
    // if (item === undefined){ 
    //   return (
    //   <View>

    //   </View>
    //   )
    // }
    // else{
      return (
        <TouchableOpacity
          style={styles.container1}
          >
          
          <View style={styles.reviewContentView}>
            <View style={styles.reviewUserNameView}>
              <Text style={styles.reviewUserText}>{item.reviewerName}</Text>
              <View style={styles.reviewRateView}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={[1, 2, 3, 4, 5]}
                  renderItem={({item: rowData}) => {
                    return <AntDesign name="star" color="#ebe300" size={20} />;
                  }}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </View>

            <Text style={styles.reviewContentText}>
              {`${item.reviewContent}`}
            </Text>
          </View>
        </TouchableOpacity>
      ) 
    
    };

  render() {
    alert(this.props.product)
    let RatingStars = []
    for(var i = 0; i < this.props.product.rating; i++) {
        RatingStars.push(<AntDesign name="star" color="#ebe300" size={20} />)
    }
      console.log("detailProducts",this.props.product);
      console.log(this.props.product.productPicture)
      return (
          <View style={styles.main}>
            <ScrollView style={styles.container}>
                <View style={styles.imageView}>
                    <Image source={{uri:this.props.product.productPicture}} style={styles.productImage} />
                    {/* <Image source={image} style={styles.productImage} /> */}
                </View>
                <View style={styles.productInforView}>
                    <Text style={styles.productNameText}>{this.props.product.productName}</Text>

                    <View style={styles.productSizeColor}>
                   <View style={styles.productSize}>
                        <Text style={styles.productSizeText}>{`Quantity`}</Text>
                        <Text style={styles.productSizeValueText}>{this.props.product.productQuantity}</Text>
                    </View>
                    <View style={styles.blankView} />
                    <View style={styles.productColor}>
                   
                    
                    <Text className="rating">
              {RatingStars}
               </Text>


                    </View>
                    </View>

                    <View style={styles.productDetailView}>
                    <Text style={styles.productDetailText}>{`Product Owner Details`}</Text>
                    {/* <Text style={styles.productDetailInfoText}>{data.product_info}</Text> */}
                    {/* <Text style={styles.productMoreText}>{`Read More`}</Text> */}
                    {
                    this.state.isLoading
                    ?
                        <View flex={1} center style={{backgroundColor:"white",justifyContent:"center"}}>
                          <Text style={{color:"black", fontFamily:"montserrat-bold",textAlign:'center'}}>LOADING . . .</Text>
                        </View>
                      
                    :
                    
                    <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                        <Text style={styles.productDetailInfoText}>
                        Full Name:{'  '}  {this.state.profile.first_name}{' '}{this.state.profile.last_name}{'\n'}
                        </Text>
                        <Text style={styles.productDetailInfoText}>
                        User Name:{'  '}  {this.state.profile.username}{'\n'}
                        </Text>
                       
                        <Text  style={styles.productDetailInfoText}>
                            Contact Number:  {this.state.profile.profile.Contact}{'\n'}
                        </Text>

                        
                        <Text style={styles.productDetailInfoText}>
                        City:{' '}  {this.state.profile.profile.location}
                        </Text>
                    </ReadMore>
                    }
                    </View>
                
                    <View style={styles.productDetailView}>
                    <Text style={styles.productDetailText}>{`Detail`}</Text>
                    {/* <Text style={styles.productDetailInfoText}>{data.product_info}</Text> */}
                    {/* <Text style={styles.productMoreText}>{`Read More`}</Text> */}

                    <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                        onReady={this._handleTextReady}>
                        <Text style={styles.productDetailInfoText}>
                        {this.props.product.description}
                        </Text>
                    </ReadMore>
                    </View>
                </View>
                <View style={styles.reviewView}>
                    <Text style={styles.reviewTittleText}>{`Reviews`}</Text>
                    <TouchableOpacity 
                      onPress={this.addReview}
                    >
                    <Text style={styles.reviewWriteText}>{`Write your review`}</Text>
                    </TouchableOpacity>

                    <View style={styles.reviewListView}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.props.product.review}
                        renderItem={this.renderReviews} 
                        keyExtractor={(item, index) => index}
                    />
                    </View>
                </View>
                </ScrollView>
                
                  <ButtonAddCart
                      data={this.props.product}
                      actionClick={this.addProductToCartAction}
                      token={this.state.token}
                      category={this.state.category}
                  />
                </View>
      
    );
      }
  }



const styles = StyleSheet.create({
  main:{
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: "white"
  },
  container: {
    flex: 0.9,
    backgroundColor: '#fff',
    flexDirection: 'column',
    
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: deviceWidth,
    height: 477 * rateHeight,
  },

  productImage: {
    width: deviceWidth,
    height: 477 * rateHeight,
    resizeMode: 'stretch',
  },

  // Product infor

  productInforView: {
    flex: 1,
    paddingHorizontal: 16 * rateWidth,
  },

  productNameText: {
    marginTop: 20 * rateHeight,
    fontFamily: 'System',
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },

  // product size color

  productSizeColor: {
    marginTop: 30 * rateHeight,
    flexDirection: 'row',
  },
  productSize: {
    flex: 1,
    paddingHorizontal: 20 * rateWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 160 * rateWidth,
    height: 40 * rateHeight,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ebebeb',
    flexDirection: 'row',
  },
  blankView: {
    width: 23 * rateWidth,
  },
  productColor: {
    flex: 1,
    paddingHorizontal: 20 * rateWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 160 * rateWidth,
    height: 40 * rateHeight,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ebebeb',
    flexDirection: 'row',
  },

  productSizeText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },
  productSizeValueText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: "black",
  },

  productColorView: {
    width: 22 * rateWidth,
    height: 22 * rateWidth,
    borderRadius: 8,
    backgroundColor: '#33427d',
  },

  // product info
  productDetailView: {
    flex: 1,
    marginTop: 40 * rateHeight,
  },
  avatarImage: {
    width: 50 * rateWidth,
    height: 50 * rateWidth,
    borderRadius: 50 * rateHeight,
  },
  productDetailText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },

  productDetailInfoText: {
    marginTop: 20 * rateHeight,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },

  productMoreText: {
    marginTop: 10 * rateHeight,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#00c569',
  },
  reviewContentView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  reviewUserNameView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  reviewRateView: {
    flex: 1,
    alignItems: 'flex-end',
  },

  reviewUserText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },

  reviewContentText: {
    marginTop: 5,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color:"black",
  },
  
  // review product
  reviewView: {
    flex: 1,
    marginTop: 40 * rateHeight,
    paddingHorizontal: 16 * rateWidth,
  },

  reviewTittleText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: 'black'
  },
  // review product
  reviewView: {
    flex: 1,
    marginTop: 40 * rateHeight,
    paddingHorizontal: 16 * rateWidth,
  },

  reviewTittleText: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },
  reviewWriteText: {
    marginTop: 10,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#00c569',
  },

  reviewListView: {
    marginTop: 20 * rateHeight,
  },
  reviewWriteText: {
    marginTop: 10,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#00c569',
  },

  reviewListView: {
    marginTop: 20 * rateHeight,
  },
});


/* @todo using :any */
const mapStateToProps = (state) => ({
  product: selectors.getProduct(state),
  // reviews:selectors.getReviews(state)
});

export default connect(mapStateToProps, {...cartActions})(DetailScreen);
