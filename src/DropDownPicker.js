import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FlatListSelector from './FlatListSelector';

export default function DropDownPicker({resultObject, data, placeholder}) {
  const [isDeployed, setIsDeployed] = useState(false);
  const [result, setResult] = resultObject;
  const arrowAnim = useRef(new Animated.Value(0)).current;

  const arrowTranslated = arrowAnim.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });

  function rotateTo(toValue) {
    Animated.timing(arrowAnim, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  function getInputStyle() {
    let style = styles.input;

    if (isDeployed) {
      style = {...style, ...styles.inputFocus};
    }
    return style;
  }

  function handleDeployed() {
    if (isDeployed) {
      rotateTo(90);
    } else {
      rotateTo(0);
    }
  }

  useEffect(() => {
    handleDeployed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeployed]);

  return (
    <View>
      <TouchableOpacity
        style={getInputStyle()}
        onPress={() => setIsDeployed(!isDeployed)}>
        <Text style={styles.result}>
          {result?.name || result || placeholder || data[0]}
        </Text>
        <Animated.View
          style={{...styles.icon, transform: [{rotate: arrowTranslated}]}}>
          <Image source={require('../assets/images/img.png')} />
        </Animated.View>
      </TouchableOpacity>
      {isDeployed && (
        <FlatListSelector
          setIsDeployed={setIsDeployed}
          displayableData={data}
          setValue={setResult}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 40,
    paddingHorizontal: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  inputFocus: {
    borderWidth: 1,
  },
  result: {
    fontSize: 17,
  },
  icon: {
    width: 30,
    alignItems: 'center',
  },
});
