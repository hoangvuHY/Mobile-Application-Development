import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import validator from "validator";
import firebase from 'firebase';

import Colors from "../constants/Colors";
import Button from "../components/Button";
import LabelInput from "../components/LabelInput";

// Dùng thư viện Validator để validate khi đăng ký và đăng nhập
const validatorField = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      // Tạm thời chỉ để min 3 cho dễ test
      minLength: 3,
      // minLowercase: 1,
      // minUppercase: 1,
      // minNumbers: 1,
      // minSymbols: 1,
    }),
  };
  return isValid;
};

const login = (email, password) => {
  // Dung thư viện của firebase để làm chức năng đăng nhập
  firebase.auth().signInWithEmailAndPassword(email, password);
};

const createAccount = (email, password) => {
  console.log('createAccount...');
  // Dung thư viện của firebase để làm chức năng đăng ký
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log('Create User');
    })
};

export default () => {
  /* Login/Create Account Button */
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passworReentrydField, setPassworReentrydField] = useState({
    text: "",
    errorMessage: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name="ios-logo-firebase" size={70} color={Colors.red} />{" "}
        TodoApp
      </Text>

      <View style={{ flex: 1 }}>
        {/* /* Header */}
        {/* /* Email input */}
        <LabelInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="email"
        />
        {/* /* Password input */}
        <LabelInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          // Trường này để password hiện dấu ****
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="password"
        />
        {/* /* Password Reentry input. Khi bấm vào tạo thì mới hiện component này */}
        {isCreateMode ? (
          <LabelInput
            label="Re-enter Password"
            text={passworReentrydField.text}
            onChangeText={(text) => {
              setPassworReentrydField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passworReentrydField.errorMessage}
            labelStyle={styles.label}
            autoCompleteType="email"
          />
        ) : (
          ""
        )}
        {/* /* Login Toggle */}
        <TouchableOpacity
          onPress={() => {
            setIsCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Colors.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            {isCreateMode ? "Already have an account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={() => {
          const isValid = validatorField(emailField.text, passwordField.text);
          let isAllValid = true;
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email";
            setEmailField({ ...emailField });
            isAllValid = false;
          }

          if (!isValid.password) {
            passwordField.errorMessage =
              "Please must be at least 8 long w/numbers, uppercase, lowercase and symbol";
            setEmailField({ ...passwordField });
            isAllValid = false;
          }

          if (isCreateMode && passworReentrydField.text != passwordField.text) {
            passworReentrydField.errorMessage = "Password do not match!";
            setPassworReentrydField({ ...passworReentrydField });
            isAllValid = false;
          }

          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text)
              : login(emailField.text, passwordField.text);
          }

        }}
        buttonStyle={{ backgroundColor: Colors.red }}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  header: {
    fontSize: 60,
    color: Colors.red,
    alignSelf: "center",
  },
});
