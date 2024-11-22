import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ntFonts, ntFontSizes } from '../styles/fonts/fonts';
import { ntColors } from '../styles/colors/colors';

export default function EntrarButton({ image, color1, color2, color3, text }) {
    return (
        <LinearGradient
            style={styles.background}
            colors={[color1, color2, color3]}
        >
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
                <Image source={require({ image })} />
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        width: 298,
        height: 85,
        borderRadius: 5,
    },
    button: {
        width: '100%',
        height: '100%',
    },
    buttonText: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize20,
        color: ntColors.ntWhite,
    },
});