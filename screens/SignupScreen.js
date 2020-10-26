import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  CheckBox
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import DropDownPicker from 'react-native-dropdown-picker';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import { Dropdown } from 'react-native-material-dropdown';

import axios from 'axios';
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class SignupScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSelected: false,
      username:"",
      password: "",
      firstname:"",
      lastname:"",
      address:"",
      contact:"",
      email:"",
      category:"",
      photo:"",
      location:'',
      color:'',
      errors:{
        email:''
      },
      backgroundColor:''
      };
      // this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.analyze = this.analyze.bind(this);
}
analyze(field,value) {
  if(strongRegex.test(value)) {
    this.setState({ backgroundColor: "Good Password" });
    this.setState({ color: "green" });
    this.setState({	[field] :value})
  } else if(mediumRegex.test(value)) {
    this.setState({ backgroundColor: "Medium Password: Easy to Guess" });
    this.setState({ color: "blue" });
    this.setState({	[field] :value})
  } 
 
  else {
    this.setState({ backgroundColor: "Week Password" });
    this.setState({ color: "red" });
    this.setState({	[field] :value})
  }
  

}
eamilhandle(field,value) {
let errors = this.state.errors;

  switch (field) {
    
    case "email":
      errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
      break;
  }

  this.setState({ errors, [field]: value });
};
    // handleChange(event) {
    //   this.setState({
    //   [event.target.name]: event.target.value
    //   });
    // }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.firstname != '') {
       
          if (this.state.lastname != '') {
            if (this.state.username != '') {
             
              if (this.state.password != '') {
                if (this.state.email != '') {
                  
                  if (this.state.contact != '') {
                    if (this.state.address != '') {
                      //Check for the Name TextInput
                   
        const username=this.state.username;
        const password=this.state.password;
        const firstname=this.state.firstname;
        const lastname=this.state.lastname;
        const address=this.state.address;
        const contact=this.state.contact;
        const email=this.state.email;
        const delivery= (this.state.isSelected ? 'yes' : 'no'); 
        const category= this.state.category;
        const location= this.state.location;
        console.log(username)
        console.log(password)
        console.log(firstname)
        console.log(lastname)
        console.log(address)
        console.log(contact)
        console.log(email)
        console.log(delivery)
        console.log(category)
        console.log(location)
    
      try {
          await axios.post(' https://f7bed2934c66.ngrok.io/api/users/',{
          username: username,
          email: email,
          password: password,
          first_name:firstname,
          last_name:lastname,
          profile:{
            Category:category,
            Contact:contact,
            Address:address,
            location:location,
            Delivery:delivery,
          }
      })
    .then(res=>{
      if(res.status === 201){
        this.props.navigation.navigate('LOGIN');
      }
      else{
        alert('Error SigningUp, Try again!');
      }
    })
        return res;
    }
    catch (error) {
        console.log(error);
        }
                    }
      else {
        alert('Please Enter Address ......')
     }
   } else {
    alert('Please Enter Conatct Number!');
   }
  }
   else {
    alert('Please Enter Email......')
 }
} else {
alert('Please Enter Password!');
}
            }
else {
  alert('Please Enter UserName......')
}
} else {
alert('Please Enter Last Name!');
}
        }
else {
  alert('Please Enter First Name!');
  }
        
      
      }
    
  render() {
    const data = [{
        value: 'Farmer',
      }, {
        value: 'Customer',
      }, {
        value: 'Vendor',
      },
      ];
    
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
              <ScrollView >
                <Block flex space="evenly">
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="First Name"
                              style={styles.inputs}
                              name="firstname" 
                             
                              onChangeText={firstname=> this.setState({firstname})}
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
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Last Name"
                              style={styles.inputs}
                              name="lastname"  
                              
                              onChangeText={lastname=> this.setState({lastname})}
                              iconContent = {
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <DropDownPicker
                                items={[
                                    {label: 'Farmer', value: 'Farmer'},
                                    {label: 'Vendor', value: 'Vendor'},
                                    {label: 'Customer', value: 'Customer'},
                                ]}
                                defaultValue={this.state.category}
                                containerStyle={{height: 40}}
                               
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                placeholder="Select Product Type"
                                onChangeItem={item => this.setState({
                                    category: item.value
                                })}
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Username"
                              style={styles.inputs}
                              name="username"
                            
                              onChangeText={username=> this.setState({username})}
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
                          </Block>
                          <Block width = {width * 0.8}>
                            <Input
                              placeholder="Email"
                              style = {styles.inputs}
                              name = "email"
                              keyboardType = 'email-address'
                              onChangeText={value => this.eamilhandle("email", value)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                            <Text style={styles.captionTextStyle} > {this.state.errors.email.length > 0 && this.state.errors.email}
                         </Text>
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              name="password"
                              placeholder = "Password"
                              secureTextEntry={true}
                            
                              onChangeText={value => this.analyze("password", value)}
                              style={styles.inputs}

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
                            <Text style={{ color: this.state.color }}>{this.state.backgroundColor }</Text>
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Contact Number"
                              style={styles.inputs}
                              name="contact"
                              keyboardType = 'phone-pad'
                              onChangeText={contact=> this.setState({contact})}
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
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Address"
                              style={styles.inputs}
                              name="address"  
                              
                              onChangeText={address=> this.setState({address})}
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
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <DropDownPicker
                                items={[
                                    {label: 'Islamabad', value: 'Islamabad'},
                                    {label: 'Lahore', value: 'Lahore'},
                                    {label: 'karachi', value: 'karachi'},
                                    {label: 'Faisalabad', value: 'Faisalabad'},
                                    {label: 'Multan', value: 'Multan'},
                                    {label: 'Attock', value: 'Attock'},
                                    {label: 'Chakwal', value: 'Chakwal'},
                                    {label: 'Gujrawala', value: 'Gujrawala'},
                                    {label: 'Gujrat', value: 'Gujrat'},
                                ]}
                                defaultValue={this.state.location}
                                containerStyle={{height: 40}}
                               
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                placeholder="Select City"
                                onChangeItem={item => this.setState({
                                    location: item.value
                                })}
                            />
                          </Block>

                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                            row
                            width={width * 0.75}
                          >
                            <CheckBox
                              value={this.state.isSelected}
                              onValueChange={isSelected => this.setState({isSelected : isSelected})}
                              style={styles.checkbox}
                            />
                            <Text style={styles.label}>Will you provide Delivery?</Text>
                          </Block>
                        </Block>
                        <Block center>
                          <Button  color="primary" round style={styles.createButton} onPress={this.handleSubmit}>
                            <Text
                              style={{ fontFamily: 'sans-serif-condensed' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              SignUp
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
                </ScrollView>
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
  checkbox: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E3E3E3',
    color :nowTheme.COLORS.PRIMARY
    
  },
  label: {
    margin: 8,
    color : nowTheme.COLORS.HEADER,
    fontFamily : 'sans-serif-condensed'
  
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

export default SignupScreen;
