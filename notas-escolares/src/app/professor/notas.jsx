import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import NotasTableProfessor from '../../components/NotasTableProfessor';
import { getDisciplinaByProfId, getNotaByDisciplina } from '../../service/api/api';
import { UserContext } from './../../service/UserContext';
import { ntColors } from '../../styles/colors/colors';

export default function NotasProfessor({ disciplinaId }) {
  const [notas, setNotas] = useState([]);
  const [disciplina, setDisciplina] = useState("");
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
          id: nota.id ?? `temp-${nota.aluno?.id}`,
          disciplinaId: nota.disciplina?.id,
          disciplina: nota.disciplina?.nome,
          professor: nota.disciplina?.professor?.nome,
          aluno: nota.aluno?.nome || "Aluno não encontrado",
          nota: Array.isArray(nota.valoresNota) ? nota.valoresNota : [null, null, null, null],
        }));

        const sectionsData = [
          {
            title: disciplinaAtual.nome,
            data: formattedNotas,
          }
        ];

        console.log("Dados para SectionList: ", sectionsData);
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
      const notaParaAtualizar = notas.find((nota) => nota.id === notaId);

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
    } catch (error) {
      console.error("Erro ao atualizar nota: ", error);
      Alert.alert("Erro", "Não foi possível atualizar a nota");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={ntColors.ntBlueMain} />
      </View>
    );
  }

  if (!loading && notas.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NotasTableProfessor
        dados={notas}
        editable={user.tipo === 'professor'}
        onChangeText={user.tipo === 'professor' ? handleEditNota : null}
      />
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
});