/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Fuck you buddy</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
import React, { useRef, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, PanResponder, Animated } from 'react-native';

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y } // Update the animated value on movement
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // Update the position state when the node is released
        setPosition({ x: position.x + pan.x._value, y: position.y + pan.y._value });
        pan.setValue({ x: 0, y: 0 }); // Reset the animated value for the next movement
      }
    })
  ).current;

  const translateStyle = pan.getTranslateTransform();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.node, translateStyle]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.text}>Move me around!</Text>
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  node: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
