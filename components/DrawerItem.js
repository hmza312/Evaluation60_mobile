import React from "react";
import { StyleSheet, TouchableOpacity, AsyncStorage, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import nowTheme from "../constants/Theme";
import axiosInstance from '../APIs/axiosApi';
class DrawerItem extends React.Component {

  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Asaan Kisaan Market":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Vendor Dashboard":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Disease Detection":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Farmer Dashboard":
        return (
          <Icon
            name="app2x"
            family="NowExtra"

            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Track Order":
        return (
          <Icon
            name="truck"
            family="Font-Awesome"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Cart":
        return (
          <Icon
            name="basket2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Wishlist":
        return (
          <Icon
            name="basket2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Profile":
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "LOGIN":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Contact Us":
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );

      // case "Components":
      //   return (
      //     <Icon
      //       name="atom2x"
      //       family="NowExtra"
      //       size={18}
      //       color={focused ? nowTheme.COLORS.PRIMARY : "white"}
      //       style={{ opacity: 0.5 }}
      //     />
      //   );

      // case "Articles":
      //   return (
      //     <Icon
      //       name="paper"
      //       family="NowExtra"
      //       size={18}
      //       color={focused ? nowTheme.COLORS.PRIMARY : "white"}
      //       style={{ opacity: 0.5 }}
      //     />
      //   );


      // case "Examples":
      //   return (
      //     <Icon
      //       name="album"
      //       family="NowExtra"
      //       size={14}
      //       color={focused ? nowTheme.COLORS.PRIMARY : "white"}
      //     />
      //   );

      case "GETTING STARTED":
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "LOGOUT":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={async () =>
          title == "LOGIN" ? navigation.navigate('LOGIN')
            : title == 'LOGOUT' ?
              await axiosInstance.logOut().then((response) => {
                if (response.status === 200) {
                  AsyncStorage.clear();
                  AsyncStorage.removeItem("token");
                  AsyncStorage.removeItem("category");
                  AsyncStorage.removeItem("userpk");
                  AsyncStorage.removeItem("username");
                  AsyncStorage.removeItem("profilePicture");
                  AsyncStorage.removeItem("firstname");
                  // console.log("Category: ",await AsyncStorage.getItem("category"));
                  // console.log("token: ",await AsyncStorage.getItem("token"));
                  console.log(response.status);
                  navigation.navigate('Onboarding')
                }
                else (e) => {
                  console.log("Logout Error ", e);
                }
              })
              :
              navigation.navigate(title)
        }>
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                textTransform: "uppercase",
                fontWeight: "300"
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white"
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: "white"
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
