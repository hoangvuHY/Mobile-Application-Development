import React, { useLayoutEffect, useState } from 'react';
import {
	StyleSheet, View, TouchableOpacity, TextInput, Text
} from 'react-native';

import Colors from '../constants/Colors';
import Checkbox from './Checkbox'

const EditableText = ({ text, isChecked, onChangeText, isNewItem }) => {
	const [isEditMode, setEditMode] = useState(isNewItem);

	return (
		<TouchableOpacity style={{ flex: 1 }} onPress={() => !isChecked && setEditMode(true)} >
			{
				isEditMode ? <TextInput
					underlineColorAndroid={"transparent"}
					selectionColor={"transparent"}
					// Bấm vào nút add sẽ tự động focus
					autoFocus={true}
					value={text}
					// Tất cả những thay đổi đề được gửi lên cho TodoList
					onChangeText={onChangeText}
					placeholder={"Add new item here"}
					onSubmitEditing={() => { }}
					maxLength={30}
					// Có thể thêm vào thuôc tính của css
					style={[styles.input, { outline: "none" }]}
					// Khi mà ra khỏi input 
					onBlur={() => setEditMode(false)}	
				/> :
					<Text
						style={
							[styles.text],
							{
								color: isChecked ? Colors.lightGray : Colors.black,
								opacity: isChecked ? 0.3 : 1,
								textDecorationLine: isChecked ? 'line-through' : 'none'
							}
						}
					>{text}</Text>
			}

		</TouchableOpacity>
	)
}

export default ({
	text, isChecked, onChecked, onChangeText, onDelete, isNewItem
}) => {
	return (
		<View style={styles.container} >
			<View style={{ flexDirection: 'row', flex: 1 }} >
				<Checkbox isChecked={isChecked} onChecked={onChecked} />

				<EditableText
					text={text}
					isChecked={isChecked}
					onChangeText={onChangeText}
					isNewItem={isNewItem}
				/>

				<TouchableOpacity onPress={onDelete} >
					<Text style={[styles.icon], { color: Colors.red }} >X</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		padding: 10
	},
	icon: {
		padding: 5,
		fontSize: 32,
		color: 'white'
	},
	input: {
		color: Colors.black,
		borderBottomColor: Colors.lightGray,
		borderBottomWidth: 0.5,
		marginHorizontal: 5,
		padding: 5,
		height: 25,
		fontSize: 16,
	},
	text: {
		padding: 10,
		fontSize: 16,
	}
})
