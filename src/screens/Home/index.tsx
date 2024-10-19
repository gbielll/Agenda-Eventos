import { useState } from 'react';
import { Text, Image, TextInput, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { style } from './styles';
import { Participant } from '../../components/Participant';

/* 
Sem o 'default', eu posso retornar várias funções nesse arquivo e chamá-las por forma nomeada {name, name}.
Sem o 'default', ajuda a obrigar a ter que passar com o nome da função {nome}.
*/

export function Home() {
    // Defino a tipagem falando que é um array de strings. Quando ele for vazio, devo informar.
    // Se tiver valor, ele verifica.
    const [participantes, setParticipantes] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        // Esse includes valida se há valor dentro do array.
        if (participantes.includes(participantName)) {
            return Alert.alert("Participante já existe");
        }
        //validar se há campo vazio
        //esse trim anula espaços em branco
        if (participantName.trim() === '') {
            return Alert.alert("Erro", "O nome do participante não pode estar vazio.");
        }

        // Comando push adicionaria 'Ana'.
        // participantes.push('Ana');
        // Dessa forma, com o prevState, ele não sobrepõe.
        // Aciono o novo participante.
        setParticipantes(prevState => [...prevState, participantName]);
        setParticipantName(''); // Limpa o input após adicionar.
    }

    function handleParticipantRemove(name: string) {
        // Confirmação para remover o participante.
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                //eu acesso o array de participantes, faço o PrevState para nao sobrepor
                //faço um filtro para retornar todos menos o que nao quero e rortona atualizado para a lista
                onPress: () => setParticipantes(prevState => prevState.filter(participantes => participantes !== name))
            },
            {
                text: 'Não',
                style: 'cancel', // Serve para informar o tipo de botão.
            },
        ]);
        console.log(`Você clicou para remover o participante ${name}`);
    }

    return (
        <View style={style.container}>
            <Text style={style.eventName}>
                Nome do evento
            </Text>
            <Text style={style.eventDate}>
                Sexta, 18 de Novembro de 2024.
            </Text>

            <View style={style.form}>
                <TextInput
                    style={style.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    value={participantName} // Adiciona o valor para controlar o estado do input. ele que manipula o valor visível no text input
                    // Essa propriedade dispara toda vez que o componente do input muda.
                    // Esse "text" (pode ser outro nome) recebe o texto atual.
                    onChangeText={text => setParticipantName(text)}
                />

                <TouchableOpacity style={style.button} onPress={handleParticipantAdd}>
                    <Text style={style.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participantes} // Corrigido de "date" para "data".
                keyExtractor={item => item} // "Item" é o nome do participante, serve como chave única, como só tem string, passo assim. Mas se tivesse mais dados, poderia colocar item.id (ou outro).
                renderItem={({ item }) => (
                    /* Retorna o JSX corretamente */
                    <Participant
                        key={item} // Não pode ter chaves id iguais, mas aqui estamos usando nomes como chave.
                        name={item}
                        onRemove={() => handleParticipantRemove(item)} // Corrigido para "item".
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => ( // Usado caso a lista de data for vazia, ele renderiza isso.
                    <View style={style.listEmptyContainer}>
                        <Text style={style.listEmptyText}>
                            Adicione participantes à sua lista de presença.
                        </Text>
                        <Image
                            source={require('../../../assets/noAlert.png')} // Caminho relativo à sua pasta de assets.
                            style={style.emptyImage} // Defina estilos para a imagem.
                        />
                    </View>
                )}
            />

            {/* 
<ScrollView showsVerticalScrollIndicator={false}>
    {
        participantes.map(participant => (
            // Se a função tem parâmetros, é necessário usar a arrow function para chamá-la.
            <Participant
                key={participant} // Não pode ter chaves id iguais - mas aqui estamos usando nomes.
                name={participant}
                onRemove={() => handleParticipantRemove(participant)} />
        ))
    }
</ScrollView>
*/}
        </View>
    );
}
