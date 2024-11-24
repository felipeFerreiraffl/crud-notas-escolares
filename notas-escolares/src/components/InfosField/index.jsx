import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';
import { ntColors } from './../../styles/colors/colors';

export default function InfosField({ title, info, editable, onChange, backgroundColor }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput 
                style={[styles.info, { backgroundColor }]}
                value={info}
                editable={editable}
                onChangeText={onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        gap: 5,
    },
    title: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize14,
        color: ntColors.ntBlack,
    },
    info: {
        width: 294,
        height: 35,
        borderWidth: 1,
        borderRadius: 2,
        color: ntColors.ntBlack,
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize10,
        paddingStart: 15,
        paddingVertical: 6,
    },
});