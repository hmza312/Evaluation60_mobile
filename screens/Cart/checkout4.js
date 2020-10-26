import React from 'react';
import {connect} from 'react-redux';
import {Text, View, FlatList, TouchableOpacity,StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Product from './cartproduct';
import {rateHeight, rateWidth} from './device';
import * as actions from './actions';
import * as selectors from './selectors';
import CheckoutStep  from './checkstep';

class CreditForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      paymentSucces: false,
    };
  }
  backClick = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  hideDialog = () => {
    const {navigation} = this.props;
    this.setState({loading: false}, () => {
      // TODO
      // delete cartProducts local and server
      navigation.navigate('Asaan Kisaan Market');
    });
  };

  nextAction = () => {
    // TODO
    this.setState({loading: true}, () => {
      setTimeout(() => {
        this.setState({paymentSucces: true});
        alert("Payment done")
      }, 3000);
    });
  };

  backAction = () => {
    const {navigation} = this.props;
    navigation.navigate('Payment');
  };
  selectProduct = (product) => {
    // TODO
    const {navigation} = this.props;
    const {chooseProductItem} = this.props;

  chooseProductItem(product);

  navigation.navigate('Asaan Kisaan Market');
  };

  changeCard = () => {
    const {navigation} = this.props;
    navigation.navigate('Payment');
  };

  changeAddress = () => {
    const {navigation} = this.props;
    navigation.navigate('Address');
  };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, ' '));

  getAddressDetail = () => {
    const {address} = this.props;
    return `${address.First_Name}, ${address.Last_Name}, ${address.Phone}, ${address.Email}, ${address.Address}, ${address.City}, ${address.State}, ${address.Postal_code}`;
  };

  getCardNumber = () => {
    const {card} = this.props;
    if (card.values) {
      const len = card.values.number.length;
      return card.values.number.substring(len - 5, len);
    }
    return '****';
  };

   render() {
    const {navigation} = this.props
    const bottomProps = {
      isShowLeftButton: true,
      textLeftButton: 'BACK',
      textRightButton: 'PAY',
      actionLeftClick: this.backAction,
      actionRightClick: this.nextAction,
    };
    return (
      <View style={styles.container}>
        <View style={styles.productView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.props.cartProducts}
            renderItem={({item: rowData}) => {
              return (
                <Product
                  data={rowData}
                  actionClick={this.selectProduct}
                />
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
        {/* line */}
        <View style={styles.line}></View>
        {/* address seting */}
        <View style={styles.addressView}>
          <Text style={styles.addressTitle}>{`Shipping Address`}</Text>
          <View style={styles.addressContentView}>
            <View style={{flex: 6}}>
            <Text style={styles.addressText}>{this.getAddressDetail()}</Text>
            </View>

            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign name="checkcircle" color={'#00c569'} size={20} />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.changeAddress}>
            <Text style={styles.changeText}>{`Change`}</Text>
          </TouchableOpacity>
        </View>
        {/* line */}
        <View style={styles.line}></View>
        {/* Cart */}
        {this.props.deliveryCase===1?
        <View style={styles.paymentView}>
          <Text style={styles.paymentTitle}>{`Payment`}</Text>
          <View style={styles.cardView}>
            <View style={{flex: 6, flexDirection: 'row'}}>
              <View style={styles.cardIcon}>
                <FontAwesome name="credit-card" color={'white'} size={30} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{`Master Card`}</Text>
                <Text
                  style={
                    styles.cardContent
                  }>
                  {`**** **** **** ${this.getCardNumber()}`}
                </Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign name="checkcircle" color={'#00c569'} size={20} />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.changeCard}>
            <Text style={styles.changeText}>{`Change`}</Text>
          </TouchableOpacity>
        </View>
           :
           <View style={styles.paymentView}>
          <Text style={styles.paymentTitle}>{`Payment`}</Text>
             <Text>Cash On Delivery</Text>
           </View>
              }
        <CheckoutStep {...bottomProps}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 100,
    },
    productView: {
      marginTop: 10 * rateHeight,
      paddingHorizontal: 16 * rateWidth,
      flexDirection: 'column',
    },
  
    line: {
      marginTop: 20 * rateHeight,
      marginHorizontal: 16 * rateWidth,
      borderRadius: 4,
      backgroundColor: '#ffffff',
      borderStyle: 'solid',
      borderWidth: 0.5,
      borderColor: '#dddddd',
    },
  
    // address
    addressView: {
      paddingTop: 20 * rateHeight,
      paddingHorizontal: 16 * rateWidth,
      justifyContent: 'center',
    },
  
    addressTitle: {
      fontFamily: 'System',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      color: '#000000',
    },
  
    addressContentView: {
      marginTop: 20 * rateHeight,
      flexDirection: 'row',
    },
  
    addressText: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 26,
      letterSpacing: 0,
      textAlign: 'left',
      color: '#000000',
    },
  
    changeText: {
      marginTop: 20 * rateHeight,
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '500',
      fontStyle: 'normal',
      textDecorationLine: 'underline',
      lineHeight: 16,
      letterSpacing: 0,
      textAlign: 'left',
      color: '#00c569',
    },
    // payment setting
    paymentView: {
      paddingTop: 20 * rateHeight,
      paddingHorizontal: 16 * rateWidth,
      justifyContent: 'center',
    },
  
    paymentTitle: {
      fontFamily: 'System',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      color: '#000000',
    },
  
    cardView: {
      marginTop: 20 * rateHeight,
      height: 50 * rateHeight,
      flexDirection: 'row',
    },
  
    cardIcon: {
      width: 70 * rateWidth,
      height: 45 * rateHeight,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: '#00c569',
    },
  
    cardInfo: {
      paddingLeft: 16 * rateWidth,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  
    cardName: {
      fontFamily: 'System',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 14,
      letterSpacing: 0,
      textAlign: 'left',
      color: '#929292',
    },
  
    cardContent: {
      marginTop: 10 * rateHeight,
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 19,
      letterSpacing: 0,
      textAlign: 'left',
      color: '#000000',
    },
  });


const mapStateToProps = (state) => ({
  address: selectors.getAddressPayment(state),
  card: selectors.getCardPament(state),
  cartProducts: selectors.getCartProducts(state),
  deliveryCase: selectors.getDeliveryCase(state),
});
export default connect(mapStateToProps, {...actions})(CreditForm);
