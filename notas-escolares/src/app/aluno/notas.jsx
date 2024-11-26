import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from './../../service/UserContext';
import { getAll, getById, getNotaByAluno, updateObj } from './../../service/api/api';
import NotasTable from '../../components/NotasTable';
import { ntColors } from '../../styles/colors/colors';
import SituationCard from '../../components/SituationCard';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';

export default function NotasAluno() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await getNotaByAluno(user.id);
        const formattedNotas = response.map((nota) => ({
          id: nota.id,
          disciplina: nota.disciplina.nome,
          nota: nota.valoresNota || [null, null, null, null],
        }));

        console.log(formattedNotas);

        const notasComMedia = calcMedias(formattedNotas);
        setNotas(notasComMedia);

      } catch (error) {
        console.error("Erro ao buscar as notas do aluno: ", error);
        Alert.alert("Erro", "Não foi possível buscar as notas do aluno");

      } finally {
        setLoading(false);
      }
    }

    fetchNotas();

  }, []);

  const handleEditNota = async (notaId, index, newValor) => {
    try {
      const notaParaAtualizar = notas.find((n) => n.id === notaId);
      if (!notaParaAtualizar) {
        throw new Error("Nota não localizada");
      }

      const updatedNota = notas.map(((nota) =>
        nota.id === notaId
          ? { ...nota, notas: nota.notas.map((val, i) => (i === index ? parseFloat(newValor) : val)) }
          : nota
      ));
      setNotas(updatedNota);

      const updatedNotaObj = {
        id: notaId,
        valoresNota: updatedNota.find((n) => n.id === notaId).nota,
        disciplina: notaParaAtualizar.disciplina,
      }

      await updateObj(notaId, 'nota', updatedNotaObj);
      Alert.alert("Sucesso", "Nota atualizada com sucesso!");

    } catch (error) {
      console.error("Erro ao atualizar nota: ", error);
      Alert.alert("Erro", "Erro ao atualizar na nota");
    }
  };

  const calcMedias = (notas) => {
    return notas.map((nota) => {
      const soma = nota.nota.reduce((acc, val) => acc + (val || 0), 0); // Soma as notas
      const qtdNotas = nota.nota.filter((val) => val != null).length || 1; // Evita divisão por zero
      const media = soma / qtdNotas;

      return {
        ...nota,
        media: parseFloat(media.toFixed(2)), // Arredonda a média para duas casas decimais
      }
    });
  }

  const handleCardColor = (media) => {
    if (media >= 6.5) return ntColors.ntGreenApv; 
    if (media >= 5) return ntColors.ntYellowRec;
    return ntColors.ntRedRep; 
  }

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!loading && notas.length === 0) {
    return (
      <View>
        <Text>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>
      <NotasTable
        dados={notas}
        editable={user.tipo === 'professor'}
        onChangeText={user.tipo === 'professor' ? handleEditNota : null}
      />
      <View style={styles.situationContainer}>
        <Text style={styles.title}>Situação</Text>
        <FlatList 
          style={styles.situationList}
          data={notas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SituationCard 
              titulo={item.disciplina}
              media={item.media}
              background={handleCardColor(item.media)}
            />
          )}
        />
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
  situationContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize24,
    color: ntColors.ntBlack,
  },
  situationList: {
    maxHeight: 159,
  },
});