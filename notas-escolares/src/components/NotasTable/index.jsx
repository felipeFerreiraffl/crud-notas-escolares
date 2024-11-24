import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';

export default function NotasTable({ dados, coluna1, editable, onChangeText }) {
    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <Text style={styles.cellHeader}>{coluna1}</Text>
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
                <Text style={[styles.cellItens, styles.rowFirstColumn]}>
                    {coluna1 === 'Matéria' ? item.disciplina : item.aluno}
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
        padding: 10,
        backgroundColor: ntColors.ntWhite,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: ntColors.ntBlueMain,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: ntColors.ntBlack,
    },
    rowItens: {
        flexDirection: 'row',
        paddingVertical: 13,
        borderBottomWidth: 2,
        borderBottomColor: ntColors.ntBlack,
    },
    rowFirstColumn: {
        backgroundColor: ntColors.ntGray,
    },
    cellHeader: {
        flex: 1,
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize12,
    },
    cellItens: {
        flex: 1,
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize11,
    },
});