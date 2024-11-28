import { FlatList, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ntColors } from './../../styles/colors/colors';
import { ntFonts, ntFontSizes } from './../../styles/fonts/fonts';

export default function NotasTableProfessor({ dados, editable, onChangeText }) {
    const renderSectionHeader = ({ section: { title } }) => {
        return (
            <View style={styles.titleContent}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
    
    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <Text style={styles.firstHeaderColumn}>Aluno</Text>
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
                <Text style={styles.rowFirstColumn}>{item.aluno}</Text>
                {item.nota.map((valorNota, index) => (
                    <TextInput
                        key={`${item.id}-${index}`}
                        style={styles.cellItens}
                        value={valorNota != null ? valorNota.toString() : ''}
                        editable={editable}
                        keyboardType='numeric'
                        onChangeText={(text) =>
                            onChangeText?.(item.id, index, text)
                        }
                    />
                ))}
            </View>
        );
    }

    return (
        <SectionList
            sections={dados}
            keyExtractor={(item, index) => item.id?.toString() || `item-${index}`}
            renderSectionHeader={renderSectionHeader}
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
        marginTop: 21,
    },
    titleContent: {
        backgroundColor: ntColors.ntDarkGray,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderBottomColor: ntColors.ntBlack,
    },
    title: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize13,
        color: ntColors.ntWhite,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ntColors.ntBlueMain,
        paddingVertical: 16,
    },
    tableTitle: {
        backgroundColor: ntColors.ntDarkGray,
        width: 342,
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderBottomColor: ntColors.ntBlack,
    },
    titleCell: {
        fontFamily: ntFonts.ntJakartaSansBold,
        fontSize: ntFontSizes.ntSize13,
        color: ntColors.ntWhite,
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