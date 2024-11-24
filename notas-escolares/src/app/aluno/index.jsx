import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import AlunoWelcome from '../../components/AlunoWelcome';
import DrawerContent from '../../components/DrawerContent';
import ScreenButton from '../../components/ScreenButton';
import { ntColors } from '../../styles/colors/colors';
import { UserContext } from './../../service/UserContext';

export default function TelaAluno() {
    const { user } = useContext(UserContext);

    return (
        <DrawerContent>
            <View style={styles.container}>
                <View style={styles.header}>
                    <AlunoWelcome name={user.nome.split(' ')[0]} />
                </View>
                <View style={styles.buttonContent}>

                    <ScreenButton
                        backgroundColor={ntColors.ntBlueMain}
                        screenName={'Notas'}
                        imageKey={'notas'}
                        onPress={'/aluno/notas'}
                    />

                    <ScreenButton
                        backgroundColor={ntColors.ntBlueSec}
                        screenName={'Suas informações'}
                        imageKey={'infos'}
                        onPress={'/aluno/infos'}
                    />

                    <ScreenButton
                        backgroundColor={ntColors.ntBlueTer}
                        screenName={'Sobre o app'}
                        imageKey={'sobre'}
                        onPress={'/sobre'}
                    />

                </View>
            </View>
        </DrawerContent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ntColors.ntWhitePage,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: ntColors.ntBlueMain,
        width: '100%',
        paddingTop: 56,
    },
    buttonContent: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        marginTop: 94,
    },
});
