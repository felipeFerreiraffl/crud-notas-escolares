import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NotasTableProfessor from '../../components/NotasTableProfessor';
import { getNotaByDisciplina } from '../../service/api/api';
import { UserContext } from './../../service/UserContext';

export default function NotasProfessor({ disciplinaId }) {
  const [notas, setNotas] = useState([]);
  const [disciplina, setDisciplina] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await getNotaByDisciplina(disciplinaId);

        const formattedNotas = response.map((nota) => ({
          id: nota.id,
          aluno: nota.aluno ? nome.aluno.nome : "Aluno não encontrado",
          nota: nota.valoresNota || [null, null, null, null],
        }));

        console.log(formattedNotas);
        setNotas(formattedNotas);
        setDisciplina(response[0]?.disciplina?.nome || "Disciplina");

      } catch (error) {
        console.error("Erro ao buscar as notas da disciplina: ", error);
        Alert.alert("Erro", "Não foi possível buscar as notas");

      } finally {
        setLoading(false);
      }
    }

    fetchNotas();

  }, [disciplinaId]);

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

      await updateObj(notaId, "nota", updatedNotaObj);
      Alert.alert("Sucesso", "Nota atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar nota: ", error);
      Alert.alert("Erro", "Não foi possível atualizar a nota");
    }
  };

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});