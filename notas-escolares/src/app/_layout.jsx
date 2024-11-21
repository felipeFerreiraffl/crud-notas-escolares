import { Slot } from 'expo-router';
import { UserProvider } from '../service/UserContext';

export default function RootLayout() {
 return (
   <UserProvider>
    <Slot />
   </UserProvider>
  );
}