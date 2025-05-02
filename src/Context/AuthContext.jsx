// src/Context/AuthContext.jsx
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

  // Set up auth state listener
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
  }, []);

  // Logs in a user with email and password
  const login = async (email, password) => {
    try {
      setLoginLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      toast.error("Login failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setLoginLoading(false);
    }
  };

  // Enhanced signup with name and email verification
  const signup = async (email, password, displayName, photoURL = null) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`
      });

      // Send email verification
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

  // Enhanced logout
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast.success("Logged out successfully", { position: "top-right", autoClose: 3000 });
      return { success: true };
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      setLoading(true);
      await updateProfile(auth.currentUser, updates);
      setCurrentUser(prev => ({ ...prev, ...updates }));
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update profile");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Change email
  const changeEmail = async (newEmail) => {
    try {
      setLoading(true);
      await updateEmail(auth.currentUser, newEmail);
      setCurrentUser(prev => ({ ...prev, email: newEmail, emailVerified: false }));
      await sendEmailVerification(auth.currentUser);
      toast.success("Email updated. Verification email sent.");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update email");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (newPassword) => {
    try {
      setLoading(true);
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update password");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
      return { success: true };
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found'
        ? "No account found with this email."
        : "Failed to send reset email.";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      setLoading(true);
      await deleteUser(auth.currentUser);
      toast.success("Account deleted successfully");
      return { success: true };
    } catch (error) {
      toast.error("Failed to delete account");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerification = async () => {
    try {
      setLoading(true);
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email resent");
      return { success: true };
    } catch (error) {
      toast.error("Failed to resend verification");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    isAuthenticated: !!currentUser,
    isVerified: currentUser?.emailVerified || false,
    login,
    signup,
    logout,
    updateUserProfile,
    changeEmail,
    changePassword,
    resetPassword,
    deleteAccount,
    resendVerification,
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