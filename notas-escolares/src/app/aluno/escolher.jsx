import { Link, router, useRouter } from 'expo-router';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAll } from './../../service/api/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../service/UserContext';

export default function EscolherAluno() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    const handleSelect = (aluno) => {
        setUser({ tipo: 'aluno', id: aluno.id, nome: aluno.nome });
        router.push('/aluno');
    }

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await getAll('aluno');
                console.log("Alunos: ", aluno);
                setAlunos(aluno);

            } catch (error) {
                console.error("Erro ao buscar alunos: ", error.message);
                console.error("Detalhes: ", error.config);
                
            } finally {
                setLoading(false);
            }
        }

        fetchAlunos();

    }, []);

    if (loading) {
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!loading && alunos.length === 0) {
        return (
            <View>
                <Text>Nenhum aluno encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>ESCOLHER ALUNO</Text>
            <Link href={"/"}>VOLTAR</Link>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item)}>
                        <Text>{item.nome}</Text>
                    </TouchableOpacity>
                )}
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
