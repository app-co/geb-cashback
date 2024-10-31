/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import {
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface I {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  behavior?: 'padding' | 'height' | 'position';
  keyboardVerticalOffset?: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function Keyboard({
  children,
  style,
  behavior,
  keyboardVerticalOffset,
}: I) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
