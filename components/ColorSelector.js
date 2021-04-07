import React, { useLayoutEffect, useState } from 'react';
import {
	StyleSheet, Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const ColorButton = ({ clickChooseColor, isSelected, color }) => {
	return (
		// Khi click vào 1 màu bất kỳ
		<TouchableOpacity
			onPress={clickChooseColor}
			style={[
				styles.colorButton,
				{
					borderWidth: isSelected ? 3 : 0,
					backgroundColor: color
				}
			]}
		/>
	)
}

export default ({ selectedColor, colorOptions, onSelect }) => {
	return (
		<View style={styles.container} >
			{colorOptions.map((colorName) => {
				return (
					<ColorButton
						// Nhấn vào và truyền lên cho EditList màu đã chọn
						clickChooseColor={() => onSelect(Colors[colorName])}
						// Set color. 
						color={Colors[colorName]}
						// Nếu chưa có gì thì sẽ lấy màu ban đầu. Các màu chưa  được chọn sẽ false hết
						isSelected={Colors[colorName] == selectedColor}
					/>
				)
			})}
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flex: 1,
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center'
	},
	colorButton: {
		height: 30,
		width: 30,
		borderColor: Colors.lightGray,
		borderRadius: 24,
		margin: 10
	}
})