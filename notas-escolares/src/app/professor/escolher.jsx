import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NameCard from '../../components/NameCard/index';
import { UserContext } from '../../service/UserContext';
import { createObj, deleteObj, getAll } from '../../service/api/api';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';

export default function EscolherProf() {
    const [profs, setProfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const handleSelect = (prof) => {
        setUser({ tipo: 'professor', id: prof.id, nome: prof.nome });
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

    const createProf = async () => {
        try {
            const response = await createObj('professor');

        } catch (error) {
            console.error("Erro ao criar professor", error);
            Alert.alert("Erro", "Erro ao criar professor");
        }
    }

    const deleteProf = async (profId) => {
        try {
            const response = await deleteObj(profId, 'professor');

        } catch (error) {
            console.error("Erro ao criar professor", error);
            Alert.alert("Erro", "Erro ao criar professor");
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={ntColors.ntBlueMain} />
            </View>
        );
    }

    if (!loading && profs.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Nenhum professor encontrado.</Text>
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
                <Text style={styles.listTitle}>Selecione seu nome, professor</Text>
                <View style={styles.listButtonsContent}>
                    <TouchableOpacity
                        onPress={createProf}
                    >
                        <Ionicons name='add-circle-outline' size={28} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={deleteProf(user.id)}
                    >
                        <Ionicons name='close-circle-outline' size={28} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listNomes}
                    data={profs}
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
