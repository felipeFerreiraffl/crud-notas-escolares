import { StyleSheet, Text, View } from 'react-native';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import { ntColors } from '../../styles/colors/colors';

export default function SituationCard({ titulo, media, background }) {
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.text}>{titulo} - {media}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 298,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  text: {
    fontFamily: ntFonts.ntJakartaSansBold,
    fontSize: ntFontSizes.ntSize13,
    color: ntColors.ntBlack,
  },
});