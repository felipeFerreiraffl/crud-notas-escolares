import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function TelaInicial() {
    return (
        <View style={styles.container}>
            <Text>Bem-vindo</Text>
            <Button
                title='Entrar como professor'
                onPress={() => router.push("/professor/escolher")}
            />
            <Button
                title='Entrar como aluno'
                onPress={() => router.push("/aluno/escolher")}
            />
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
