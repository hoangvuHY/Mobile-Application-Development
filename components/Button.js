import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
} from "@expo-google-fonts/dev";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 
import Colors from "../constants/Colors";

// Tách button ra thành 1 Component để dùng chung
export default ({ buttonStyle, textStyle, onPress, text }) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Bangers_400Regular,
    OpenSans_400Regular
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, textStyle, { fontFamily: "OpenSans_400Regular" }]}>{text} <AntDesign name="arrowright" size={18} color="#3C6D7D" style={styles.arrowRight}/></Text>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: '#A8E5F9',
    padding: 9,
    width: 150,
    marginTop: 25,
    marginLeft: 12
  },
  text: {
    flex: 1,
    color: '#3C6D7D',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center'
  },
});
