import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModalCreate from '../../components/ModalCreate';
import NameCard from '../../components/NameCard/index';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import { createObj, deleteObj, getAll } from './../../service/api/api';
import { UserContext } from './../../service/UserContext';

export default function EscolherAluno() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false); // Estado para deletar cards
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    // Seleciona e atribui informações do aluno, direcionando até a tela inicial
    const handleSelect = (aluno) => {
        setUser({
            tipo: 'aluno',
            id: aluno.id,
            nome: aluno.nome
        });
        router.push('/aluno');
    }

    // Renderiza os alunos existentes no banco
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await getAll('aluno');
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

    // Cria um usuário
    const handleCreateUser = async (userData) => {
        try {
            await createObj('aluno', userData);
            setModalVisible(false); // Fecha o modal após a criação
            refreshUserList();

        } catch (error) {
            console.error("Erro ao criar aluno: ", error.message);

        }   
    }

    // Atualiza a lista após deletar ou criar um usuário
    const refreshUserList = async () => {
        setLoading(true);

        try {
            const updatedList = await getAll('aluno');
            setAlunos(updatedList); // Atualiza o estado depois de atualizar a lista

        } catch (error) {
            console.error("Erro ao atualizar a lista: ", error.message);

        } finally {
            setLoading(false);
        }
    };

    // Deleta ao clicar no card
    const handleCardPress = async (user) => {
        if (deleteMode) {
            Alert.alert(
                'Confirmar exclusão',
                `Deseja excluir ${user.nome}`,
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Excluir',
                        onPress: async () => {
                            try {
                                await deleteObj(user.id, 'aluno');
                                refreshUserList();

                            } catch (error) {
                                console.error("Erro ao excluir alunos: ", error.message);
                                
                            }
                        },
                        style: 'destructive'
                    }
                ]
            );
        } else {
            handleSelect(user);
        }
    }

    // Carregando os componentes
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
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons
                            name='add-circle-outline'
                            size={28}
                            color={ntColors.ntBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDeleteMode(!deleteMode)}>
                        <Ionicons
                            name={deleteMode ? 'close-circle-outline' : 'trash-outline'}
                            size={28}
                            color={ntColors.ntBlack} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listNomes}
                    data={alunos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NameCard name={item.nome} onPress={() => handleCardPress(item)} />
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
                        usuario={"aluno"}
                        field1={"Nome"}
                        field2={"Data de nascimento"}
                        field3={"CPF"}
                        field4={"Turma"}
                        onPress1={(dados) => handleCreateUser(dados)}
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
