import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'firebase';

import TodoItem from '../components/TodoItem'
import { onSnapshot, addDoc, removeDoc, updateDoc } from '../services/collections'

const renderAddItemIcon = (addItem) => {
	return (
		<TouchableOpacity
			onPress={() => addItem()}
		>
			<Text style={styles.icon}>+</Text>
		</TouchableOpacity>
	)
}

export default ({ navigation, route }) => {
	let [todoItems, setTodoItems] = useState([]);
	const [newItems, setNewItems] = useState();

	const todoItemRef = firebase
		.firestore()
		.collection("users")
		.doc(firebase.auth().currentUser.uid)
		.collection('lists')
		.doc(route.params.listId)
		.collection('todoItems');

	const addTodoItem = () => {
		setNewItems({ text: '', isChecked: false, new: true });
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => renderAddItemIcon(addTodoItem),
		})
	});

	/* 	const updateItemFromLists = (index, item) => {
			todoItems[index] = item;
			setTodoItems([...todoItems])
		};
	 */
	const removeItemFromList = (index) => {
		todoItems.splice(index, 1);
		setTodoItems([...todoItems])
	};

	if (newItems) {
		todoItems = [newItems, ...todoItems];
	}

	useEffect(() => {
		onSnapshot(todoItemRef,
			(newTodoItem) => {
				setTodoItems(newTodoItem)
			}, {
			sort: (a, b) => {
				if (a.isChecked && !b.isChecked) {
					return 1;
				}

				if (!a.isChecked && b.isChecked) {
					return -1;
				}

				return 0;
			}
		}

		)
	}, []);

	return (
		// Cũng giống trong file home
		<View style={styles.container} >
			<FlatList
				// Demo
				data={todoItems}
				renderItem={({ item: { id, text, isChecked, ...params }, index }) => {
					return (
						<TodoItem
							// Truyền xuống cho con là TodoItem 
							{...params}
							text={text}
							isChecked={isChecked}
							onChecked={() => {
								/* 								// Tìm phần tử đó khi bấm vào xem đã checked chưa?
																const todoItemm = todoItems[index];
								
																todoItemm.isChecked = !isChecked;
																// Update ra màn hình sau khi đã sửa xong 
																updateItemFromLists(index, todoItemm); */
								let data = { text, isChecked: !isChecked };
								if (id) {
									data.id = id;
								}
								addDoc(todoItemRef, data);
							}}
							onChangeText={(newText) => {
								/* 								// Tìm phần tử đó khi bấm vào xem đã checked chưa?
																const todoItem = todoItems[index];
																// Gán nó với text mới
																todoItem.text = newText;
																updateItemFromLists(index, todoItem); */
								if (params.new) {
									setNewItems({
										text: newText,
										isChecked,
										new: params.new,
									});
								} else {
									todoItems[index].text = newText;
									setTodoItems([...todoItems]);
								}
							}}
							onDelete={() => {
								// Tìm vào xoá luôn
								// removeItemFromList(index);
								params.new ? setNewItems(null) : removeItemFromList(index);
								id && removeDoc(todoItemRef, id);
							}}
							onBlur={() => {
								if (text.length > 1) {
									let data = { text, isChecked };
									if (id) {
										data.id = id;
									}
									addDoc(todoItemRef, data);
									params.new && setNewItems(null);
								} else {
									params.new ? setNewItems(null) : removeItemFromList(index);
								}
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
