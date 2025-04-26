import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser?.uid) {
        setLoading(false);
        return;
      }

      try {
        // Check both custom claims and Firestore as fallback
        const idTokenResult = await currentUser.getIdTokenResult();
        const hasAdminClaim = idTokenResult.claims.admin === true;

        if (hasAdminClaim) {
          setIsAdmin(true);
        } else {
          // Fallback to Firestore check
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          setIsAdmin(userDoc.data()?.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [currentUser]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      {/* Add your loading spinner here */}
      Loading permissions...
    </div>;
  }

  if (!isAdmin) {
    // Redirect to home with state to show unauthorized message
    return <Navigate 
      to="/" 
      replace 
      state={{ from: 'admin', message: 'Unauthorized access' }} 
    />;
  }

  return children;
}