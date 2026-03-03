import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Loader2, Sparkles } from 'lucide-react';
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
        <div className="relative min-h-[90vh] flex items-center justify-center p-6 overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="bg-glow">
                <div className="glow-1" />
                <div className="glow-2" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative max-w-md w-full"
            >
                {/* Visual Accent */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />

                <div className="premium-card p-10 md:p-12 text-center">
                    <div className="relative z-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary/20"
                        >
                            <div className="relative">
                                <LogIn size={36} className="text-primary" />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="absolute -top-2 -right-2 text-primary/60"
                                >
                                    <Sparkles size={16} />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-4xl font-black mb-3 tracking-tight">
                                <span className="gradient-text">Qudah</span>
                                <span className="text-primary italic">Spot</span>
                            </h1>
                            <p className="text-text-muted text-sm leading-relaxed max-w-[280px] mx-auto mb-10">
                                Connect with your academic community and exchange materials seamlessly.
                            </p>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-8 flex items-start gap-3 text-rose-500 text-xs text-left"
                                >
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6"
                        >
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full h-14 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-4 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50 group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin text-primary" size={24} />
                                ) : (
                                    <>
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                                        <span>Sign in with Google</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-white/10" />
                                <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] font-bold">
                                    Trusted Access
                                </p>
                                <div className="h-px w-8 bg-white/10" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Link or Info */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-8 text-xs text-text-dim"
                >
                    By continuing, you agree to our Terms of Service.
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
