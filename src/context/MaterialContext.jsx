import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth, googleProvider } from '../firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithPopup
} from 'firebase/auth';

const MaterialContext = createContext();

export const MaterialProvider = ({ children }) => {
    const [allMaterials, setAllMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false);

    // Auth state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsAdmin(user?.email === 'qudahmohammad36@gmail.com');
            setAuthLoading(false);
        });
        return unsubscribe;
    }, []);

    // Auth methods
    const signup = async (email, password, displayName) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName });
        return res;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };


    // Real-time listener for materials
    useEffect(() => {
        const q = query(collection(db, "materials"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const materialsArray = [];
            querySnapshot.forEach((doc) => {
                materialsArray.push({ id: doc.id, ...doc.data() });
            });
            setAllMaterials(materialsArray);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching materials: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addMaterial = async (newMaterial) => {
        try {
            const materialWithStatus = {
                ...newMaterial,
                approved: false,
                createdAt: serverTimestamp(),
                userId: currentUser?.uid || null // Link post to user
            };
            await addDoc(collection(db, "materials"), materialWithStatus);
        } catch (error) {
            console.error("Error adding material: ", error);
        }
    };

    const updateMaterial = async (updatedMaterial) => {
        try {
            const materialRef = doc(db, "materials", updatedMaterial.id);
            const { id, ...data } = updatedMaterial;
            await updateDoc(materialRef, data);
        } catch (error) {
            console.error("Error updating material: ", error);
        }
    };

    const deleteMaterial = async (id) => {
        try {
            await deleteDoc(doc(db, "materials", id));
        } catch (error) {
            console.error("Error deleting material: ", error);
        }
    };

    const approveMaterial = async (id) => {
        try {
            const materialRef = doc(db, "materials", id);
            await updateDoc(materialRef, { approved: true });
        } catch (error) {
            console.error("Error approving material: ", error);
        }
    };

    const clearAllMaterials = () => {
        console.warn("Clear all materials not implemented for Firestore for safety");
    };

    return (
        <MaterialContext.Provider value={{
            allMaterials,
            addMaterial,
            updateMaterial,
            deleteMaterial,
            approveMaterial,
            clearAllMaterials,
            isAdmin,
            loading,
            currentUser,
            authLoading,
            signup,
            login,
            loginWithGoogle,
            logout
        }}>

            {children}
        </MaterialContext.Provider>
    );
};

export const useMaterials = () => {
    const context = useContext(MaterialContext);
    if (!context) {
        throw new Error('useMaterials must be used within a MaterialProvider');
    }
    return context;
};
