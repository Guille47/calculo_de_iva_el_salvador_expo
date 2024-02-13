import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface PropsI {
  actionToExecute: () => void;
  textToDisplay: string;
}

export const PrimaryButton = ({actionToExecute, textToDisplay}: PropsI) => {
  return (
    <TouchableOpacity
      style={styles.inlineSquaredButton}
      onPress={() => actionToExecute()}>
      <Text style={styles.textInsideButton}>{textToDisplay}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inlineSquaredButton: {
    flex: 1,
    margin: 5,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  textInsideButton: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
});
