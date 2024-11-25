import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InfosField from '../../components/InfosField';
import { UserContext } from '../../service/UserContext';
import { getById, updateObj } from '../../service/api/api';
import { ntColors } from '../../styles/colors/colors';
import { ntFonts, ntFontSizes } from '../../styles/fonts/fonts';

export default function AlunoInfos() {
  const [info, setInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [originalInfo, setOriginalInfo] = useState(null);

  const { user } = useContext(UserContext);

  // Recolhe as informações de um usuário específico
  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await getById(user.id, 'aluno');

        console.log(response)
        setInfo(response);
        setOriginalInfo(response);

      } catch (error) {
        console.error(`Erro ao buscar informações sobre ${user.nome}`, error);

      }
    }

    fetchInfos();

  }, [user]);

  // Salva as informações quando editá-las
  const handleSave = async () => {
    try {
      await updateObj(user.id, 'aluno', info);

      alert("Informações atualizadas!");
      setEditMode(false);

    } catch (error) {
      console.error("Erro ao atualizar informações", error);

    }
  };

  // Cancela o modo de edição
  const handleCancelEdit = () => {
    setInfo(originalInfo); // Restaura os dados originais
    setEditMode(false);
  }

  // Muda o formato da data para o padrão (DD/MM/YYYY)
  // * No modo de edição, usar o formato MySQL (YYYY-MM-DD)
  const dateFormat = (dateString) => {
    if (!dateString) return ''; // Protege contra valores inválidos

    const [yyyy, mm, dd] = dateString.split('-');
    return `${dd}/${mm}/${yyyy}`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/aluno')}
      >
        <Ionicons
          name='arrow-back-circle-outline'
          size={37}
          color={ntColors.ntBlack}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Informações</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={editMode ? handleSave : () => setEditMode(true)}
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

      <View style={styles.infosContainer}>
        {/* Cor de fundo muda de acordo com o estado,
        Se o mode de edição estiver ativado, o input é branco.
        Caso não esteja, fica cinza, e não poderá ser editado */}
        <InfosField
          title={'Nome'}
          info={info.nome}
          editable={editMode}
          onChange={(text) => setInfo({ ...info, nome: text })}
          backgroundColor={editMode ? ntColors.ntWhite : ntColors.ntGray}
        />
        <InfosField
          title={'Data de nascimento'}
          info={editMode ? info.dtNascimento : dateFormat(info.dtNascimento)}
          editable={editMode}
          onChange={(text) => setInfo({ ...info, dtNascimento: text })}
          backgroundColor={editMode ? ntColors.ntWhite : ntColors.ntGray}
        />
        <InfosField
          title={'CPF'}
          info={info.cpf}
          editable={editMode}
          onChange={(text) => setInfo({ ...info, cpf: text })}
          backgroundColor={editMode ? ntColors.ntWhite : ntColors.ntGray}
        />
        <InfosField
          title={'Turma'}
          info={info.turma}
          editable={editMode}
          onChange={(text) => setInfo({ ...info, turma: text })}
          backgroundColor={editMode ? ntColors.ntWhite : ntColors.ntGray}
        />
      </View>
      <Image
        style={styles.infoCard}
        source={require('../../assets/images/info-card.png')}
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 31,
  },
  titleContainer: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: ntFonts.ntQuicksandBold,
    fontSize: ntFontSizes.ntSize24,
    color: ntColors.ntBlack,
  },
  editButton: {
    position: 'absolute',
    right: -47,
  }, 
  cancelButton: {
    position: 'absolute',
    right: -81,
  },
  infosContainer: {
    alignItems: 'flex-start',
    gap: 18,
    marginTop: 45,
  },
  infoCard: {
    width: 180,
    height: 115,
    marginTop: 50,
  },
});