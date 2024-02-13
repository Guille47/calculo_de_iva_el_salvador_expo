import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;
  lines: number;
  placeHolder: string;
}

export const ReadOnlyMultipleLinesTextInputComponent = ({
  value,
  lines,
  placeHolder,
}: Props) => {
  return (
    <TextInput
      value={value}
      style={styles.textInputMultiline}
      multiline={true}
      numberOfLines={lines}
      placeholder={placeHolder}
      editable={false}
    />
  );
};

const styles = StyleSheet.create({
  textInputMultiline: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 7,
    fontSize: 18,
    color: "#B3B3B3",
    textAlignVertical: "top",
  },
});
