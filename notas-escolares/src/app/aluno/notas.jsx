import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import NotasTableAluno from './../../components/NotasTable/index';
import { UserContext } from './../../service/UserContext';
import { getNotaByAluno, updateObj } from './../../service/api/api';
import { ntColors } from '../../styles/colors/colors';

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
      <NotasTableAluno 
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