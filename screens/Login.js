import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import validator from "validator";
import firebase from 'firebase';

import Colors from "../constants/Colors";
import Button from "../components/Button";
import LabelInput from "../components/LabelInput";

import styles from './css/Login';
import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
} from "@expo-google-fonts/dev";

// Dùng thư viện Validator để validate khi đăng ký và đăng nhập
const validatorField = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      // Tạm thời chỉ để min 3 cho dễ test
      minLength: 3,
      minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0
    }),
  };
  // minLowercase: 1,
  // minUppercase: 1,
  // minNumbers: 1,
  // minSymbols: 1,
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
      firebase.firestore().collection("users").doc(user.uid).set({})
    })
};

export default () => {
  /* Login/Create Account Button */
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Bangers_400Regular,
    OpenSans_400Regular
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
    <View style={[styles.container, {background: 'white'}]}>
      <View style={styles.imageHeader}>
        <Image source={require('../assets/backgroundLogin.jpg')} style={styles.imgHeader}></Image>
      </View>
      <View style={styles.contentLogin}>
        <View style={styles.headerLogin}>
          <Text style={[styles.textHeader1, { fontFamily: "OpenSans_400Regular" }]}>
            {/*    <Ionicons name="ios-logo-firebase" size={70} color={Colors.red} />{" "} */}
           Welcome
        </Text>
          <Text style={[styles.textHeader2, { fontFamily: "OpenSans_400Regular" }]}>
            Đăng nhập để tiếp tục
        </Text>
        </View>

        <LabelInput

          text={emailField.text}
          placeholder="Email"
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}

          autoCompleteType="Email"
        />

        <LabelInput
          placeholder="Mật khẩu"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          // Trường này để password hiện dấu ****
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}

          autoCompleteType="password"
        />

        {isCreateMode ? (
          <LabelInput
            text={passworReentrydField.text}
            placeholder="Nhập lại mật khẩu"
            onChangeText={(text) => {
              setPassworReentrydField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passworReentrydField.errorMessage}

            autoCompleteType="email"
          />
        ) : (
          ""
        )}

        <TouchableOpacity
          onPress={() => {
            setIsCreateMode(!isCreateMode);
          }}
        >
          <Text style={[styles.isAccount, {fontFamily: "OpenSans_400Regular"}]}>
            {isCreateMode ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
          </Text>
        </TouchableOpacity>


        <Button
          onPress={() => {
            const isValid = validatorField(emailField.text, passwordField.text);
            let isAllValid = true;
            if (!isValid.email) {
              emailField.errorMessage = "Vui lòng nhập email hợp lệ";
              setEmailField({ ...emailField });
              isAllValid = false;
            }

            if (!isValid.password) {
              passwordField.errorMessage =
                "Bạn phải nhập bao gồm ít nhất 8 ký tự, bao gồm: chữ số, chữ viết thường, chữ viết hoa và ký hiệu";
              setEmailField({ ...passwordField });
              isAllValid = false;
            }

            if (isCreateMode && passworReentrydField.text != passwordField.text) {
              passworReentrydField.errorMessage = "Mật khẩu không đồng nhất";
              setPassworReentrydField({ ...passworReentrydField });
              isAllValid = false;
            }

            if (isAllValid) {
              isCreateMode
                ? createAccount(emailField.text, passwordField.text)
                : login(emailField.text, passwordField.text);
            }

          }}
          text={isCreateMode ? "Đăng ký" : "Đăng nhập"}
        />
      </View>

    </View>
  );
};

