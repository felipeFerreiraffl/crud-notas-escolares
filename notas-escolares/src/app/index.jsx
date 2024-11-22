import { router } from 'expo-router';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ntFonts, ntFontSizes } from '../styles/fonts/fonts';
import { ntColors } from './../styles/colors/colors';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

export default function TelaInicial() {
    // Carrega as fontes do app
    const [fontsLoaded] = useFonts({
        'Quicksand-Regular': require('../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
        'JakartaSans-Regular': require('../assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.ttf'),
        'JakartaSans-Bold': require('../assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContent}>
                <Image
                    style={styles.titleImage}
                    source={require('../assets/images/logo/logo-large.png')}
                />
                <Text style={styles.title}>CRUD com notas escolares</Text>
            </View>
            <View style={styles.buttonContent}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('professor/escolher')}
                >
                    <LinearGradient
                        style={styles.buttonBackground}
                        colors={[ntColors.ntBlueDark, ntColors.ntBlueSec, ntColors.ntGray]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Entrar como professor</Text>
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/images/professor-img.png')}
                        />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('aluno/escolher')}
                >
                    <LinearGradient
                        style={styles.buttonBackground}
                        colors={[ntColors.ntRedRep, ntColors.ntYellowRec, ntColors.ntBlueQua]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Entrar como aluno</Text>
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/images/aluno-img.png')}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Text style={styles.credits}>Feito por Felipe Ferreira</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ntColors.ntWhitePage,
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
    buttonContent: {
        flex: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 57,
        marginTop: 77,
    },
    buttonBackground: {
        borderRadius: 5,
        width: 298,
        height: 85,
        paddingStart: 29,
        paddingTop: 12,
    },
    button: {
        position: 'relative',
        width: '100%',
    },
    buttonText: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize20,
        color: ntColors.ntWhite,
        width: '50%',
        textAlign: 'center',
    },
    buttonImage: {
        position: 'absolute',
        width: 100,
        height: 117,
        left: 181,
        bottom: -8,
    },
    credits: {
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize10,
        marginBottom: 15,
    },
});
