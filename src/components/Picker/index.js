import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export function PickerItem(props){

    let currencyItem = props.currencies.map((item, index) => {
        return <PickerItem value={item.key} key={index} label={item.key} />
    })

    return (
        <Picker
            selectedValue={props.currencySelected}
            onValueChange={(value) => {
                props.onChange(value)
            }}
        >
            {currencyItem}
        </Picker>
    )
}