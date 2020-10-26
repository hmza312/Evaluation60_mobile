import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import {connect} from 'react-redux';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import axiosInstance from '../APIs/axiosApi';
import * as selectors from '../screens/MainReducer/selectors';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends Component  {
  constructor(props){
    super(props);
    this.state={
      profile:[],
      isLoading: true
    }
  }


async componentDidMount() {
  await axiosInstance.getProfile().then((res)=>{
      if(res.status === 200){
        this.setState({
            profile:res.data,
            isLoading: false
        })
        console.log(this.state.profile);
        console.log(this.state.profile.profile.photo)
      }

      else{
        alert("Something went wrong, Try again");
      }
      });
  }



  render(){
    if(this.state.isLoading){
      return(
        <Block flex={1} center style={{backgroundColor:"white",justifyContent:"center"}}>
          <Text style={{color:"black", fontFamily:"montserrat-bold"}}>LOADING . . .</Text>
        </Block>
      )
    }
    else{

    return (

    <ScrollView showsVerticalScrollIndicator={false}>
    <Block style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <Block flex={0.6} >
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >


          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
            {/* <Block
              middle
              row
              style={{ position: 'absolute', width: width, top: height * 0.6 - 22, zIndex: 99 }}
            > */}
              {/* <Block middle style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }}> */}
                <Block middle style={{ top: height * 0.15 }}>
                  <Image source={{uri:this.state.profile.profile.photo}} style={styles.avatar} />
                </Block>

            {/* </Block> */}

              <Block style={{ top: height * 0.2 }}>
                <Block middle >
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26
                    }}
                    color='#ffffff'
                    >
                    {this.state.profile.first_name}{' '}{this.state.profile.last_name}
                  </Text>

                  <Text
                    size={16}
                    color="white"
                    style={{
                      marginTop: 5,
                      fontFamily: 'montserrat-bold',
                      lineHeight: 20,
                      fontWeight: 'bold',
                      fontSize: 18,
                      opacity: .8
                    }}
                  >
                  username:{' '}{this.state.profile.username}
                  </Text>
                </Block>
                <Block style={styles.info}>
                  <Block row space="around">

                  <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                      >
                        {this.state.profile.profile.Category}
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Category
                        </Text>
                    </Block>

                    <Block middle>
                      <Text
                        size={18}
                        color="white"
                        style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                      >
                        {this.state.profile.profile.Contact}
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Contact
                      </Text>
                    </Block>


                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                      >
                        {this.state.profile.profile.Delivery}
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Delivery
                      </Text>
                    </Block>

                  </Block>
                </Block>
              </Block>

            </Block>


          </Block>

        </ImageBackground>


      </Block>
      <Block flex={0.6} style={{ padding: theme.SIZES.BASE, }}>

          <Block flex >
            <Block middle>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                   marginTop: 15,
                   marginBottom: 30,
                  zIndex: 2
                }}
              >
                About me
                  </Text>
              <Text
                size={16}
                muted
                style={{
                  textAlign: 'center',
                  fontFamily: 'montserrat-regular',
                  zIndex: 2,
                  lineHeight: 25,
                  color: '#9A9A9A',
                  paddingHorizontal: 15
                }}
              >
                A {this.state.profile.profile.Category} of considerable range, named {this.state.profile.first_name}{' '}{this.state.profile.last_name} — the name has taken by {this.state.profile.profile.Address} has raised,
                Pakistan-based Quaid — writes his contact for further info at {this.state.profile.email}, performs and records all of his own products.
                  </Text>
            </Block>

          </Block>

      </Block>
    </Block>
</ScrollView>
  )
}
}
}
const styles = StyleSheet.create({

  profileContainer: {
    width,
    height:550,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
    height: height * 0.6
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  }
});
const mapStateToProps = (state) => ({
profile : selectors.getProfile(state)
})

export default connect(mapStateToProps,{})(Profile);


