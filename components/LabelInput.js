import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

// Cho label ra 1 component để dùng chung
export default ({
  labelStyle,
  label,
  errorMessage,
  inputStyle,
  text,
  onChangeText,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={labelStyle}>{label}</Text>

        <Text style={styles.error}>{errorMessage && `*${errorMessage}`}</Text>

        <TextInput
          underlineColorAndroid="transparent"
          selectionColor="transparent"
          style={[styles.input, { color: "none" }, inputStyle]}
          value={text}
          onChangeText={onChangeText}
          {...inputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    margin: 4,
  },
  labelContainer: {
    flexDirection: "column",
    marginBottom: 4,
  },
  error: {
    color: Colors.red,
    fontSize: 12,
    marginLeft: 4,
  },
  input: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingLeft: 4,
    height: 32,
    fontSize: 24,
    color: Colors.black,
  },
});
