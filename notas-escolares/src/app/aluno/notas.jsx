import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SituationCard from '../../components/SituationCard';
import SituationIndicator from '../../components/SituationIndicator';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import NotasTableAluno from './../../components/NotasTableAluno/index';
import { UserContext } from './../../service/UserContext';
import { getNotaByAluno, updateObj } from './../../service/api/api';
import { router } from 'expo-router';

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
          media: nota.media.toFixed(2),
        }));

        console.log(formattedNotas);

        setNotas(formattedNotas);

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
  };

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

      <Text style={styles.title}>Notas</Text>
      
      <NotasTableAluno
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
        <View style={styles.situationIndicatorContainer}>
          <SituationIndicator
            color={ntColors.ntGreenApv}
            text={"Aprovado"}
          />
          <SituationIndicator
            color={ntColors.ntYellowRec}
            text={"Recuperação"}
          />
          <SituationIndicator
            color={ntColors.ntRedRep}
            text={"Reprovado"}
          />
        </View>
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 31,
  },
  situationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize24,
    color: ntColors.ntBlack,
    marginTop: 84,
  },
  situationList: {
    maxHeight: 159,
    marginTop: 25,
  },
  situationIndicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
    marginTop: 22,
  },
});