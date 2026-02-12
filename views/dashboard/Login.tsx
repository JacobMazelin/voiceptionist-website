import React, { useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Building2, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Rate limiting state
    const attempts = useRef(0);
    const lockoutTime = useRef<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check lockout
        if (lockoutTime.current && Date.now() < lockoutTime.current) {
            const remaining = Math.ceil((lockoutTime.current - Date.now()) / 1000);
            setError(`Too many failed attempts. Please try again in ${remaining} seconds.`);
            return;
        }

        // Reset lockout if time passed
        if (lockoutTime.current && Date.now() >= lockoutTime.current) {
            lockoutTime.current = null;
            attempts.current = 0;
        }

        setError(null);
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            attempts.current += 1;
            if (attempts.current >= 5) {
                lockoutTime.current = Date.now() + 30000; // 30s lockout
                setError('Too many failed attempts. Please wait 30 seconds.');
            } else {
                setError(error.message);
            }
        } else {
            // Success reset
            attempts.current = 0;
            lockoutTime.current = null;
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-10">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Building2 size={28} className="text-[#abc2fe]" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Voiceptionist</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">AI-Powered Property Management</p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">
                        Welcome back
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Sign in to your dashboard
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-12 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6 font-medium">
                    Powered by Voiceptionist AI
                </p>
            </div>
        </div>
    );
};

export default Login;
