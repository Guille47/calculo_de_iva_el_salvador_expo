import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import { ErrorLabelComponent } from "../components/labels/ErrorLabelComponent";
import { TextInputComponent } from "../components/textInputs/TextInputComponent";
import {
  useReadFromLocalStorage,
  useSaveToLocalStorage,
} from "../hooks/UseLocalStorage";

export function ConfiguracionesScreen(): React.JSX.Element {
  const [settingIVAValue, setSettingIVAValue] = useState("");
  const [isValueValid, setIsValueValid] = useState(true);
  const [isValidErrorText, setIsValidErrorText] = useState("");

  const [topHalfHeight, setTopHalfHeight] = useState(0);
  const [bottomHalfHeight, setBottomHalfHeight] = useState(0);

  const [layout, setLayout] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLayout({ x, y, width, height });
  };

  useEffect(() => {
    const increaseFactor = layout.height;
    if (bottomHalfHeight < increaseFactor) {
      setBottomHalfHeight(increaseFactor);
    } else {
      const ventana = Dimensions.get("window");
      setBottomHalfHeight(ventana.height * 0.8);
    }
  }, [layout]);

  useEffect(() => {
    const ventana = Dimensions.get("window");
    setTopHalfHeight(ventana.height * 0.2);
    setBottomHalfHeight(ventana.height * 0.8);
  }, []);

  const {
    storedValue,
    error: readError,
    fetchStorage,
  } = useReadFromLocalStorage("ValorIVA");
  const { saveToStorage, error: writeError } = useSaveToLocalStorage();

  useEffect(() => {
    fetchStorage();
    if (storedValue) {
      setSettingIVAValue(storedValue);
    } else {
      if (readError) {
        Alert.alert("Error", readError);
      }
    }
  }, [storedValue, readError]);

  useEffect(() => {
    if (writeError) {
      Alert.alert("Error", writeError);
    }
  }, [writeError]);

  const actionOnTextChange = (value: string) => {
    validateValue(value);
    setSettingIVAValue(value);
  };

  const saveToLocalStorage = () => {
    if (isValueValid) {
      saveToStorage("ValorIVA", settingIVAValue);
      if (!writeError) {
        Alert.alert("Mensaje:", "El valor se ha guardado");
      }
    }
  };

  const validateValue = (value: string | undefined) => {
    let result = true;
    if (value) {
      if (Number(value) >= 0.0) {
        setIsValueValid(true);
      } else {
        setIsValueValid(false);
        setIsValidErrorText("El valor del campo debe ser mayor a 0.00");
        result = false;
      }
    } else {
      setIsValueValid(false);
      setIsValidErrorText("El campo no puede estar vacío");
      result = false;
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topHalf, { height: topHalfHeight }]} />
      <View style={[styles.bottomHalf, { height: bottomHalfHeight }]} />
      <View style={styles.floatView} onLayout={onLayout}>
        <View style={styles.viewInsideFloatView}>
          <Text style={styles.labelsText}>Valor porcentual del IVA:</Text>

          <TextInputComponent
            actionOnTextChange={(text: string) => {
              actionOnTextChange(text);
            }}
            valueForInput={settingIVAValue}
            placeHolder={"0.00"}
          />

          {!isValueValid && <ErrorLabelComponent value={isValidErrorText} />}

          <TouchableOpacity
            style={styles.button}
            onPress={() => saveToLocalStorage()}
          >
            <Text style={styles.textInsideButton}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    backgroundColor: "#B4CF7A",
  },
  bottomHalf: {
    backgroundColor: "#ffffff",
  },
  floatView: {
    position: "absolute",
    alignSelf: "center",
    top: "2%",
    backgroundColor: "#ffffff",
    width: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 4,
  },
  viewInsideFloatView: {
    margin: "10%",
  },
  labelsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    margin: 4,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 7,
    fontSize: 18,
    color: "#B3B3B3",
  },
  textInputMultiline: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 7,
    fontSize: 18,
    color: "#B3B3B3",
    textAlignVertical: "top",
  },
  dottedLine: {
    width: "90%",
    height: 1,
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderStyle: "dashed",
    margin: 15,
  },
  button: {
    margin: 15,
    borderWidth: 2,
    borderColor: "#000000", // Color azul típico de Bootstrap
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  textInsideButton: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
  },
});
