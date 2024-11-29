import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';

export default function ModalCreate({ user, field1, field2, field3, field4, value, onPress1, onPress2 }) {
    return (
        <View style={styles.modal}>
            <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Criar {user}</Text>
            </View>
            <View style={styles.modalFields}>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field1}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={value}
                    />
                </View>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field2}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={value}
                    />
                </View>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field3}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={value}
                    />
                </View>
                <View style={styles.modalField}>
                    <Text style={styles.modalLabel}>{field4}</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={value}
                    />
                </View>
            </View>
            <View style={styles.modalButtons}>
                <TouchableOpacity onPress={onPress1}>
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