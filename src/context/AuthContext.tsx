import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  dbUser: any | null;
  loading: boolean;
  token: string | null;
  setDbUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  loading: true,
  token: null,
  setDbUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        
        // Sync with backend and fetch dbUser
        try {
          const res = await axios.post('http://localhost:5000/api/auth/sync', {}, {
            headers: { Authorization: `Bearer ${idToken}` }
          });
          setDbUser(res.data.user);
        } catch (error) {
          console.error("Error syncing user with backend:", error);
        }
      } else {
        setToken(null);
        setDbUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, token, setDbUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
