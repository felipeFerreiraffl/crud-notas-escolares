import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function sobre() {
  return (
    <View style={styles.container}>
      <Text>SOBRE</Text>

      <Link href={"https://github.com/felipeFerreiraffl"}>
        <Ionicons name='logo-github' size={50} color="black" />
        <Text>Github</Text>
      </Link>

      <Link href={"https://www.instagram.com/felipe_ffl7"}>
        <Ionicons name='logo-instagram' size={50} color="black" />
        <Text>Instagram</Text>
      </Link>

      <Link href={"https://www.linkedin.com/in/felipe-ferreira-959bb8271"}>
        <Ionicons name='logo-linkedin' size={50} color="black" />
        <Text>Linkedin</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});