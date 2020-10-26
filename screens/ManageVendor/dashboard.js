import React from 'react';
import { ScrollView, StyleSheet,ImageBackground ,Dimensions} from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme,Images } from '../../constants/';
import { Card } from '../../components/';
const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
class VendorDashBoard extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
{/*      
        <Card item={articles[0]} horizontal />
       
        <Card item={articles[3]} horizontal />
        <Card item={articles[4]} full /> */}
        <Block flex card center shadow style={styles.category}>
        <Block style={{paddingTop:12}}>
          <ImageBackground
            source={Images.Products['path']}
            style={[
              styles.imageBlock,
              { width: width - theme.SIZES.BASE * 2, height: 110 }
            ]}
            imageStyle={{
              width: width - theme.SIZES.BASE * 2,
              height: 252
            }}
          >
            <Block style={styles.categoryTitle}>
              <Text size={18} bold color={theme.COLORS.WHITE}
              onPress={()=>this.props.navigation.navigate('Add Product')}>
                Add Product
              </Text>
            </Block>
          </ImageBackground>
</Block>
          <Block style={{paddingTop:12}}>
      
    
      <ImageBackground
        source={Images.Products['path']}
        style={[
          styles.imageBlock,
          { width: width - theme.SIZES.BASE * 2, height: 110 }
        ]}
        imageStyle={{
          width: width - theme.SIZES.BASE * 2,
          height: 252
        }}
      >
        <Block style={styles.categoryTitle}>
          <Text size={18} bold color={theme.COLORS.WHITE} onPress={()=>this.props.navigation.navigate('My Product')}>
          View Product
          </Text>
        </Block>
      </ImageBackground>
</Block>
    
      <Block style={{paddingTop:12}}> 
          <ImageBackground
            source={Images.Products['path']}
            style={[
              styles.imageBlock,
              { width: width - theme.SIZES.BASE * 2, height: 110 }
            ]}
            imageStyle={{
              width: width - theme.SIZES.BASE * 2,
              height: 252
            }}
          >
            <Block style={styles.categoryTitle}>
              <Text size={18} bold color={theme.COLORS.WHITE} onPress={()=>this.props.navigation.navigate('Delete Product')}>
              Delete Product
              </Text>
            </Block>
          </ImageBackground>
</Block>
  <Block style={{paddingTop:12}}>
          <ImageBackground
            source={Images.Products['path']}
            style={[
              styles.imageBlock,
              { width: width - theme.SIZES.BASE * 2, height: 110 }
            ]}
            imageStyle={{
              width: width - theme.SIZES.BASE * 2,
              height: 252
            }}
          >
            <Block style={styles.categoryTitle}>
              <Text size={18} bold color={theme.COLORS.WHITE} onPress={()=>this.props.navigation.navigate('Update Product')}>
              Update Product
              </Text>
            </Block>
          </ImageBackground>
</Block>
        </Block>
        </Block>
      
    );
  };

  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10,
   
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    paddingHorizontal:10,
    borderWidth: 0,
    
  },
});

export default VendorDashBoard;
