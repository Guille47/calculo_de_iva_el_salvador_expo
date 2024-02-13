import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface PropsI {
  value: string;
}

export const ErrorLabelComponent = ({value}: PropsI) => {
  return <Text style={styles.smallText}>{value}</Text>;
};

const styles = StyleSheet.create({
  smallText: {
    fontSize: 12,
    color: 'red',
  },
});
