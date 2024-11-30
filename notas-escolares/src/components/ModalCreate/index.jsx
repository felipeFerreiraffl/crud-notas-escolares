import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';
import { useContext, useState } from 'react';
import { UserContext } from '../../service/UserContext';

export default function ModalCreate({ usuario, field1, field2, field3, field4, onPress1, onPress2 }) {
    const [nome, setNome] = useState('');
    const [dtNascimento, setDtNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [turma, setTurma] = useState('');
    const [areaEnsino, setAreaEnsino] = useState('');
    const { user } = useContext(UserContext);
    
    return (
        <View style={styles.modal}>
            <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Criar {usuario}</Text>
            </View>
            <View style={styles.modalFields}>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field1}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field2}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={dtNascimento}
                        onChangeText={setDtNascimento}
                    />
                </View>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field3}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field4}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={turma || areaEnsino}
                        onChangeText={setTurma || setAreaEnsino}
                    />
                </View>
            </View>
            <View style={styles.modalButtons}>
                <TouchableOpacity 
                onPress={user.tipo === 'aluno' ? 
                    () => onPress1({ nome, dtNascimento, cpf, turma})
                    :
                    () => onPress1({ nome, dtNascimento, cpf, areaEnsino })
                }
                >
                    <Ionicons
                        name='checkmark-circle-outline'
                        size={27}
                        color={ntColors.ntBlack}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress2}>
                    <Ionicons
                        name='close-circle-outline'
                        size={27}
                        color={ntColors.ntBlack}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: 298,
        backgroundColor: ntColors.ntWhitePage,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '50%',
    },
    modalTitleContainer: {
        backgroundColor: ntColors.ntBlueMain,
        paddingTop: 15,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    modalTitle: {
        fontFamily: ntFonts.ntQuicksandBold,
        fontSize: ntFontSizes.ntSize15,
        color: ntColors.ntWhite,
    },
    modalFields: {
        alignItems: 'center',
        marginTop: 13,
        gap: 5,
    },
    modalField: {
        alignItems: 'flex-start',
        gap: 5,
    },
    modalLabel: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize13,
        color: ntColors.ntBlack,
    },
    modalInput: {
        width: 237,
        borderWidth: 1,
        borderColor: ntColors.ntBlueMain,
        borderRadius: 2,
        paddingStart: 15,
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize11,
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 17,
        gap: 64,
        marginBottom: 16,
    },
});