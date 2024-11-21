import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { UserContext } from '../../service/UserContext';
import { getById, updateObj } from '../../service/api/api';

export default function aluno() {
  const [info, setInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const endpoint = user.tipo === 'aluno' ? 'aluno' : 'professor';
        const response = await getById(user.id, endpoint);

        setInfo(response);

      } catch (error) {
        console.error(`Erro ao buscar informações sobre ${user.nome}`, error);

      }
    }

    fetchInfos();

  }, [user]);

  const handleSave = async () => {
    try {
      const endpoint = user.tipo === 'aluno' ? 'aluno' : 'professor';
      await updateObj(user.id, endpoint, info);

      alert("Informações atualizadas!");
      setEditMode(false);

    } catch (error) {
      console.error("Erro ao atualizar informações", error);
      
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={info.nome}
        editable={editMode}
        onChangeText={(text) => setInfo({ ...info, nome: text })}
      />
      <TextInput
        value={info.dtNascimento}
        editable={editMode}
        onChangeText={(text) => setInfo({ ...info, dtNascimento: text })}
      />
      <TextInput
        value={info.cpf}
        editable={editMode}
        onChangeText={(text) => setInfo({ ...info, cpf: text })}
      />
      <TextInput
        value={info.turma}
        editable={editMode}
        onChangeText={(text) => setInfo({ ...info, turma: text })}
      />
      <Button title={editMode ? "Salvar" : "Editar"} onPress={editMode ? handleSave : () => setEditMode(true)} />
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