import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

import TodoItem from '../components/TodoItem'

const renderAddItemIcon = (addItem) => {
	return (
		<TouchableOpacity
			onPress={() => addItem({ text: "", isChecked: false, isNewItem: true })}
		>
			<Text style={styles.icon}>+</Text>
		</TouchableOpacity>
	)
}

export default ({ navigation }) => {
	const [todoItems, setTodoItems] = useState([]);

	const addTodoItem = ({ text, isChecked, isNewItem }) => {
		todoItems.push({ text, isChecked, isNewItem });
		setTodoItems([...todoItems]);
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => renderAddItemIcon(addTodoItem),
		})
	});

	const updateItemFromLists = (index, item) => {
		todoItems[index] = item;
		setTodoItems([...todoItems])
	};

	const removeItemFromList = (index) => {
		todoItems.splice(index, 1);
		setTodoItems([...todoItems])
	};

	return (
		// Cũng giống trong file home
		<View style={styles.container} >
			<FlatList
				// Demo
				data={todoItems}
				renderItem={({ item: { text, isChecked, isNewItem }, index }) => {
					return (
						<TodoItem
							// Truyền xuống cho con là TodoItem 
							text={text}
							isChecked={isChecked}
							isNewItem={isNewItem}
							onChecked={() => {
								// Tìm phần tử đó khi bấm vào xem đã checked chưa?
								const todoItemm = todoItems[index];

								todoItemm.isChecked = !isChecked;
								// Update ra màn hình sau khi đã sửa xong 
								updateItemFromLists(index, todoItemm);
							}}
							onChangeText={(newText) => {
								// Tìm phần tử đó khi bấm vào xem đã checked chưa?
								const todoItem = todoItems[index];
								// Gán nó với text mới
								todoItem.text = newText;
								updateItemFromLists(index, todoItem);
							}}
							onDelete={() => {
								// Tìm vào xoá luôn
								removeItemFromList(index);
							}}
						/>
					)
				}}
			/>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	icon: {
		padding: 5,
		fontSize: 32,
		color: 'white'
	}
})
