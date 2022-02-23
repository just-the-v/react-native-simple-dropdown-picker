import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function FlatListSelector({
  displayableData,
  setValue,
  setIsDeployed,
  flatListStyle,
  flatListContainerStyle,
  touchableStyle,
  textStyle,
}) {
  return (
    <FlatList
      style={{...styles.flatList, ...flatListStyle}}
      contentContainerStyle={{...styles.container, ...flatListContainerStyle}}
      nestedScrollEnabled
      data={displayableData}
      keyExtractor={item => `${item.id || item.value || item}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            setValue(item);
            setIsDeployed(false);
          }}
          style={{...styles.titleContainer, ...touchableStyle}}>
          <Text style={{...styles.title, ...textStyle}}>
            {item?.value || item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 0,
    width: '90%',
    alignSelf: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  container: {
    paddingTop: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
