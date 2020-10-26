import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from '../Styles/detailViewstyles';
import Ingredientbuttonstyles from '../components/ViewIngredientsButton/styles';
const { width: viewportWidth } = Dimensions.get('window');

export default class DetailView extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };

    const { navigation } = this.props;
  }


  render() {
    const { activeSlide } = this.state;
    const { route } = this.props;
    const item = route.params.item;
    console.log(item);
    return (
      <ScrollView style={styles.container}>
         <TouchableHighlight>
         <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.productPicture }} />
           </View>
       </TouchableHighlight>
        
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.productName}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate('RecipesList', { category, title })}
            >
              <Text style={styles.category}>{item.category.toUpperCase()}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>Product Quantity:</Text>
          <Text style={styles.infoDescriptionRecipe}>{item.productQuantity}</Text>
          </View>
          <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>Product Price:</Text>
          <Text style={styles.infoDescriptionRecipe}>{item.productPrice} Rupees</Text>
          </View>
          {
            item.prodyctType !=="" ?
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>Product Type:</Text>
            <Text style={styles.infoDescriptionRecipe}>{item.prodyctType}</Text>
          </View>
          :
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>Company Name:</Text>
            <Text style={styles.infoDescriptionRecipe}>{item.CompanyName}</Text>
          </View>
          
          }
          <View style={styles.infoContainer}>
              <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' >
                <View style={Ingredientbuttonstyles.container}>
                  <Text style={Ingredientbuttonstyles.text}>View Ingredients</Text>
                </View>
              </TouchableHighlight>
          </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        
      </ScrollView>
    );
  }
}
