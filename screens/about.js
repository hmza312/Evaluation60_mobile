import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import axiosInstance from '../APIs/axiosApi';
const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class About extends Component  {
  constructor(props){
    super(props);
    this.state={
      profile:[],
      isLoading: true
    }
  }


  
  
  render(){
   
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
                   Started {'  '} 19 Feb 2019
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
                  Major Stake holder:{' '} Agro Ltd  
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
                       $1256.789
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Last Year Turnover
                        </Text>
                    </Block>

                    <Block middle>
                      <Text
                        size={18}
                        color="white"
                        style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                      >
                       40
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Employees
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
                About US
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
                There are millions of apps providing different solutions but the applications working on the farmer betterment are less in counts. In old times farming was very difficult as farmer have to rely on the old farming techniques for crop prediction and Crop production.
                       We all know that farmers work very hard for the cultivation of their crops but unfortunately due the change in weather or natural disaster their crops destroy.
                  </Text>
            </Block>
            
          </Block>
       
      </Block>
    </Block>
</ScrollView>
  )
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

export default About;
