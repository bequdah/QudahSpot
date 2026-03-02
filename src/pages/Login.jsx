import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginWithGoogle } = useMaterials();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await loginWithGoogle();
            navigate('/post'); // Redirect to posting page after success
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card max-w-md w-full p-12 text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary border border-primary/20 shadow-2xl shadow-primary/10">
                        <LogIn size={40} />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Welcome to <span className="text-primary italic">QudahSpot</span></h1>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                        Sign in with your university or personal Google account to start sharing and managing your materials.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-8 flex items-start gap-3 text-rose-500 text-sm text-left"
                        >
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-6">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full h-14 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5 border border-slate-200 group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin text-primary" size={24} />
                        ) : (
                            <>
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                                <span>Continue with Google</span>
                            </>
                        )}
                    </button>

                    <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">
                        Secure University Access
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-glass-border">
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
