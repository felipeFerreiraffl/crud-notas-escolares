import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';

export default function NotasTableAluno({ dados, editable, onChangeText }) {
    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <Text style={styles.firstHeaderColumn}>Matéria</Text>
                <Text style={styles.cellHeader}>1º B</Text>
                <Text style={styles.cellHeader}>2º B</Text>
                <Text style={styles.cellHeader}>3º B</Text>
                <Text style={styles.cellHeader}>4º B</Text>
            </View>
        )
    }

    const renderRow = ({ item }) => {
        return (
            <View style={styles.rowItens}>
                <Text style={styles.rowFirstColumn}>
                    {item.disciplina}
                </Text>
                {item.nota.map((nota, index) => (
                    <TextInput
                        key={index}
                        style={styles.cellItens}
                        value={nota != null ? String(nota) : ''}
                        editable={editable}
                        keyboardType='numeric'
                        onChangeText={(text) =>
                            onChangeText && onChangeText(item.id, index, text)
                        }
                    />
                ))}
            </View>
        );
    }

    return (
        <FlatList
            data={dados}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={renderRow}
            contentContainerStyle={styles.table}
        />
    );
}

const styles = StyleSheet.create({
    table: {
        backgroundColor: ntColors.ntWhite,
        alignItems: 'stretch',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ntColors.ntBlueMain,
        paddingVertical: 16,
    },
    rowItens: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ntColors.ntWhite,
    },
    rowFirstColumn: {
        width: 98,
        backgroundColor: ntColors.ntGray,
        paddingVertical: 6,
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize11,
    },
    cellHeader: {
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize12,
        color: ntColors.ntWhite,
        width: 61,
    },
    firstHeaderColumn: {
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize12,
        color: ntColors.ntWhite,
        width: 98,
    },
    cellItens: {
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize11,
        paddingHorizontal: 22,
        width: 61,
    },
});