import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';

export default function NotasTableAluno({ dados, editable, onChangeText }) {
    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <Text style={styles.cellHeader}>Matéria</Text>
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
                <Text style={styles.cellItens}>
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
        // borderWidth: 2,
        // borderColor: ntColors.ntBlack,
        width: 342,
        height: 'auto',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: ntColors.ntBlueMain,
        paddingVertical: 16,
        alignItems: 'center',
    },
    rowItens: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: ntColors.ntWhite,
        paddingVertical: 6,
    },
    rowFirstColumn: {
        backgroundColor: ntColors.ntGray,
        
    },
    cellHeader: {
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize12,
        color: ntColors.ntWhite,
        alignItems: 'center',
    },
    cellItens: {
        textAlign: 'center',
        fontFamily: ntFonts.ntJakartaSansRegular,
        fontSize: ntFontSizes.ntSize11,
        alignItems: 'center',
    },
});