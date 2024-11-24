import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';

export default function NameCard({ name, onPress }) {
    return (
        <TouchableOpacity style={styles.nameButton} onPress={onPress}>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    nameButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ntColors.ntBlueMain,
        width: 298,
        height: 41,
        borderRadius: 5,
        marginTop: 7,
    },
    name: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize13,
        color: ntColors.ntWhite,
    }
});