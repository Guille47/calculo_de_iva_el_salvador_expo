import {useState, useCallback} from 'react';

const NumerosALetras = (num: number) => {
  if (num === 0) {
    return 'CERO';
  }

  const unidades = [
    '',
    'UNO',
    'DOS',
    'TRES',
    'CUATRO',
    'CINCO',
    'SEIS',
    'SIETE',
    'OCHO',
    'NUEVE',
  ];
  const especiales = [
    'DIEZ',
    'ONCE',
    'DOCE',
    'TRECE',
    'CATORCE',
    'QUINCE',
    'DIECISÉIS',
    'DIECISIETE',
    'DIECIOCHO',
    'DIECINUEVE',
  ];
  const decenas = [
    '',
    '',
    'VEINTE',
    'TREINTA',
    'CUARENTA',
    'CINCUENTA',
    'SESENTA',
    'SETENTA',
    'OCHENTA',
    'NOVENTA',
  ];
  const centenas = [
    '',
    'CIENTO',
    'DOSCIENTOS',
    'TRESCIENTOS',
    'CUATROCIENTOS',
    'QUINIENTOS',
    'SEISCIENTOS',
    'SETECIENTOS',
    'OCHOCIENTOS',
    'NOVECIENTOS',
  ];

  const getCentenas = (n: number) => {
    if (n === 100) {
      return 'CIEN';
    } else {
      return (
        centenas[Math.floor(n / 100)] +
        (n % 100 > 0 ? ' ' + getDecenas(n % 100) : '')
      );
    }
  };

  const getDecenas = (n: number) => {
    if (n < 10) {
      return unidades[n];
    } else if (n < 20) {
      return especiales[n - 10];
    } else {
      return (
        decenas[Math.floor(n / 10)] +
        (n % 10 > 0 ? ' Y ' + unidades[n % 10] : '')
      );
    }
  };

  const getMiles = (n: number) => {
    if (n === 1000) {
      return 'MIL';
    } else if (n < 2000) {
      return 'MIL ' + getCentenas(n % 1000);
    } else {
      return (
        getCentenas(Math.floor(n / 1000)) +
        ' MIL' +
        (n % 1000 > 0 ? ' ' + getCentenas(n % 1000) : '')
      );
    }
  };

  const getMillones = (n: number) => {
    if (n === 1000000) {
      return 'UN MILLÓN';
    } else if (n < 2000000) {
      return 'UN MILLÓN ' + getMiles(n % 1000000);
    } else {
      return (
        getCentenas(Math.floor(n / 1000000)) +
        ' MILLONES' +
        (n % 1000000 > 0 ? ' ' + getMiles(n % 1000000) : '')
      );
    }
  };

  if (num < 1000) {
    return getCentenas(num).toUpperCase();
  } else if (num < 1000000) {
    return getMiles(num).toUpperCase();
  } else {
    return getMillones(num).toUpperCase();
  }
};

const useNumberToWords = () => {
  const [numberInWords, setNumberInWords] = useState('');

  const convertToWords = useCallback((number: string) => {
    try {
      const [numero, decimal] = number.split('.');
      const words = NumerosALetras(Number(numero));
      if (decimal) {
        setNumberInWords(`${words} ${decimal}/100 DÓLARES`);
      } else {
        setNumberInWords(`${words} 00/100 DÓLARES`);
      }
    } catch (error) {
      console.error('Error al convertir el número:', error);
      setNumberInWords('');
    }
  }, []);

  return {numberInWords, convertToWords};
};

export default useNumberToWords;
