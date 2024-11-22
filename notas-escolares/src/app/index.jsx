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
                <LinearGradient
                    style={styles.buttonBackground}
                    colors={[ntColors.ntBlack, ntColors.ntDarkGray, ntColors.ntGray]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Entrar como professor</Text>
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/images/professor-img.png')}
                        />
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    style={styles.buttonBackground}
                    colors={[ntColors.ntBlack, ntColors.ntDarkGray, ntColors.ntGray]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Entrar como professor</Text>
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/images/professor-img.png')}
                        />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
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
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        backgroundColor: ntColors.ntBlueMain,
        paddingTop: 22,
        paddingBottom: 21,
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
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 57,
        marginTop: 45,
    },
    buttonBackground: {
        width: '100%',
        borderRadius: 5,
    },
    button: {
        position: 'relative',
        width: 298,
        height: 85,
        paddingStart: 29,
        paddingTop: 9,
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
        bottom: 0,
    },
});
