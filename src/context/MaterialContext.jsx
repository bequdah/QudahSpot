import React, { createContext, useContext, useState, useEffect } from 'react';
import { materials as initialMaterials } from '../data/mockData';

const MaterialContext = createContext();

export const MaterialProvider = ({ children }) => {
    // Start with an empty list instead of mock data for a clean slate
    const [allMaterials, setAllMaterials] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('qudahspot_materials_v2'); // New key for clean slate
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const [isAdmin, setIsAdmin] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('qudahspot_is_admin') === 'true';
        }
        return false;
    });

    const toggleAdmin = (value) => {
        setIsAdmin(value);
        if (typeof window !== 'undefined') {
            localStorage.setItem('qudahspot_is_admin', value);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('qudahspot_materials_v2', JSON.stringify(allMaterials));
        }
    }, [allMaterials]);

    const addMaterial = (newMaterial) => {
        // New materials are NOT approved by default for moderation
        const materialWithStatus = { ...newMaterial, approved: false };
        setAllMaterials(prev => [materialWithStatus, ...prev]);
    };

    const updateMaterial = (updatedMaterial) => {
        setAllMaterials(prev => prev.map(m => m.id === updatedMaterial.id ? updatedMaterial : m));
    };

    const deleteMaterial = (id) => {
        setAllMaterials(prev => prev.filter(m => m.id !== id));
    };

    const approveMaterial = (id) => {
        setAllMaterials(prev => prev.map(m =>
            m.id === id ? { ...m, approved: true } : m
        ));
    };

    const clearAllMaterials = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('qudahspot_materials_v2');
        }
        setAllMaterials([]);
    };

    return (
        <MaterialContext.Provider value={{ allMaterials, addMaterial, updateMaterial, deleteMaterial, approveMaterial, clearAllMaterials, isAdmin, toggleAdmin }}>
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
