import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import { ntColors } from '../../styles/colors/colors';
import { images } from './../../assets/images/assets';

export default function ScreenButton({ backgroundColor, screenName, imageKey }) {
    return (
        <TouchableOpacity style={[styles.buttonContent, {backgroundColor}]}>
            <Text style={styles.text}>{screenName}</Text>
            <Image 
                style={styles.image}
                source={images[imageKey]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContent: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 298,
        height: 63,
        borderRadius: 5,
    },
    text: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize16,
        color: ntColors.ntWhite,
        marginEnd: 129,
    },
    image: {
        position: 'absolute',
        width: 118,
        height: 63,
        top: 0,
        right: 0,
    },
});