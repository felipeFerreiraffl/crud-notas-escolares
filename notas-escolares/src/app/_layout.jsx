import { Slot } from 'expo-router';
import { UserProvider } from '../service/UserContext';

// Layout com Slot como padrão de navegação
export default function RootLayout() {
 return (
   <UserProvider>
    <Slot />
   </UserProvider>
  );
}