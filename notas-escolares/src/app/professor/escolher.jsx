import { Link, router, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../service/UserContext';
import { getAll } from '../../service/api/api';

export default function EscolherProf() {
    const [profs, setProfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    const handleSelect = (prof) => {
        setUser({ tipo: 'professor', nome: prof.nome });
        router.push('/professor');
    };

    useEffect(() => {
        const fetchProfs = async () => {
            try {
                const prof = await getAll('professor');

                console.log(prof);
                setProfs(prof);

            } catch (error) {
                console.error("Erro ao listar professores: ", error.message);
                console.error("Detalhes: ", error.config);
            } finally {
                setLoading(false);
            }
        }

        fetchProfs();

    }, []);

    if (loading) {
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!loading && profs.length === 0) {
        return (
            <View>
                <Text>Nenhum professor encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>ENTRAR COMO PROFESSOR</Text>
            <Link href={"/"}>VOLTAR</Link>
            <FlatList 
                data={profs}
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
