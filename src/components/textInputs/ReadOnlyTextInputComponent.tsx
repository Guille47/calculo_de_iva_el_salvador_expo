import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;
  placeHolder: string;
}

export const ReadOnlyTextInputComponent = ({ value, placeHolder }: Props) => {
  return (
    <TextInput
      value={value}
      style={styles.textInput}
      placeholder="0.00"
      editable={false}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 7,
    fontSize: 18,
    color: "#B3B3B3",
  },
});
