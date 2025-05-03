import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guestMode = sessionStorage.getItem('guestMode') === 'true';
    setIsGuest(guestMode);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          },
          providerData: user.providerData,
        });
        if (isGuest) {
          sessionStorage.removeItem('guestMode');
          setIsGuest(false);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
      setAuthError(null);
    }, (error) => {
      setAuthError(error);
      setLoading(false);
    });

    return unsubscribe;
  }, [isGuest]);

  const enableGuestMode = () => {
    sessionStorage.setItem('guestMode', 'true');
    setIsGuest(true);
    toast.info("You're browsing in guest mode. Sign up to save your progress.");
  };

  const signup = async (email, password, displayName, photoURL = null) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`
      });

      await sendEmailVerification(userCredential.user);
      toast.info("Verification email sent. Please check your inbox.");

      return { 
        success: true, 
        user: userCredential.user,
        needsVerification: true
      };
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Email already in use.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address.";
          break;
      }
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoginLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (isGuest) {
        sessionStorage.removeItem('guestMode');
        setIsGuest(false);
      }

      return { success: true, user: userCredential.user };
    } catch (error) {
      toast.error("Login failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      
      const maintainGuestMode = sessionStorage.getItem('guestMode') === 'true';
      
      if (!maintainGuestMode) {
        sessionStorage.removeItem('guestMode');
        setIsGuest(false);
      }

      toast.success("Logged out successfully", { position: "top-right", autoClose: 3000 });
      return { success: true };
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const convertGuestToUser = async (userCredential) => {
    try {
      sessionStorage.removeItem('guestMode');
      setIsGuest(false);
      
      const user = userCredential.user;
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        },
        providerData: user.providerData,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    isAuthenticated: !!currentUser,
    isVerified: currentUser?.emailVerified || false,
    isGuest,
    enableGuestMode,
    login,
    signup,
    logout,
    updateUserProfile,
    changeEmail,
    changePassword,
    resetPassword,
    deleteAccount,
    resendVerification,
    convertGuestToUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};