import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home'
import TodoList from './screens/TodoList';
import EditList from './screens/EditList';
import Colors from './constants/Colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          // Đây chính là những thứ mà Home truyền vào trong TodoList 
          name="TodoList"
          component={TodoList}
          options={
            // Biến route này là props có sẵn
            ({ route }) => {
              return ({
                // Trả về cho TodoList thông qua các biến trên
                title: route.params.title,
                headerStyle: {
                  // Hiển thị luôn trên header của app
                  backgroundColor: route.params.color
                },
                headerTintColor: "white"  
              })
            }
          }
        />

        <Stack.Screen
          name="EditList"
          component={EditList}
          options={
            ({ route }) => {
              return ({
                // Kiểm tra xem title truyền nên có  tồn tại không. Sửa thì sẽ tồn tại title
                title: route.params.title ? `Edit ${route.params.title} list` : "Create new List",
                headerStyle: {
                  backgroundColor: route.params.color || Colors.blue
                },
                headerTintColor: "white"
              })
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
