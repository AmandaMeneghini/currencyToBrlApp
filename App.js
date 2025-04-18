import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {PickerItem} from './src/components/Picker';
import {api} from './src/services/api';

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currencySelected, setCurrencySelected] = useState(null);
  const [currencyBValue, setCurrencyBValue] = useState('');

  const [currencyValue, setCurrencyValue] = useState(null);
  const [valueConverted, setValueConverted] = useState(0);

  useEffect(() => {
    async function loadCurrencies() {
      const response = await api.get('all');

      let arrayCurrencies = [];
      Object.keys(response.data).map(key => {
        arrayCurrencies.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setCurrencies(arrayCurrencies);
      setCurrencySelected(arrayCurrencies[0].key);
      setLoading(false);
    }

    loadCurrencies();
  }, []);

  async function conversor(){
    if(currencyBValue === 0 || currencyBValue === ''|| currencySelected === null){
      return;
    }

    const response = await api.get(`/all/${currencySelected}-BRL`)

    let result = (Number(response.data[currencySelected]?.ask) * parseFloat(currencyBValue));

    setValueConverted(`${result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`)
    setCurrencyValue(currencyBValue)
    Keyboard.dismiss();
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.currencyArea}>
        <Text style={styles.title}>Selecione sua moeda</Text>
        <PickerItem
          currencies={currencies}
          currencySelected={currencySelected}
          onChange={currency => {
            setCurrencySelected(currency);
          }}
        />
      </View>

      <View style={styles.valueArea}>
        <Text style={styles.title}>Digite um valor para converter em (R$)</Text>
        <TextInput
          placeholder="Ex: 1.50"
          style={styles.input}
          keyboardType="numeric"
          value={currencyBValue}
          onChange={event => setCurrencyBValue(event.nativeEvent.text)}
        />
      </View>

      <TouchableOpacity style={styles.buttonArea} onPress={conversor}>
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>

      {valueConverted !== 0 && (
        <View style={styles.resultArea}>
          <Text style={styles.resultText}>
            {currencyValue} {currencySelected}
          </Text>

          <Text style={styles.resultDescriptionText}>corresponde a</Text>

          <Text style={styles.resultText}>{valueConverted}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center',
  },
  currencyArea: {
    backgroundColor: '#F9F9F9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 1,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    paddingLeft: 5,
    paddingTop: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101215',
  },
  valueArea: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingTop: 8,
    paddingBottom: 8,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000',
  },
  buttonArea: {
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultArea: {
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  resultText: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
  },
  resultDescriptionText: {
    fontSize: 18,
    margin: 8,
    fontWeight: '500',
    color: '#000',
  },
});
