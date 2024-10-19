import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"

type Props ={
    name: string;
    onRemove: ()=>void; 
}
//faço a desestruturação e defino o tipo
//para passar função, mando o nome dela e defino o tipo dela com tipo vazio
//essa função ta la no outro arquivo e mando ela pra ca pra ser disparada aqui, por isso ta como void na tipagem
export function Participant({name, onRemove}:Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>

            {/*ja consigo chamar a função*/}

            <TouchableOpacity style={styles.button} onPress={onRemove}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </View>
    )
}