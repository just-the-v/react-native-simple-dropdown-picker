import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

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
  titleAndDotContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
  },
});

export default function FlatListSelector({
  displayableData,
  setValue,
  setIsDeployed,
}) {
  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={styles.container}
      nestedScrollEnabled
      data={displayableData}
      keyExtractor={item => `${item.id || item.name || item}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            setValue(item?.name || item);
            setIsDeployed(false);
          }}
          style={styles.titleContainer}>
          <Text style={styles.title}>{item?.name || item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
