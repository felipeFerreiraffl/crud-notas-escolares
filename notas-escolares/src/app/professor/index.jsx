import { Link, router } from 'expo-router';
import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../service/UserContext';

export default function TelaProfessor() {
    const { user } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text>TELA INICIAL DE PROFESSOR</Text>
            <Text>Bem vindo, {user.nome.split(' ')[0]}</Text>
            <Button title='INFOS' onPress={() => alert("INFOS")} />
            <Button title='NOTAS' onPress={() => router.push('/professor/notas')} />
            <Button title='SOBRE' onPress={() => router.push('/sobre')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
