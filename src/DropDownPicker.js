import React, {useEffect, useRef, useState} from 'react';
import {
  Animated, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FlatListSelector from './FlatListSelector';


const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 40,
    paddingHorizontal: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputFocus: {
    borderWidth: 1,
  },
  result: {
    fontSize: 17,
  },
});

export default function DropDownPicker({ resultObject, data, placeholder }) {
  const [isDeployed, setIsDeployed] = useState(false);
  const [result, setResult] = resultObject;

  const arrowAnim = useRef(new Animated.Value(0)).current;
  const rotateDown = () => {
    Animated.timing(arrowAnim, {
      toValue: 3.14159,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const rotateUp = () => {
    Animated.timing(arrowAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  function getInputStyle() {
    let style = styles.input;

    if (isDeployed) {
      style = { ...style, ...styles.inputFocus };
    }
    return style;
  }

  function handleDeployed() {
    if (isDeployed) {
      rotateDown();
    } else {
      rotateUp();
    }
  }

  useEffect(() => {
    handleDeployed();
  }, [isDeployed])


  return (
    <View>
      <TouchableOpacity style={getInputStyle()} onPress={() => setIsDeployed(!isDeployed)}>
        <Text style={styles.result}>{result?.name || result || placeholder}</Text>
        <Animated.View style={{ transform: [{ rotate: arrowAnim }] }}>
          {/*<IconFactory kind="polygon" scale={1.3} />*/}
        </Animated.View>
      </TouchableOpacity>
      {
        isDeployed
        && (
        <FlatListSelector
          setIsDeployed={setIsDeployed}
          displayableData={data}
          setValue={setResult}
        />
        )
      }
    </View>
  );
}
