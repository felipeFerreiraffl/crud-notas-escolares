import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from './../../service/UserContext';
import { getAll, getById, updateObj } from './../../service/api/api';

export default function NotasAluno() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await getAll('nota');

        setNotas(response);

      } catch (error) {
        console.error("Erro ao buscar as notas do aluno: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotas();

  }, [user]);

  const handleEditNota = async (notaId, newValor) => {
    try {
      await updateObj(notaId, 'nota', { valorNota: newValor });
      alert('Nota atualizada!');
    } catch (error) {
      console.error("Erro ao atualizar nota: ", error);

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
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={notas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>
              {user.tipo === 'aluno' ? `Disciplina: ${item.disciplina.nome}` : `Aluno: ${item.aluno.nome}}`}
            </Text>
            {user.tipo === 'professor' ? (
              <TextInput
                keyboardType='numeric'
                defaultValue={String(item.valorNota)}
                onEndEditing={(e) => handleEditNota(item.id, e.nativeEvent.text)}
              />
            ) : (
              <Text>{item.valorNota}</Text>
            )}
          </View>
        )}
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