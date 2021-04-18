import React from "react";
import firebase from 'firebase';

import Button from "../components/Button";
import { View } from "react-native";

export default () => {
  return (
    <View style={{ flex: 1 }}  >
      <Button
        text="Log out"
        onPress={() => {
          // Logout
          firebase.auth().signOut();
        }}
      />
    </View>
  );
};
