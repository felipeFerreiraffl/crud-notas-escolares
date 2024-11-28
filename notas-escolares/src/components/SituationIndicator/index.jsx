import { StyleSheet, Text, View } from 'react-native';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';
import { ntColors } from './../../styles/colors/colors';

export default function SituationIndicator({ color, text }) {
    return (
        <View style={styles.indicatorContainer}>
            <View style={[styles.indicatorColor, { backgroundColor: color }]}></View>
            <Text style={styles.indicatorText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorColor: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
    indicatorText: {
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize10,
        color: ntColors.ntBlack,
    },
});