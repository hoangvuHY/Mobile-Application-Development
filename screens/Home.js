import React, { useLayoutEffect, useState } from 'react';
import {
	StyleSheet, Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const ListButton = ({ title, color, onNagationDetail, onNavigationEdit, onRemove }) => {
	return (
		// Chạm vào để chuyển màn hình
		<TouchableOpacity
			onPress={onNagationDetail}
			style={[styles.itemContainer, { backgroundColor: color }]}
		>
			<View>
				<Text style={styles.itemTitle} >
					{title}
				</Text>
			</View>
			<View style={{ flexDirection: "row" }} >
				<TouchableOpacity
					onPress={onNavigationEdit}
				>
					<Ionicons name="options-outline" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={onRemove}>
					<Ionicons name="trash-outline" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	)
};

const renderAddListIcon = (navigation, addItemTodoList) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("EditList", { saveChanges: addItemTodoList })}
		>
			<Text style={styles.icon}>+</Text>
		</TouchableOpacity >
	)
}

// Biến navigation mặc định của react native
export default ({ navigation }) => {
	// Demo
	const [lists, setLists] = useState([
		{ title: "School", color: Colors.red },
		{ title: "Word", color: Colors.green },
		{ title: "Fun", color: Colors.gray },
	]);

	// Thêm vào list và cập nhật state
	const addItemTodoList = (item) => {
		lists.push(item);
		setLists([...lists])
	}

	// Xoá vào list và cập nhật state
	const removeItemToList = (index) => {
		lists.splice(index, 1);
		setLists([...lists]);
	}

	// Update
	const updateItemFromLists = (index, item) => {
		lists[index] = item;
		setLists([...lists]);
	}

	// Sử dụng để để chạy trước UI. Cái này chạy xong mới hiện UI
	useLayoutEffect(() => {
		navigation.setOptions({
			// Hiện header phải (Doc react native)
			headerRight: () => renderAddListIcon(navigation, addItemTodoList),
		})
	})

	return (
		<View style={styles.container}>
			<FlatList
				data={lists}
				// Hàm này giống với hàm map trong react. Truyền vào object và index
				renderItem={({ item: { title, color }, index }) => {
					return (
						<ListButton
							title={title}
							color={color}
							navigation={navigation}
							onRemove={() => removeItemToList(index)}
							onNagationDetail={() => {
								// Khi chạm vào cả cái khung thì sẽ ra màn hình của phần này. Đồng thời truyền 2 giá trị title và color qua route
								navigation.navigate("TodoList", { title, color })
							}}
							onNavigationEdit={() => {
								// Khi chạm vào Edit thì sẽ ra màn hình của phần này. Đồng thời truyền 2 giá trị title,color và hàm saveChanges qua route
								navigation.navigate("EditList",
								// Truyền xuống cho EditList item và index thông qua saveChanges
									{ title, color, saveChanges: (item) => updateItemFromLists(index,item) })
							}}
						/>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	// css cho các component
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	itemTitle: {
		fontSize: 24,
		padding: 5,
		color: 'white',
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	}

});
