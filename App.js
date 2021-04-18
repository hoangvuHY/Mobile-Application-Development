import React, { useState, useEffect } from "react";
import firebase from 'firebase';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import TodoList from "./screens/TodoList";
import EditList from "./screens/EditList";
import Colors from "./constants/Colors";
import Login from "./screens/Login";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreen = () => {
  // Màn hình đăng ký và đăng nhập
  return (
    <AuthStack.Navigator>
      {/* Cho ra màn hình login */}
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

const Screen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      {/* Màn hình setting này để đăng xuất */}
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen
        // Đây chính là những thứ mà Home truyền vào trong TodoList
        name="TodoList"
        component={TodoList}
        options={
          // Biến route này là props có sẵn
          ({ route }) => {
            return {
              // Trả về cho TodoList thông qua các biến trên
              title: route.params.title,
              headerStyle: {
                // Hiển thị luôn trên header của app
                backgroundColor: route.params.color,
              },
              headerTintColor: "white",
            };
          }
        }
      />

      <Stack.Screen
        name="EditList"
        component={EditList}
        options={({ route }) => {
          return {
            // Kiểm tra xem title truyền nên có  tồn tại không. Sửa thì sẽ tồn tại title
            title: route.params.title
              ? `Edit ${route.params.title} list`
              : "Create new List",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: "white",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }

    firebase.auth().onAuthStateChanged(user => {
      console.log("check auth state....");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <Screen /> : <AuthScreen />}
    </NavigationContainer>
  );
}

// Your web app's Firebase configuration
// Lấy từ firebase của mình
const firebaseConfig = {
  apiKey: "AIzaSyBA47sIy4m36MOweNHI3xGgs6dmAZ9P0_o",
  authDomain: "fire-todo-fc6cd.firebaseapp.com",
  projectId: "fire-todo-fc6cd",
  storageBucket: "fire-todo-fc6cd.appspot.com",
  messagingSenderId: "891633318859",
  appId: "1:891633318859:web:3a1f18d8dc846ff540944e"
};

// Initialize Firebase
// Khởi tạo để sử dụng firebase vào trong projects
firebase.initializeApp(firebaseConfig);
