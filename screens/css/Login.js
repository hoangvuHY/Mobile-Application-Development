import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLogin: {
    paddingBottom: 15,
  },
  textHeader1: {
    paddingLeft: 12,
    fontWeight: 'bold',
    fontSize: 27,
    color: '#3C6D7D',
  },
  textHeader2: {
    paddingLeft: 12,
    fontSize: 17,
    color: '#3C6D7D'
  },
  imageHeader: {
    flex: 5
  },
  imgHeader: {
    width: '100%',
    height: '100%'
  },
  contentLogin: {
    flex: 5,
    borderRadius: 20,
    position: "relative",
    top: -30,
    backgroundColor: "white",
    justifyContent: 'center'
  },
  isAccount: {
    paddingLeft: 12,
    fontWeight: 'bold',
    color: '#3C6D7D'
  },


});
export default styles;