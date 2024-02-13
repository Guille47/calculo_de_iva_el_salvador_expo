import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface Parameters {
  actionOnTextChange: (value: string) => void;
  valueForInput: string;
  placeHolder: string;
}

export function TextInputComponent({
  actionOnTextChange,
  valueForInput,
  placeHolder,
}: Parameters): React.JSX.Element {
  return (
    <TextInput
      value={valueForInput}
      style={styles.inlineTextInput}
      onChangeText={actionOnTextChange}
      keyboardType="numeric"
      placeholder={placeHolder}
    />
  );
}

const styles = StyleSheet.create({
  inlineTextInput: {
    padding: 10,
    flex: 9,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 7,
    fontSize: 18,
    color: "#B3B3B3",
  },
});
