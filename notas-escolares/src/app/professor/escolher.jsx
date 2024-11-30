import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NameCard from '../../components/NameCard/index';
import { UserContext } from '../../service/UserContext';
import { createObj, deleteObj, getAll } from '../../service/api/api';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import ModalCreate from '../../components/ModalCreate';

export default function EscolherProf() {
    const [profs, setProfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();
    const { setUser } = useContext(UserContext);

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
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name='add-circle-outline' size={28} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='close-circle-outline' size={28} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listNomes}
                    data={profs}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NameCard name={item.nome} onPress={() => handleSelect(item)} />
                    )}
                />
            </View>
            <Text style={styles.credits}>Feito por Felipe Ferreira</Text>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <ModalCreate 
                        user={"aluno"}
                        field1={"Nome"}
                        field2={"Data de nascimento"}
                        field3={"CPF"}
                        field4={"Área de ensino"}
                        onPress2={() => setModalVisible(false)}
                    />
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
