import React,{useState,useEffect} from 'react';

import { Block } from "galio-framework";
import { Easing, Animated, Dimensions,AsyncStorage } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import Home from '../screens/Home';
import TopRated from '../screens/toprated';
import SerachResult from '../screens/searchresult';
// import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Components from '../screens/Components';
// import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import Favourite from '../screens/Cart/favourite'
//Dashboard Farmer
import DashBoard from '../screens/ManageFarmer/dashboard';
import MyProduct from '../screens/ManageFarmer/myproduct';
import DeleteProduct from '../screens/ManageFarmer/deleteproduct';
import UpdateProduct from '../screens/ManageFarmer/updateproduct';
import AddProductsFarmer from '../screens/ManageFarmer/Addproduct';
//Dashboard Vendor
import VendorDashBoard from '../screens/ManageVendor/dashboard';
import MyProductVendor from '../screens/ManageVendor/myproduct';
import DeleteProductVendor from '../screens/ManageVendor/deleteproduct';
import UpdateProductVendor from '../screens/ManageVendor/updateproduct';
import AddProductsVendor from '../screens/ManageVendor/Addproductvendor';
//Cart Screen starts here//
import SwipeValueBasedUi from '../screens/Cart/productlist'
import Form from '../screens/Cart/checkout1';
import Address from '../screens/Cart/checkout2';
import PaymentForm from '../screens/Cart/checkout3';
import CreditForm from '../screens/Cart/checkout4';
//Cart screen ends here//

// import Settings from '../screens/Settings';
import Setting from '../screens/setting';
import FAQ from '../screens/faq';
import About from '../screens/about';
import Category from '../screens/Category';
import TrackOrder from '../screens/Orders/trackorder'
import OrderProcess from '../screens/Orders/orderprocess'
// import DetailView from '../screens/detailView';
import DetailScreen from '../screens/detailScreen';
import ProductsListScreen from '../screens/ProductsList/ProductsListScreen'
import SignupScreen from '../screens/SignupScreen'
import Contact from '../screens/ContactView';
import WriteReview from '../screens/WriteReviewScreen';
// drawer
import CustomDrawerContent from "./Menu";
import Disease_Detection from '../screens/ManageFarmer/disease_detection'
// import CropPrediction from '../screens/ManageFarmer/crop_prediction'
// import SoilDectection from '../screens/ManageFarmer/soildectection'
// header for screens
import { Header, Icon} from '../components';
import { nowTheme, tabs } from "../constants";


const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen name="Components" component={Components} options={{
        header:({ navigation, scene }) => (<Header title="Components" navigation={navigation} scene={scene} />),
        backgroundColor: "#FFFFFF"
      }}/>
    </Stack.Navigator>
  );
}

function CartStack(props) {
  return (
    <Stack.Navigator initialRouteName="Cart" mode="card" headerMode="screen">
      <Stack.Screen name="Cart" component={SwipeValueBasedUi} options={{
        header:({ navigation, scene }) => (<Header title="Cart" navigation={navigation} scene={scene} />),
        cardStyle: { backgroundColor: "#FFFFFF" },
      }}/>
       <Stack.Screen
        name="Checkout"
        component={Form}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              
              back
              black 
              title="Checkout"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: false,
          backgroundColor: "#FFFFFF"
        }}
      />
 <Stack.Screen
        name="Address"
        component={Address}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              
              back
              black 
              title="Checkout"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: false,
          backgroundColor: "#FFFFFF"
        }}
      />
    <Stack.Screen
        name="Payment"
        component={PaymentForm}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              
              back
              black 
              title="Checkout"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false,
        }}
      /> 
      <Stack.Screen
      name="Maincheckout"
      component = {CreditForm}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            
            back
            black 
            title="Checkout"
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: false,
      }}
    />
    </Stack.Navigator>
  );
}
function TrackStack(props) {
  return (
    <Stack.Navigator initialRouteName="Track Order" mode="card" headerMode="screen">

<Stack.Screen
      name="Track Order"
      component={TrackOrder}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            transparent
            
            black
            title="Track Order"
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: false
      }
    }
    />
    <Stack.Screen
      name="Track Details"
      component={OrderProcess}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            transparent
            back
            black
            title="Track Details"
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: false
      }
    }
    />
     </Stack.Navigator>
  );
}
function SettingsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Settings" mode="card" headerMode="screen">
    <Stack.Screen
      name="Settings"
      component={Setting}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            transparent
            white
            title="SETTINGS"
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: true
      }
    }
    />
    
  <Stack.Screen
      name="Faq"
      component={FAQ}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            transparent
            black
            back
            title="FAQ"
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: true
      }
    }
    />
  <Stack.Screen
      name="About"
      component={About}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            transparent
            white
            back
            title="About Us"
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: true
      }
    }
    />
    </Stack.Navigator>
  );
}

// function ArticlesStack(props) {
//   return (
//     <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
//       <Stack.Screen name="Articles" component={Articles} options={{
//         header: ({ navigation, scene }) => (<Header title="Articles" navigation={navigation} scene={scene} />),
//         backgroundColor: '#FFFFFF'
//       }} />
//     </Stack.Navigator>
//   );
// }

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="LOGIN" mode="card" headerMode="screen">
      <Stack.Screen
        name="LOGIN"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              transparent
              title="Login Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              transparent
              back
              title="Create Account"
              navigation={navigation}
              scene={scene}
            />
          ),
      
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
// function CropStack(props) {
//   return (
//     <Stack.Navigator initialRouteName="Soil Detection" mode="card" headerMode="screen">
//       <Stack.Screen
//         name="Soil Detection"
//         component={SoilDectection}
//         options={{
//           header: ({ navigation, scene }) => (
//             <Header 
//               black
              
//               title="Soil Detection"
//               navigation={navigation}
//               scene={scene}
//             />
//           ),
//           cardStyle: { backgroundColor: "#FFFFFF" },
//           headerTransparent: false
//         }}
//       />
//       <Stack.Screen
//         name="Crop Prediction"
//         component={CropPrediction}
//         options={{
//           header: ({ navigation, scene }) => (
//             <Header 
//               black
//               title="Crop Prediction"
//               navigation={navigation}
//               scene={scene}
//             />
//           ),
//           cardStyle: { backgroundColor: "#FFFFFF" },
//           headerTransparent: false
//         }}
//       />
      
//     </Stack.Navigator>
//   );
// }

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Asaan Kisaan Market"
        component={Home }
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Asaan Kisaan Market"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Asaan Kisaan Market"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="TopRated"
        component={TopRated }
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Asaan Kisaan Market"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Search"
        component={SerachResult }
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Asaan Kisaan Market"
             
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={DetailScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="ProductDetail"
              titleColor ='transparent'
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
         
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              title="ProductsList"
              back
              black
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
      <Stack.Screen
        name="Review"
        component={WriteReview}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              title="Write Review"
              back
              black
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: false
        }}
      />
    </Stack.Navigator>
  );
}

function ContactStack(props) {
  return (
    <Stack.Navigator initialRouteName="Contact Us" mode="card" headerMode="screen">
      <Stack.Screen
        name="Contact Us"
        component={Contact}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="CONTACT US"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }
      }
      />
      
    </Stack.Navigator>
  );
}

function WistlistStack(props) {
  return (
    <Stack.Navigator initialRouteName="Wishlist" mode="card" headerMode="screen">
     <Stack.Screen name="Wishlist" component={Favourite} options={{
        header:({ navigation, scene }) => (<Header title="Wishlist" navigation={navigation} scene={scene} />),
        backgroundColor: "#FFFFFF"
      }}/>  
    </Stack.Navigator>
  );
}

function DiseaseStack(props) {
  return (
    <Stack.Navigator initialRouteName="Disease Detection" mode="card" headerMode="screen">
     <Stack.Screen
        name="Disease Detection"
        component={Disease_Detection}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              black
              
              title="Crop Disease Detection"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      /> 
    </Stack.Navigator>
  );
}

function FarmerStack(props) {
  return (
    <Stack.Navigator initialRouteName="Farmer Dashboard" mode="card" headerMode="screen">
      <Stack.Screen name="Farmer Dashboard" component={DashBoard} options={{
        header:({ navigation, scene }) => (<Header title="Farmer Dashboard" navigation={navigation} scene={scene} />),
        backgroundColor: "#FFFFFF"
      }}/>
       <Stack.Screen
        name="Add Product"
        component={AddProductsFarmer}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              transparent
              back
              title="Add Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />

       <Stack.Screen
        name="My Product"
        component={MyProduct}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              black
              back
              title="My Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
      <Stack.Screen
        name="Update Product"
        component={UpdateProduct}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              back
              title="Update Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
    <Stack.Screen
        name="Delete Product"
        component={DeleteProduct}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              back
              title="Delete Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
    </Stack.Navigator>
  );
}

function VendorStack(props) {
  return (
    <Stack.Navigator initialRouteName="Vendor Dashboard" mode="card" headerMode="screen">
      <Stack.Screen name="Vendor Dashboard" component={VendorDashBoard} options={{
        header:({ navigation, scene }) => (<Header title="Vendor Dashboard" navigation={navigation} scene={scene} />),
        backgroundColor: "#FFFFFF"
      }}/>
       <Stack.Screen
        name="Add Product"
        component={AddProductsVendor}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              back
              title="Add Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
       <Stack.Screen
        name="My Product"
        component={MyProductVendor}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              back
              title="My Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
      <Stack.Screen
        name="Update Product"
        component={UpdateProductVendor}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
            back
              title="Update Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }}
      />
     <Stack.Screen
        name="Delete Product"
        component={DeleteProductVendor}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              black
              title="Delete Product"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false
        }
      }
      />
    </Stack.Navigator>
  );
}


function AppStack(props) {
  
  const [token, setToken] = useState('');
    const [category, setCategory] = useState('');
  
    useEffect( () => {
      async function fetchData() {
      setToken(await AsyncStorage.getItem('token')),
      setCategory(await AsyncStorage.getItem('category'))
      console.log('data login ka', token,category)
    }
  
  fetchData();});
  
  
  return (

    token !== null && category === 'Farmer'
    ?
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.TUMBLR,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Asaan Kisaan Market"
    > 
      <Drawer.Screen name="Asaan Kisaan Market" component={HomeStack} />
      {/* <Drawer.Screen name="Crop Prediction" component={CropStack} /> */}
      <Drawer.Screen name="Disease Detection" component={DiseaseStack}/>
      <Drawer.Screen name="Farmer Dashboard" component={FarmerStack}/>
      <Drawer.Screen name="Track Order" component={TrackStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Contact Us" component={ContactStack} />
      
    </Drawer.Navigator>
       
    :

    token !== null && category === 'Customer'
    ?
      <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.TUMBLR,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Asaan Kisaan Market"
>
      <Drawer.Screen name="Asaan Kisaan Market" component={HomeStack} />
      <Drawer.Screen name="Cart" component={CartStack} />
      <Drawer.Screen name="Wishlist" component={WistlistStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Track Order" component={TrackStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Contact Us" component={ContactStack} />
      
      </Drawer.Navigator>
      
    :
   
      token !== null && category === 'Vendor'
      ?
      <Drawer.Navigator
      style={{ flex: 1 }}
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerStyle={{
          backgroundColor: nowTheme.COLORS.TUMBLR,
          width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Asaan Kisaan Market"
    >
      <Drawer.Screen name="Asaan Kisaan Market" component={HomeStack} />
      <Drawer.Screen name="Vendor Dashboard" component={VendorStack} />
      <Drawer.Screen name="Track Order" component={TrackStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Contact Us" component={ContactStack} />
      </Drawer.Navigator> 
   :
   
   <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.TUMBLR,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Asaan Kisaan Market"
    >
      <Drawer.Screen name="Asaan Kisaan Market" component={HomeStack} /> 
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Contact Us" component={ContactStack} />
      <Drawer.Screen name="LOGIN" component={AccountStack} />
      </Drawer.Navigator>
      
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

