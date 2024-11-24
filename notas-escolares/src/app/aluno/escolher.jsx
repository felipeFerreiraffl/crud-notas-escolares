import { Link, router, useRouter } from 'expo-router';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAll } from './../../service/api/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../service/UserContext';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import { ntColors } from '../../styles/colors/colors';
import { Ionicons } from '@expo/vector-icons';
import NameCard from '../../components/NameCard/index';

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
            <View style={styles.container}>
                <ActivityIndicator size="large" color={ntColors.ntBlueMain} />
            </View>
        );
    }

    if (!loading && alunos.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Nenhum aluno encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContent}>
                <Image
                    style={styles.titleImage}
                    source={require('../../assets/images/logo/logo-large.png')}
                />
                <Text style={styles.title}>CRUD com notas escolares</Text>
            </View>
            <View style={styles.listContent}>
                <Text style={styles.listTitle}>Selecione seu nome, aluno</Text>
                <View style={styles.listButtonsContent}>
                    <TouchableOpacity>
                        <Ionicons name='add-circle-outline' size={28} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='close-circle-outline' size={28} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listNomes}
                    data={alunos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NameCard name={item.nome} onPress={() => handleSelect(item)} />
                    )}
                />
            </View>
            <Text style={styles.credits}>Feito por Felipe Ferreira</Text>
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
    titleContent: {
        flex: 2,
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        backgroundColor: ntColors.ntBlueMain,
        paddingTop: 22,
        paddingBottom: 21,
        borderStartEndRadius: 15,
        borderEndEndRadius: 15,
    },
    titleImage: {
        width: 150,
        height: 150,
    },
    title: {
        fontFamily: ntFonts.ntQuicksandBold,
        fontSize: ntFontSizes.ntSize20,
        color: ntColors.ntWhite,
    },
    listContent: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
    },
    listTitle: {
        textAlign: 'center',
        fontFamily: ntFonts.ntQuicksandBold,
        fontSize: ntFontSizes.ntSize20,
        color: ntColors.ntBlack,
    },
    listButtonsContent: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 17,
        marginTop: 15,
    },
    credits: {
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize10,
        marginBottom: 15,
    },
});
