import { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { PickerItem } from './src/components/Picker';
import { api } from './src/services/api'

export default function App() {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true);

  const [currencySelected, setCurrencySelected] = useState(null);

  useEffect(() => {
    async function loadCurrencies(){
      const response = await api.get("all");
      
      let arrayCurrencies = [];
      Object.keys(response.data).map((key) => {
        arrayCurrencies.push({
          key: key,
          label: key,
          value: key,
        })
      })

      setCurrencies(arrayCurrencies);
      setCurrencySelected(arrayCurrencies[0].key);
      setLoading(false);
      
    }

    loadCurrencies();
  }, [])

  if(loading){
    return(
      <View style={styles.loading}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.currencyArea}>
        <Text style={styles.title}>Selecione sua moeda</Text>
        <PickerItem 
          currencies={currencies}
          currencySelected={currencySelected}
          onChange={(currency) => {
            setCurrencySelected(currency);
          }}
        />
      </View>
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
  currencyArea:{
    backgroundColor: '#F9F9F9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8
  },
  title: {
    fontSize:  16,
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
  }
});
