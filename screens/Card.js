import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";
import COLORS  from '../constants/colors';



const Card = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const navigation = useNavigation(); 
    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = () => {
        console.log('Número:', numero);
        console.log('Nome:', nome);
        console.log('Validade:', validade);
        console.log('CVV:', cvv);
        // Você pode adicionar aqui a lógica para enviar os dados do cartão para o backend, por exemplo.
    };

    const formatarNumeroCartao = (numero) => {        
        const numerosApenas = numero.replace(/[^\d]/g, ""); 
        const numeroFormatado = numerosApenas.replace(/(\d{4})/g, '$1 ').trim();
        return numeroFormatado;
    }        
    const numeroCartao = "1234567890123456";
    const numeroFormatado = formatarNumeroCartao(numeroCartao);
    console.log(numeroFormatado);

    
      const handleCvvChange = (input) => {
        const formattedCvv = formatCvv(input);
        setCvv(formattedCvv);
      };

    return (  
        <ImageBackground
            source={require('../assets/background.png')}
            style={{
                flex: 1,                
                justifyContent: 'center',                
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1 }}>            
                <View style={styles.menuBar}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Painel')}>
                        <Icon name="bars" size={24} color="black" />
                        <Text style={styles.buttonText}>Painel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Perfil')}>
                        <Icon name="user" size={24} color="black" />
                        <Text style={styles.buttonText}>Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Cartão')}>
                        <Icon name="credit-card" size={24} color="blue" />
                        <Text style={styles.buttonText}>Cartão</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Veículo')}>
                        <Icon name="car" size={24} color="black" />
                        <Text style={styles.buttonText}>Veículo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Tickets')}>
                        <Icon name="ticket" size={24} color="black" />
                        <Text style={styles.buttonText}>Tíckets</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                <Image
                    source={require('../assets/card.png')}
                    style={{ width: 300, height: 300, marginLeft: 50, marginTop: 0 }}
                />


        <View style={styles.container}>
            <Text style={styles.title}>Cadastro do Cartão</Text>
            <TextInput
                style={styles.input}
                placeholder="Número do Cartão *"
                value={formatarNumeroCartao(numero)}
                onChangeText={(text) => setNumero(formatarNumeroCartao(text))}
                keyboardType="numeric"
                maxLength={19}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do Titular *"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Validade (MM/YY) *"
                keyboardType="numeric" // Isso garante que apenas números sejam inseridos
                maxLength={5} // Limita o número máximo de caracteres para 5
                value={validade}
                onChangeText={text => {
                // Aplicar a máscara MM/YY
                if (text.length <= 5) {
                    // Permite até 5 caracteres (MM/YY)
                    let formattedText = text.replace(/\D/g, '').substring(0, 4);
                    if (formattedText.length > 2) {
                    // Insere a barra (/) após os primeiros 2 caracteres (MM)
                    formattedText = formattedText.replace(/(\d{2})(\d)/, '$1/$2');
                    }
                    setValidade(formattedText);
                }
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV *"
                secureTextEntry={!isPasswordShown}
                value={cvv}                                
                onChangeText={text => {                    
                    if (text.length <= 3) {
                        const formattedText = text.replace(/[^0-9]/g, '');                        
                        setCvv(formattedText);
                    }
                    
                }}
                keyboardType="numeric"
            />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonSend}>Cadastrar</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>               
        </SafeAreaView>
        </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0,
    },
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingVertical: 10,
    },
    menuButton: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#191970',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 12,
        
    },

    buttonSend: {
        fontSize: 16,
        color: 'white',
    },
});

export default Card;
