import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';

export default function AlunoWelcome({ name }) {
    return (
        <LinearGradient
            style={styles.container}
            colors={[ntColors.ntYellowRec, ntColors.ntRedRep]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
            <View style={styles.textContent}>
                <Text style={styles.textWelcome}>Bem vindo, {name}</Text>
                <Text style={styles.textExplanation}>Aqui você poderá ver as suas notas, além de outras informações</Text>
            </View>
            <Image
                style={styles.image}  
                source={require('../../assets/images/welcome-aluno.png')}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 298,
        height: 155,
        borderRadius: 5,
        gap: 18,
        paddingStart: 22,
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.4)',
        marginBottom: -30,
    },
    textContent: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        gap: 30,
    },
    textWelcome: {
        fontFamily: ntFonts.ntQuicksandBold,
        fontSize: ntFontSizes.ntSize13,
        color: ntColors.ntWhite,
    },
    textExplanation: {
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize12,
        color: ntColors.ntWhite,
    },
    image: {
        width: 144,
        height: 155,
    },
});