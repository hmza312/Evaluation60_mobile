import React,{Component}from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    AsyncStorage,
    View,
   
    FlatList
  } from 'react-native';
import { TextInput } from 'react-native-paper';
import axiosInstance from '../APIs/axiosApi';
import { Block, Text,theme } from 'galio-framework';
import { Button, Icon } from '../components';
import { Switch } from "../components";
import { nowTheme,Images} from '../constants';
import { ScrollView } from "react-native-gesture-handler";
import Theme from "../constants/Theme";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            message:"",
            profile:[],
            isLoading:false
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
  
    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
    
        switch (item.type) {
          case "switch":
            return (
              <Block row middle space="between" style={styles.rows}>
                <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="#525F7F">{item.title}</Text>
                <Switch
                  onValueChange={() => this.toggleSwitch(item.id)}
                  value={this.state[item.id]}
                />
              </Block>
            );
          case "button":
            return (
              <Block style={styles.rows}>
                <TouchableOpacity onPress={() => navigate(item.id)}>
                  <Block row middle space="between" style={{ paddingTop: 7 }}>
                    <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="#525F7F">{item.title}</Text>
                    <Icon
                      name="angle-right"
                      family="font-awesome"
                      style={{ paddingRight: 5 }}
                    />
                  </Block>
                </TouchableOpacity>
              </Block>
            );
          default:
            break;
        }
      };
    
    render() { 
        const recommended = [
            { title: "Username,Address,Category", id: "face", type: "button" },
            
          ];
        const payment = [
           
            { title: "Language", id: "language", type: "button" },
            { title: "Notifications", id: "NotificationsSettings", type: "button" }
          ];
      
          const privacy = [
            { title: "FAQ", id: "Faq", type: "button" },
            { title: "App Rating", id: "Privacy", type: "button" },
            { title: "About Us", id: "About", type: "button" }
          ];
          if(this.state.isLoading){
            return(
              <View flex={1} center style={{backgroundColor:"white",justifyContent:"center"}}>
                <Text style={{color:"black", fontFamily:"montserrat-bold",textAlign:'center'}}>LOADING . . .</Text>
              </View>
            )
          } 
          else{
        return( 
          
            <DismissKeyboard>
                <Block flex middle>
                <ImageBackground source={require('../assets/imgs/Contact-bg.jpeg')} style={{position:"absolute", width: width,height: height}}>
                
                    <Block flex > 
                        
                        <Block style={styles.settingContainer} 
                        // style={{
                        //     marginTop:"52%",  borderBottomLeftRadius:0,
                        //     borderBottomRightRadius: 0,
                        //     borderTopRightRadius: 30,
                        //     borderTopLeftRadius: 30,
                        //     marginHorizontal:0, 
                        //     height:height ,
                        //     elevation:3,
                        //     backgroundColor:"white"}}>
                            
                    >             
                            <Block row style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 0}}>
                              <Block middle style={{ top: theme.SIZES.BASE / 3 -50,left: width * 0.1}}>
                                
                                  <Image 
                                  
                                  source={Images.ProfilePicture}
                                  style={styles.avatar} 
                                  /> 
                                  
                              </Block> 
                               <Block  style={{ position:'absolute',left: width *0.5,top:5 }}>
                                <Text  style={{color:'black',fontSize:14,fontFamily: 'montserrat-regular'}}>{this.state.profile.first_name}{' '}{this.state.profile.last_name}</Text>
                                  
                                <Text
                                  style={{
                                      fontFamily: 'montserrat-regular',
                                      textAlign: 'left'
                                  }}
                                  muted
                                  size={14}
                                  >
                                  <Icon
                                      size={16}
                                      color="#ADB5BD"
                                      name="map-pin"
                                      family="Font-Awesome"
                                      style={styles.inputIcons}
                                />
                                        Islamabad,Pakistan
                                    </Text>
                                    </Block>
                                    </Block>
                                <Block evenly style = {{ 
                                    justifyContent: "center",
                                    borderColor: 'grey',
                                    paddingVertical:"10%",
                                    marginTop:40
                                }}> 
                                 {/* <ScrollView showsVerticalScrollIndicator={false}>  */}
                                    <ScrollView
                                    showsVerticalScrollIndicator={true}
                                    contentContainerStyle={styles.settings}
                                    >

                                {/* </ScrollView> */}
                                      <FlatList
                                          data={recommended}
                                          keyExtractor={(item, index) => item.id}
                                          renderItem={this.renderItem}
                                          ListHeaderComponent={
                                            <Block center style={styles.title}>
                                              <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                                                Profile Settings
                                              </Text>
                                            </Block>
                                          }
                                        />
                                        <Block center style={styles.title}>
                                          <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                                            Account Settings
                                          </Text>
                                        
                                        </Block>

                                        <FlatList
                                          data={payment}
                                          keyExtractor={(item, index) => item.id}
                                          renderItem={this.renderItem}
                                        />

                                        <Block center style={styles.title}>
                                          <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                                            Privacy Settings
                                          </Text>
                                        
                                        </Block>
                                        <FlatList
                                          data={privacy}
                                          keyExtractor={(item, index) => item.id}
                                          renderItem={this.renderItem}
                                        />
                                    </ScrollView>
                                </Block>
                                
                                </Block>                  
                    
                    </Block>
                   
                </ImageBackground>
                </Block>
            </DismissKeyboard>
         );

                                        }
    }
}
const styles=StyleSheet.create({
    createButton: {
        width: width * 0.6,
        marginTop: 25,
        marginBottom: 40
      },
      inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
      }, 
      settings: {
        paddingVertical: theme.SIZES.BASE / 3
      },
      title: {
        paddingTop: theme.SIZES.BASE,
        paddingBottom: theme.SIZES.BASE / 2
      },
      rows: {
        height: theme.SIZES.BASE * 2,
        paddingHorizontal: theme.SIZES.BASE+4,
        marginBottom: theme.SIZES.BASE / 1
      },
      settingContainer: {
        marginTop: "60%",
        width: width,
        height: height,
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 30,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 3,
        
      },
      avatar: {
        width: thumbMeasure,
        height: thumbMeasure,
        borderRadius: 50,
        borderWidth: 0
      },
});

export default Setting;