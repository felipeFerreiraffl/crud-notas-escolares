import { Link, router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import { useContext } from 'react';
import { UserContext } from '../../service/UserContext';

export default function sobre() {
  const { user } = useContext(UserContext);

  // Volta até a tela inicial do usuário baseado em seu tipo
  const handleBackToPage = () => {
    if (user.tipo === 'professor') {
      router.push('/professor');
    } else if (user.tipo === 'aluno') {
      router.push('/aluno');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToPage}
      >
        <Ionicons
          name='arrow-back-circle-outline'
          size={37}
          color={ntColors.ntBlack}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Sobre</Text>

      <View style={styles.explanationContent}>
        <Image
          style={styles.explanationLogo}
          source={require('../../assets/images/logo/logo-medium.png')}
        />
        <Text style={styles.explanationText}>Projeto simples com CRUD utilizando notas de alunos de um escola</Text>
      </View>

      <View style={styles.contacts}>
        <Text style={styles.title}>Contatos</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconLink}
            onPress={() => router.push("https://github.com/felipeFerreiraffl")}
          >
            <Ionicons name='logo-github' size={50} color="black" />
            <Text style={styles.iconText}>Github</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconLink}
            onPress={() => router.push("https://www.instagram.com/felipe_ffl7")}
          >
            <Ionicons name='logo-instagram' size={50} color="black" />
            <Text style={styles.iconText}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconLink}
            onPress={() => router.push("https://www.linkedin.com/in/felipe-ferreira-959bb8271")}
          >
            <Ionicons name='logo-linkedin' size={50} color="black" />
            <Text style={styles.iconText}>Linkedin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        style={styles.illustration}
        source={require('../../assets/images/programmer.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: ntColors.ntWhitePage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 31,
  },
  title: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize24,
    color: ntColors.ntBlack,
  },
  explanationContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    backgroundColor: ntColors.ntBlueMain,
    borderRadius: 5,
    paddingTop: 13,
    paddingBottom: 13,
    paddingStart: 20,
    paddingEnd: 20,
    marginTop: 30,
  },
  explanationLogo: {
    width: 90,
    height: 90,
  },
  explanationText: {
    fontFamily: ntFonts.ntJakartaSansRegular,
    fontSize: ntFontSizes.ntSize13,
    color: ntColors.ntWhite,
    width: '50%',
    textAlign: 'center',
  },
  contacts: {
    alignItems: 'center',
    marginTop: 35,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 55,
    marginTop: 20,
    marginBottom: 205,
  },
  iconLink: {
    alignItems: 'center',
    gap: 10,
  },
  iconText: {
    fontFamily: ntFonts.ntJakartaSansBold,
    fontSize: ntFontSizes.ntSize12,
    color: ntColors.ntBlack,
  },
  illustration: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});