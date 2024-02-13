import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import {useReadFromLocalStorage} from '../hooks/UseLocalStorage';
import useNumberToWords from '../hooks/UseNumberToWords';
import {useFocusEffect} from '@react-navigation/native';
import {PrimaryButton} from '../components/buttons/PrimaryButtonComponent';
import {TextInputComponent} from '../components/textInputs/TextInputComponent';
import {ReadOnlyTextInputComponent} from '../components/textInputs/ReadOnlyTextInputComponent';
import {ReadOnlyMultipleLinesTextInputComponent} from '../components/textInputs/ReadOnlyMultipleLinesTextInputComponent';
import {ErrorLabelComponent} from '../components/labels/ErrorLabelComponent';

interface valuesToCalculateI {
  key: number;
  value: string;
  isValidErrorText: string;
  isValueValid: Boolean;
}

export function CalculoDeIvaScreen(): React.JSX.Element {
  const [valuesToCalculate, setValuesToCalculate] = useState<
    valuesToCalculateI[]
  >([{key: Date.now(), value: '', isValidErrorText: '', isValueValid: false}]);

  const [ivaConfigValue, setIvaConfigValue] = useState(0.0);

  const {numberInWords, convertToWords} = useNumberToWords();

  const [iva, setIva] = useState('0.00');
  const [ivaWithValue, setIvaWithValue] = useState('0.00');

  const {
    storedValue,
    error: readError,
    fetchStorage,
  } = useReadFromLocalStorage('ValorIVA');

  const [topHalfHeight, setTopHalfHeight] = useState(0);
  const [bottomHalfHeight, setBottomHalfHeight] = useState(0);

  const [layout, setLayout] = useState({width: 0, height: 0, x: 0, y: 0});

  useFocusEffect(
    React.useCallback(() => {
      fetchStorage();
      // Código a ejecutar cuando la pantalla se enfoca
      if (storedValue) {
        setIvaConfigValue(storedValue);
      } else {
        if (readError) {
          Alert.alert('Error', readError);
        }
      }
      return () => {
        // Código a ejecutar cuando la pantalla se desenfoca
      };
    }, [storedValue, setIvaConfigValue, fetchStorage, readError]),
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setLayout({x, y, width, height});
  };

  const agregarCampo = () => {
    setValuesToCalculate([
      ...valuesToCalculate,
      {key: Date.now(), value: '', isValidErrorText: '', isValueValid: false},
    ]);
  };

  const removerCampo = (key: number) => {
    setValuesToCalculate(
      valuesToCalculate.filter(
        (input: valuesToCalculateI) => input.key !== key,
      ),
    );
  };

  useEffect(() => {
    const increaseFactor = layout.height;
    if (bottomHalfHeight < increaseFactor) {
      setBottomHalfHeight(increaseFactor);
    } else {
      const ventana = Dimensions.get('window');
      setBottomHalfHeight(ventana.height * 0.7);
    }
  }, [layout]);

  useEffect(() => {
    const ventana = Dimensions.get('window');
    setTopHalfHeight(ventana.height * 0.3);
    setBottomHalfHeight(ventana.height * 0.7);
  }, []);

  const actionOnTextChange = (key: number, value: string) => {
    const {result, errorText} = validateValue(value);
    setValuesToCalculate(
      valuesToCalculate.map((input: valuesToCalculateI) => {
        return input.key === key
          ? {key, value, isValidErrorText: errorText, isValueValid: result}
          : input;
      }),
    );
  };

  const calcularValor = () => {
    const areValuesValid = valuesToCalculate.some(
      (input: valuesToCalculateI) => input.isValueValid === false,
    );

    if (!areValuesValid) {
      const sumOfValues = valuesToCalculate.reduce(
        (acc, curr) => acc + (Number(curr.value) || 0),
        0,
      );
      const iva_ = Number(sumOfValues) * ivaConfigValue;
      const ivaWithValue_ = Number(sumOfValues) + iva_;
      setIva(iva_.toFixed(2));

      setIvaWithValue(ivaWithValue_.toFixed(2));
      convertToWords(ivaWithValue_.toFixed(2));
    } else {
      Alert.alert(
        'Error: ',
        'Es posible que haya un campo vacío, o con un valor erróneo, elimínelo y calcule de nuevo',
      );
    }
  };

  const validateValue = (value: string | undefined) => {
    let result = true;
    let errorText = '';
    if (value) {
      if (Number(value)) {
        const [numero, decimal] = Number(value).toFixed(2).split('.');
        if (
          Number(numero) >= 0.0 &&
          Number(decimal) >= 0.0 &&
          Number(decimal) < 100
        ) {
          result = true;
        } else {
          errorText =
            'El valor del campo debe ser superior a cero y los decimales entre cero y 99';
          result = false;
        }
      } else {
        errorText =
          'El valor del campo debe ser superior a cero y los decimales entre cero y 99';
        result = false;
      }
    } else {
      errorText = 'El campo no puede estar vacío';
      result = false;
    }
    return {result, errorText};
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={[styles.topHalf, {height: topHalfHeight}]} />
      <View style={[styles.bottomHalf, {height: bottomHalfHeight}]} />
      <View style={styles.floatView} onLayout={onLayout}>
        <View style={styles.viewInsideFloatView}>
          <Text style={styles.labelsText}>Valor o valores:</Text>
          <View>
            {valuesToCalculate.map(
              (input: valuesToCalculateI, index: number) => {
                return (
                  <View key={input.key}>
                    <View style={styles.valuePlusButton}>
                      <TextInputComponent
                        actionOnTextChange={(text: string) => {
                          actionOnTextChange(input.key, text);
                        }}
                        valueForInput={input.value}
                        placeHolder={`Valor ${index + 1}`}
                      />

                      {index === 0 && (
                        <PrimaryButton
                          actionToExecute={agregarCampo}
                          textToDisplay="+"
                        />
                      )}
                      {index > 0 && (
                        <PrimaryButton
                          actionToExecute={() => removerCampo(input.key)}
                          textToDisplay="-"
                        />
                      )}
                    </View>
                    {!input.isValueValid && (
                      <ErrorLabelComponent value={input.isValidErrorText} />
                    )}
                  </View>
                );
              },
            )}
          </View>
          <PrimaryButton
            actionToExecute={calcularValor}
            textToDisplay="Calcular"
          />
          <View style={styles.dottedLine} />
          <Text style={styles.labelsText}>IVA:</Text>
          <ReadOnlyTextInputComponent value={iva} placeHolder="0.00" />
          <Text style={styles.labelsText}>Valor + IVA:</Text>
          <ReadOnlyTextInputComponent value={ivaWithValue} placeHolder="0.00" />
          <Text style={styles.labelsText}>Valor + IVA en letras:</Text>
          <ReadOnlyMultipleLinesTextInputComponent
            value={numberInWords}
            lines={5}
            placeHolder=""
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topHalf: {
    backgroundColor: '#B4CF7A',
  },
  bottomHalf: {
    backgroundColor: '#ffffff',
  },
  floatView: {
    position: 'absolute',
    alignSelf: 'center',
    top: '0%',
    backgroundColor: '#ffffff',
    width: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 4,
  },
  viewInsideFloatView: {
    margin: '10%',
  },
  labelsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    margin: 4,
    marginTop: 10,
  },
  dottedLine: {
    width: '90%',
    height: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    margin: 15,
  },
  valuePlusButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
