import React, {useState,useEffect} from "react";
import axiosInstance from "../APIs/axiosApi";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  AsyncStorage
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");
var token=null
var cat=null

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  
    const [token, setToken] = useState('');
    const [category, setCategory] = useState('');
  
    useEffect( () => {
      async function fetchData() {
      setToken(await AsyncStorage.getItem('token')),
      setCategory(await AsyncStorage.getItem('category'))
      console.log('data login ka', token,category)
    }
  
  fetchData();});
    
  const insets = useSafeArea();
  
    const publicscreens = [        
      "Asaan Kisaan Market",
      "Settings",
      "Contact Us"
    ];
    const farmerscreens = [        
      "Asaan Kisaan Market",
      "Disease Detection",
      "Farmer Dashboard",
      "Track Order",
      "Profile",
      "Settings",
      "Contact Us"
  
    ];
    const customerscreens = [        
      "Asaan Kisaan Market",
      "Cart",
      "Wishlist",
      "Profile",
      "Track Order",
      "Settings",
      "Contact Us"
  
    ];
    const vendorscreens = [        
      "Asaan Kisaan Market",
      "Vendor Dashboard",
      "Track Order",
      "Profile",
      "Settings",
      "Contact Us"
    ];
   
   
    
    
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
          />
        </Block>
      </Block>
      
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        {
        token !== null && category === 'Farmer'
        ?
            farmerscreens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })
          :
          token !== null && category === 'Customer'
        ?
            customerscreens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })
          :
          token !== null && category === 'Vendor'
        ?
            vendorscreens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })
          :
          publicscreens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          }) 
          }
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
        </Block>
        {
        token === null && category === null 
        ?
        <DrawerCustomItem title = "LOGIN" navigation={navigation}/>
        :
        <DrawerCustomItem title = "LOGOUT" navigation={navigation} />
        }
        </ScrollView>
      </Block>
    </Block>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default CustomDrawerContent;
