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

export default function DropDownPicker({
  result,
  setResult,
  data,
  placeholder,
  animatedIcon,
  wrapperStyle,
  resultTextStyle,
  inputStyle,
  focusedInputStyle,
  flatListStyle,
  flatListContainerStyle,
  touchableStyle,
  textStyle,
}) {
  const [isDeployed, setIsDeployed] = useState(false);
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
    let style = {...styles.input, ...inputStyle};

    if (isDeployed) {
      style = {...style, ...styles.inputFocus, ...focusedInputStyle};
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
    <View style={{...styles.wrapper, ...wrapperStyle}}>
      <TouchableOpacity
        style={getInputStyle()}
        onPress={() => setIsDeployed(!isDeployed)}>
        <Text style={{...styles.result, ...resultTextStyle}}>
          {result?.value || result || placeholder || data[0]}
        </Text>
        <Animated.View
          style={{...styles.icon, transform: [{rotate: arrowTranslated}]}}>
          {animatedIcon || (
            <Image source={require('../assets/images/img.png')} />
          )}
        </Animated.View>
      </TouchableOpacity>
      {isDeployed && (
        <FlatListSelector
          setIsDeployed={setIsDeployed}
          displayableData={data}
          setValue={setResult}
          flatListStyle={flatListStyle}
          flatListContainerStyle={flatListContainerStyle}
          touchableStyle={touchableStyle}
          textStyle={textStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
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
  inputFocus: {},
  result: {
    fontSize: 17,
  },
  icon: {
    width: 30,
    alignItems: 'center',
  },
});
