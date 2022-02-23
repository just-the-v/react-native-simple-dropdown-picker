import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
  } from 'react-native';
  import React from 'react';

  const styles = StyleSheet.create({
    flatList: {
      flexShrink: 0,
      maxHeight: 200,
      flexGrow: 0,
      width: '90%',
      alignSelf: 'center',
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      // @TODO add shadow,
    },
    container: {
      backgroundColor: 'white',
      paddingTop: 10,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    title: {
      fontSize: 16,
      marginLeft: 10,
      maxWidth: '80%',
    },
    titleContainer: {
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    titleAndDotContainer: {
      paddingHorizontal: 20,
      marginVertical: 10,
      flexDirection: 'row',
    },
    dot: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    headerText: {
      fontSize: 18,
      paddingHorizontal: 20,
    },
  });

  export default function FlatListSelector({
    displayableData, setValue, setIsDeployed,
  }) {

    return (
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        nestedScrollEnabled
        data={displayableData}
        keyExtractor={(item) => `${item.id || item.name || item}`}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
              setValue(item?.name || item);
              setIsDeployed(false);
            }}
            style={styles.titleContainer}
          >
            <Text style={styles.title}>
              {item?.name || item}
            </Text>
          </TouchableOpacity>
          )}
      />
    );
  }
