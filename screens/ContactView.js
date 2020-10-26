import React,{Component}from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage
  } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Block, Text } from 'galio-framework';

import { Button, Icon } from '../components';
import { nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            message:""
        }
    }

    render() { 
        return( 
            <DismissKeyboard>
                <Block flex middle>
                <ImageBackground source={require('../assets/imgs/Contact-bg.jpeg')}  style={{width:"100%",height:"100%"}}>
                    <Block flex >
                        <Block center>
                        <Text   style={{color:'white',marginTop:'30%',fontSize:36}}> Get in touch!</Text>
                        <Text   style={{color:'white',fontSize:16,paddingLeft:"3%",fontFamily: 'montserrat-regular'}}>GoodFood ends in good talk.</Text>
                        </Block>            
                        <Block style={{
                            marginTop:"10%",  
                            borderBottomLeftRadius:0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            marginHorizontal:"2%", 
                            height:'100%',
                            backgroundColor:"white"}}>
                                <Block evenly style={{ 
                                    justifyContent: "center",
                                    borderColor: 'grey',
                                    paddingHorizontal:"10%",
                                    paddingVertical:"10%"
                                }}>
                                    <TextInput
                                        
                                        style={{backgroundColor:"transparent"}}
                                        label="Your Name"

                                        // onChangeText={event => this.setState({name:event.target.value})}
                                    />
                                    <TextInput
                                        style={{marginTop:"5%",backgroundColor:"transparent"}}
                                        label="Your Email"
                                        
                                        // onChangeText={event => this.setState({email:event.target.value})}
                                    />
                                    <TextInput
                                        style={{marginTop:"5%",backgroundColor:"transparent"}}
                                        label="Your Message"
                                        multiline={true}
                                        numberOfLines={4}
                                        // onChangeText={event => this.setState({message:event.target.value})}
                                    />
                                    <Block center>
                                        <Button onPress={this.login} color="purple" round style={styles.createButton}>
                                            <Text
                                                style={{ fontFamily: 'montserrat-bold' }}
                                                size={14}
                                                color={nowTheme.COLORS.WHITE}
                                            >
                                                SEND MESSAGE
                                            </Text>
                                        </Button>
                                        <Text  style={{color:'black',fontSize:14,fontFamily: 'montserrat-regular'}}> We'll get back to you soon.</Text>
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
const styles=StyleSheet.create({
    createButton: {
        width: width * 0.6,
        marginTop: 25,
        marginBottom: 40
      },
     
});

export default Contact;