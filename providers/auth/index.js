import { useContext } from 'react';
import AuthProvider, { AuthContext } from './provider';

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
