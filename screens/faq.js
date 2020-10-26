import React, { Component } from "react";
import {
   
    View,
   ScrollView,
    Text
  } from 'react-native';
import { Container, Header, Content, Accordion,Icon } from "native-base";
const dataArray = [
  { title: "What is resistivity meter?", content: "An electronic instrument, to work on the principal of finding out resistance of the deep ground water layer." },
  { title: "To what extent the prediction is correct:", content: "From 80-85 % correct assessment assured." },
  { title: "Where the Application Forms are available?", content: "From offices of the Drilling Supervisor / Assistant Agricultural Engineers (Well Drilling) of the District concerned." },
  { title: "What are Information Channels?", content: "From offices of the Drilling Supervisor / Assistant Agricultural Engineers (Well Drilling) of the District concerned." },
  { title: "What will be the Delivery Mechanism?	", content: "Cash on Delivery and Credit Card" },
  { title: "What maintenance is required for a biogas plant?", content: "On daily basis or at least 2-3 times a week, duly proportionately mixing equal quantities of water and cattle dung / humus." },
  { title: "What is resistivity meter?", content: "An electronic instrument, to work on the principal of finding out resistance of the deep ground water layer." },
  { title: "To what extent the prediction is correct:", content: "From 80-85 % correct assessment assured." },
  { title: "Where the Application Forms are available?", content: "From offices of the Drilling Supervisor / Assistant Agricultural Engineers (Well Drilling) of the District concerned." },


];
export default class FAQ extends Component {
    _renderHeader(item, expanded) {
        return (
          <View style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            alignItems: "center" ,
            backgroundColor: "white" }}>
          <Text style={{ fontWeight: "600" }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
              : <Icon style={{ fontSize: 18 }} name="add-circle" />}
          </View>
        );
      }
      _renderContent(item) {
        return (
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              fontStyle: "italic",
            }}
          >
            {item.content}
          </Text>
        );
      }
  render() {
      
    return (
        <ScrollView>
      <Container style={{   marginTop: "20%",}}>
      
        <Content >
        <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
      </ScrollView>
    );
  }
}