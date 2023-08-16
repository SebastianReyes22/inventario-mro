import { createContext, useEffect, useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../auth/firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  //Login
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Logout
  function logOut() {
    return signOut(auth);
  }

  //New User Firebase
  function newUser(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
      updateProfile(userCredential.user, {
        displayName: displayName,
      });
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, logOut, newUser }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
