import React from 'react';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
// Select Templete A example
import {rateWidth, rateHeight, deviceWidth} from './Cart/device';

import * as selectors from './MainReducer/selectors';
import * as actions from './MainReducer/actions';
import axios from 'axios';
import axiosInstance from '../APIs/axiosApi';

class WriteReview extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rateValue: 0,
            name:'',
            text: '',
            productId: this.props.product.id
          };
    }
 
    backClick = () => {
        const {navigation} = this.props;
        navigation.goBack();
    };

    addReview = async () => {
      const { addReview } = this.props;
      const reviewdata = {
        reviews: this.state.productId,
        reviewerName: this.state.name,
        reviewContent: this.state.text,
        rate: this.state.rateValue,
      }
      console.log("addReview",reviewdata);
      // addReview(reviewdata);
      await axiosInstance.addProductReview(reviewdata).then(res => {
          if (res.status === 201) {
            alert("Review added");
          }
          else {
            alert("review not added! Try again.");
          }
          
        })
        .then(error => {
          console.log(error);
        })
  
    }


  render() {
    const {product} = this.props;
    const colorNotReview = '#F0F0F0';
    const colorReview = '#ebe300';
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.productNameText}>{product.productName}</Text>
                <View style={styles.rateView}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={[1, 2, 3, 4, 5]}
                    renderItem={({item: rowData}) => {
                    const {rateValue} = this.state;
                    return (
                        <TouchableOpacity
                        onPress={() => this.setState({rateValue: rowData + 1})}>
                        <AntDesign
                            name="star"
                            color={rowData < rateValue ? colorReview : colorNotReview}
                            size={45}
                            style={styles.rateIcon}
                        />
                        </TouchableOpacity>
                    );
                    }}
                    keyExtractor={(item, index) => index}
                />
                </View>
                <View style={styles.writeTextView}>
                <TextInput
                    style={styles.textReview}
                    placeholder="Your Name"
                    
                    // numberOfLines={10}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.textReview}
                    placeholder="Tell us  your experience"
                    multiline={true}
                    // numberOfLines={10}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                </View>
                {/* Button add */}
                <TouchableOpacity style={styles.buttonView} onPress={this.addReview}>
                <Text style={styles.buttonText}>{`SEND`}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginBottom: 60 * rateHeight,
  },

  form: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 32 * rateHeight,
    paddingHorizontal: 16 * rateWidth,
  },

  rateView: {
    flex: 1,
    marginTop: 50 * rateHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rateIcon: {
    flex: 1,
    marginHorizontal: 10 * rateWidth,
  },

  productNameText: {
    fontFamily: 'System',
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },

  // TextReivew Write
  writeTextView: {
    // flex: 1,
    marginTop: 50 * rateHeight,
  },

  textReview: {
    marginTop: 20 * rateHeight,
    fontFamily: 'System',
    fontSize: 18 * rateHeight,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    lineHeight: 25 * rateHeight,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: "black",
  },

  // Add bottom
  buttonView: {
    marginTop: 50 * rateHeight,
    width: 146,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#00c569',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
});


/* @todo using :any */
const mapStateToProps = (state) => ({
  product: selectors.getProduct(state),
  reviews: selectors.getReviews(state),
})

export default connect(mapStateToProps, {...actions})(WriteReview);
