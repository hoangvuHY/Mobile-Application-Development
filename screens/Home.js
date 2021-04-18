import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from 'firebase';

import Colors from "../constants/Colors";
import { onSnapshot, addDoc, removeDoc, updateDoc } from '../services/collections';
import { add } from "react-native-reanimated";

const ListButton = ({
  title,
  color,
  onNagationDetail,
  onNavigationEdit,
  onRemove,
}) => {
  return (
    // Chạm vào để chuyển màn hình
    <TouchableOpacity
      onPress={onNagationDetail}
      style={[styles.itemContainer, { backgroundColor: color }]}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onNavigationEdit}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const renderAddListIcon = (navigation, addItemTodoList) => {
  return (
    <View style={{ flexDirection: 'row' }}  >
      <TouchableOpacity
        style={{ justifyContent: 'center', marginRight: 5 }}
        onPress={() => navigation.navigate("Settings")}
      >
        {/* Thêm phần setting để log out */}
        <Ionicons name="settings" size={16} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ justifyContent: 'center', marginRight: 10 }}
        onPress={() =>
          navigation.navigate("EditList", { saveChanges: addItemTodoList })
        }
      >
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Biến navigation mặc định của react native
export default ({ navigation }) => {
  // Demo
  const [lists, setLists] = useState([
    /*     { title: "School", color: Colors.red },
        { title: "Word", color: Colors.green },
        { title: "Fun", color: Colors.gray }, */
  ]);

  const listRef = firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection("lists");

  useEffect(() => {
    onSnapshot(listRef, (newLists) => {
      setLists(newLists);
    }, {
      sort: (a, b) => {
        if (a.index < b.index) {
          return -1;
        }

        if (a.index > b.index) {
          return 1;
        }

        return 0;
      },
    });
  }, []);

  // Thêm vào list và cập nhật state
  const addItemTodoList = ({ title, color }) => {
    const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
    addDoc(listRef, { title, color, index })
  };

  // Xoá vào list và cập nhật state
  const removeItemToList = (id) => {
    removeDoc(listRef, id);
  };

  // Update
  const updateItemFromLists = (id, item) => {
    updateDoc(listRef, id, item);
  };

  // Sử dụng để để chạy trước UI. Cái này chạy xong mới hiện UI
  useLayoutEffect(() => {
    navigation.setOptions({
      // Hiện header phải (Doc react native)
      headerRight: () => renderAddListIcon(navigation, addItemTodoList),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        // Hàm này giống với hàm map trong react. Truyền vào object và index
        renderItem={({ item: { title, color, id, index } }) => {
          return (
            <ListButton
              title={title}
              color={color}
              navigation={navigation}
              onRemove={() => removeItemToList(id)}
              onNagationDetail={() => {
                // Khi chạm vào cả cái khung thì sẽ ra màn hình của phần này. Đồng thời truyền 2 giá trị title và color qua route
                navigation.navigate("TodoList",
                  { title, color, listId: id });
              }}
              onNavigationEdit={() => {
                // Khi chạm vào Edit thì sẽ ra màn hình của phần này. Đồng thời truyền 2 giá trị title,color và hàm saveChanges qua route
                navigation.navigate(
                  "EditList",
                  // Truyền xuống cho EditList item và index thông qua saveChanges
                  {
                    title,
                    color,
                    saveChanges: (newItem) => updateItemFromLists(id, { index, ...newItem }),
                  }
                );
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // css cho các component
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemTitle: {
    fontSize: 24,
    padding: 5,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
