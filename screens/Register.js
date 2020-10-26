import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import axiosInstance from '../APIs/axiosApi';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import * as actions from '../screens/MainReducer/actions';

import {ConfigureStore} from '../screens/Cart/configureStore'
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const store = ConfigureStore();

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
        username:null,
        password:null,
        errors: {
          username: "",
          
          password: "",
        }
    };
    this.login=this.login.bind(this);
  }

   

  componentDidMount() {
       
    AsyncStorage.clear();
}


  async login(e) {
    e.preventDefault();
    
    if (this.state.username != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
        alert("Loading. . .")
    const credentials = {username: this.state.username, password: this.state.password};
        await axiosInstance.login(credentials).then(res => {
            if(res.status === 200){
                AsyncStorage.setItem("userInfo", JSON.stringify(res.data));
                AsyncStorage.setItem("token", JSON.stringify(res.data.token));
                AsyncStorage.setItem("userpk", JSON.stringify(res.data.user.pk));
                AsyncStorage.setItem("username", JSON.stringify(res.data.user.username));
                // console.log("Login Credentials :",await AsyncStorage.getItem('userInfo'));
                console.log("Login Credentials :",res.data);
                alert("Almost there, please wait.")
            }
            else{
                console.log("login not successful, try again!")
            }
        });
           await axiosInstance.getProfile().then(response => {
            if(response.status === 200){
              AsyncStorage.setItem("category", response.data.profile.Category);
              AsyncStorage.setItem("profilePicture", response.data.profile.photo);
              AsyncStorage.setItem("firstname", response.data.first_name);
              console.log("Category Data:",response.data.profile.Category);
              alert('Login Successful!')
              this.props.navigation.navigate('Asaan Kisaan Market');
            }
              else{
              console.log('error data');
            }
          })
           }
          else {
           alert('Please Enter Password......')
        }
      } else {
       alert('Please Enter User Name!');
      }
};

handleChange = (field, value) => {
  let errors = this.state.errors;
console.log(field)
console.log(value)
  switch (field) {
    case "username":
      errors.username = value.length < 5 ? "User Name must be 5 characters long!" : "";
      break;
   
    case "password":
      errors.password = value.length < 8 ? "Password must be 8 characters long!" : "";
      break;
    default:
      break;
  }

  this.setState({ errors, [field]: value });
};
  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Social Login
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="google"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.GOOGLE}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      Or
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="evenly">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="User Name"
                              style={styles.inputs}
                              autoCapitalize="none"
                              onChangeText={value => this.handleChange("username", value)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          <Text style={styles.captionTextStyle} > {this.state.errors.username.length > 0 && this.state.errors.username}
                           
                            </Text> 
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Password"
                              style={styles.inputs}
                              autoCapitalize="none"
                              secureTextEntry={true}
                              
                              onChangeText={value => this.handleChange("password", value)}
                             
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                            <Text style={styles.captionTextStyle} > {this.state.errors.password.length > 0 && this.state.errors.password}
                           
                           </Text>
                          </Block>
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center',
                              color:"darkblue",
                              textDecorationLine: 'underline'
                            }}
                            muted
                            size={15}
                          >
                            Forget Password?
                          </Text>
                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                            row
                            width={width * 0.75}
                          >
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.PRIMARY}
                              labelStyle={{
                                color: nowTheme.COLORS.HEADER,
                                fontFamily: 'montserrat-regular'
                              }}
                              label="I agree to the terms and conditions."
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button onPress={this.login} color="primary" round style={styles.createButton}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              LOGIN
                            </Text>
                          </Button>
                        </Block>
                        <Block center>
                          <Button 
                            onPress={()=>this.props.navigation.navigate('Signup')}
                            textStyle={{ fontFamily: 'montserrat-regular', color: nowTheme.COLORS.PRIMARY, fontSize: 14 }}
                            color="neutral"
                            style={styles.createButton}
                          >
                            CREATE NEW ACCOUNT
                          </Button>
                        </Block>
                      </Block>
                    </Block>
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

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  captionTextStyle: {
		color: "red"
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
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

const mapStateToProps = () => ({

})

export default connect(mapStateToProps,{...actions})(Register);
