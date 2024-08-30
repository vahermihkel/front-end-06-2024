import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Animated, Dimensions, Easing,  } from 'react-native';

export default function HomeScreen() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [left, setLeft] = useState(0);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const coinRef = useRef<any>(null);
  // styles.image.top = 400;

  // var coin = coinRef.current;
  //     if (coin !== null) {
  //       coin.style.top = "400";
  //     }

  useEffect(() => {
    Accelerometer.addListener(item => {
      setLeft(item.x *-100 + 150)
    })
    _subscribe();
    

    // setTimeout(function(){
    //   styles.image.top = 400;

    // }, 7000);

    return () => _unsubscribe();
  }, []);

  const changeCoinPixels = () => {
    styles.image.top = 400;
  }

  const animatedValue = useRef(new Animated.Value(0)).current;
        const [isTop, setIsTop] = useState(true);

        const startAnimation = (toValue: number) => {
            Animated.timing(animatedValue, {
                toValue,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => {
                setIsTop(!isTop);
            })
        }

        useEffect(() => {
            startAnimation(isTop ? 0.2 : 0); 
        }, [isTop]);

        const translateY = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get('window').height - 400],
            extrapolate: 'clamp'
        })

  return (
    <View style={styles.container}>
          <Animated.View style={[styles.square, { transform: [{ translateY }] }]}>
            <Image source={require("../../assets/coin.png")}
              style={styles.square}
            />
          </Animated.View>
      <Button
        onPress={changeCoinPixels}
        title="Muuda coini piksleid"
      />
      <Text style={styles.text}>1Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>9</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity> */}

  

        <Image source={require("../../assets/road.gif")} style={{width: "100%", height: "30%"}}/>
        {/* <Image source={require("../../assets/car.png")} style={{width: 70, height: 50}}/> */}
        <Image source={require("../../assets/car.png")}
            style={{width: 70, height: 50, flex: 1, position: "absolute", top: 400, left: left}}
        />
        
      {/* </View> */}
    </View>
  );
}

function getImageStyles(): StyleProp<ImageStyle> {
  return {
    width: 20, 
    height: 20, 
    flex: 1, 
    position: "absolute", 
    top: 310, 
    left: "50%"
  }
}

const styles = StyleSheet.create({
  containerSquare: {
    flex: 1,
    alignItems: 'center'
  },
  square: {
      width: 20,
      height: 20,
      position: "absolute", 
      left: "50%",
      zIndex: 2
  },
  image: {
    top: 300, 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});