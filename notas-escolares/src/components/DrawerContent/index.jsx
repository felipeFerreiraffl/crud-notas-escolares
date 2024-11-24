import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';
import { router } from 'expo-router';

const screenWidth = Dimensions.get("window").width;

// Drawer manual e personalizado para as telas iniciais de aluno e professor
export default function DrawerContent({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnimation = useRef(new Animated.Value(-screenWidth)).current;

    // Função que ativa o drawer ou não
    const toggleDrawer = () => {
        if (drawerOpen) {
            // Fecha o drawer (false)
            Animated.timing(drawerAnimation, {
                toValue: -screenWidth,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setDrawerOpen(false));
        } else {
            // Abre o drawer (true)
            Animated.timing(drawerAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setDrawerOpen(true));
        }
    };

    // Fecha o drawer ao clicar em algum lugar não funcional da tela
    const handleOutsideClick = () => {
        if (drawerOpen) {
            toggleDrawer();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.drawerContainer,
                        { transform: [{ translateX: drawerAnimation }] }
                    ]}
                >
                    <View style={styles.drawerContent}>
                        <View style={styles.headerContainer}>
                            <Image
                                style={styles.headerImage}
                                source={require('../../assets/images/logo/logo-small.png')}
                            />
                            <Text style={styles.headerTitle}>Notas escolares</Text>
                        </View>

                        <TouchableOpacity style={styles.exitButton} onPress={() => router.push('/')}>
                            <Text style={styles.exitButtonText}>Sair</Text>
                        </TouchableOpacity>

                        <Text style={styles.credits}>Feito por Felipe Ferreira Lima</Text>
                    </View>
                </Animated.View>

                <View style={styles.mainContent}>
                    <TouchableOpacity
                        style={styles.hamburger}
                        onPress={toggleDrawer}
                    >
                        <Ionicons name='menu-outline' size={30} color={ntColors.ntBlack} />
                    </TouchableOpacity>
                    {children}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: screenWidth * 0.8,
        zIndex: 1,
    },
    drawerContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ntColors.ntBlueDark
    },
    headerContainer: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    headerImage: {
        width: 30,
        height: 30,
    },
    headerTitle: {
        fontFamily: ntFonts.ntQuicksandBold,
        fontSize: ntFontSizes.ntSize16,
        color: ntColors.ntWhite,
    },
    exitButton: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingStart: 40,
        paddingEnd: 40,
        backgroundColor: ntColors.ntRedRep,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 85,
    },
    exitButtonText: {
        fontFamily: ntFonts.ntQuicksandBold,
        fontSize: ntFontSizes.ntSize10,
        color: ntColors.ntWhite,
    },
    credits: {
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize10,
        color: ntColors.ntWhite,
        marginTop: 443,
        marginBottom: 30,
    },
    mainContent: {
        flex: 1,
        backgroundColor: ntColors.ntBlueMain,
        zIndex: 0,
    },
    hamburger: {
        position: 'absolute',
        top: 16,
        left: 31,
        zIndex: 2,
    },
});