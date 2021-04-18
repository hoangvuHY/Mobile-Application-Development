import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { CommonActions } from "@react-navigation/routers";

import Colors from "../constants/Colors";
import ColorSelector from "../components/ColorSelector";
import Button from "../components/Button";

const colorList = [
  "black",
  "gray",
  "teal",
  "green",
  "blue",
  "purple",
  "orange",
  "red",
  "pink",
  "olive",
  "yellow",
  "blueGray",
];

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || Colors.blue);
  // Check xem người dùng có nhập dữ liệu không?
  const [isValid, setValid] = useState(true);

  const handleChangeText = (text) => {
    setTitle(text);
    setValid(true);
  };

  return (
    <View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>List Name</Text>
          {!isValid && (
            <Text style={styles.checkInput}>* List name cannot empty</Text>
          )}
        </View>

        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={handleChangeText}
          placeholder={"New List Name"}
          maxLength={30}
          style={[styles.input, { outline: "none" }]}
        />

        <Text style={styles.label}>Choose Color</Text>
        <ColorSelector
          onSelect={(color) => {
            setColor(color);
            // Truyền xuống cho navigate màu được nhận vào và cập nhật route
            navigation.dispatch(CommonActions.setParams({ color }));
          }}
          selectedColor={color}
          colorOptions={colorList}
        />
      </View>

      <Button
        text="Save"
        onPress={() => {
          // Check title
          if (title.length > 1) {
            // Gọi hàm saveChanges từ router và chuyền vào trong là title và color
            route.params.saveChanges({ title, color });
            // Trở lại Home
            navigation.dispatch(CommonActions.goBack());
          } else {
            setValid(false);
          }
        }}
        buttonStyle={styles.saveButton}
        textStyle={styles.textSaveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // css
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.drakGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.drakGray,
    height: 50,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textSaveButton: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    color: Colors.black,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  checkInput: {
    color: Colors.red,
    fontSize: 13,
    marginLeft: 10,
    marginTop: 10,
  },
});
