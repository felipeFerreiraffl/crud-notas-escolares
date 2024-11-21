import { Link, router } from 'expo-router';
import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { UserContext } from './../../service/UserContext';

export default function TelaAluno() {
    const { user } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text>TELA INICIAL DE ALUNO</Text>
            <Text>Bem vindo, {user.nome.split(' ')[0]}</Text>
            <Button title='INFOS' onPress={() => router.push('aluno/infos')} />
            <Button title='NOTAS' onPress={() => router.push('aluno/notas')} />
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
