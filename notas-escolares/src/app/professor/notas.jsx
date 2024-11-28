import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import NotasTableProfessor from '../../components/NotasTableProfessor';
import { getDisciplinaByProfId, getNotaByDisciplina } from '../../service/api/api';
import { UserContext } from './../../service/UserContext';
import { ntColors } from '../../styles/colors/colors';
import SituationCard from '../../components/SituationCard';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';
import SituationIndicator from '../../components/SituationIndicator';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotasProfessor({ disciplinaId }) {
  const [notas, setNotas] = useState([]);
  const [disciplina, setDisciplina] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const disciplinas = await getDisciplinaByProfId(user.id);
        if (!disciplinas || disciplinas.length === 0) {
          throw new Error("Nenhuma disciplina encontrada para o professor");
        }

        const disciplinaAtual = disciplinas[0];

        const response = await getNotaByDisciplina(disciplinaAtual.id);
        console.log("Resposta da API ", response);

        if (!Array.isArray(response)) {
          throw new Error("Resposta inesperado da API");
        }

        const formattedNotas = response.map((nota) => ({
          id: nota.id,
          professorId: nota.disciplina.professor.id,
          professor: nota.disciplina.professor.nome,
          disciplinaId: nota.disciplina?.id,
          disciplina: nota.disciplina?.nome,
          aluno: nota.aluno?.nome || "Aluno não encontrado",
          nota: Array.isArray(nota.valoresNota) ? nota.valoresNota : [null, null, null, null],
          media: nota.media.toFixed(2),
        }));

        const sectionsData = [
          {
            title: disciplinaAtual.nome,
            data: formattedNotas,
          }
        ];

        setNotas(sectionsData);
        setDisciplina(disciplinaAtual.nome);

      } catch (error) {
        console.error("Erro ao buscar as notas da disciplina: ", error);
        Alert.alert("Erro", "Não foi possível buscar as notas");

      } finally {
        setLoading(false);
      }
    }

    fetchNotas();

  }, [user, disciplinaId]);

  const handleEditNota = async (notaId, index, newValor) => {
    try {
      const notaParaAtualizar = notas
        .flatMap(section => section.data)
        .find(nota => nota.id === notaId);

      if (!notaParaAtualizar) {
        throw new Error("Nota não localizada");
      }

      // Atualiza a nota no estado local
      const updatedNotas = notas.map((nota) =>
        nota.id === notaId
          ? {
            ...nota,
            nota: nota.nota.map((val, i) => (i === index ? parseFloat(newValor) : val)),
          }
          : nota
      );

      setNotas(updatedNotas);

      // Envia a atualização para o backend
      const updatedNotaObj = {
        id: notaId,
        valoresNota: updatedNotas.find((nota) => nota.id === notaId).nota,
        aluno: notaParaAtualizar.aluno,
        disciplina: { id: disciplinaId },
      };

      console.log("Objeto para atualizar", updatedNotaObj);

      await updateObj(notaId, "nota", updatedNotaObj);
      Alert.alert("Sucesso", "Nota atualizada com sucesso!");

      console.log("ID da nota para atualizar: ", notaId);
      setEditMode(false);

    } catch (error) {
      console.error("Erro ao atualizar nota: ", error);
      Alert.alert("Erro", "Não foi possível atualizar a nota");
    }
  };

  // Cancela o modo de edição
  const handleCancelEdit = () => {
    setEditMode(false);
  }

  const handleCardColor = (media) => {
    if (media >= 6.5) return ntColors.ntGreenApv;
    if (media >= 5) return ntColors.ntYellowRec;
    return ntColors.ntRedRep;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={ntColors.ntBlueMain} />
      </View>
    );
  };

  if (!loading && notas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Nenhum dado encontrado.</Text>
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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notas</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={editMode ? handleEditNota : () => setEditMode(true)}
        >
          {editMode ? (
            <Ionicons
              name='save-outline'
              size={24}
              color={ntColors.ntBlack}
            />
          ) : (
            <Ionicons
              name='pencil-outline'
              size={24}
              color={ntColors.ntBlack}
            />
          )}
        </TouchableOpacity>

        {editMode && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelEdit}
          >
            <Ionicons
              name='close-outline'
              size={24}
              color={ntColors.ntBlack}
            />
          </TouchableOpacity>
        )}
      </View>


      <NotasTableProfessor
        dados={notas}
        editable={editMode}
        onChangeText={user.tipo === 'professor' ? handleEditNota : null}
      />

      <View style={styles.situationContainer}>
        <Text style={styles.secondTitle}>Situação</Text>

        <FlatList
          style={styles.situationList}
          data={notas[0].data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SituationCard
              titulo={item.aluno}
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
  loading: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize20,
    color: ntColors.ntBlack,
  },
  titleContainer: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },
  editButton: {
    position: 'absolute',
    top: 90,
    right: -86,
  },
  cancelButton: {
    position: 'absolute',
    top: 90,
    right: -126,
  },
  title: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize24,
    color: ntColors.ntBlack,
    marginTop: 84,
  },
  secondTitle: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize24,
    color: ntColors.ntBlack,
  },
  situationList: {
    maxHeight: 159,
    marginTop: 25,
  },
  situationIndicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 26,
    marginTop: 22,
  },
});