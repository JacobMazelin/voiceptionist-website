
import React, { useState, useRef, useCallback } from 'react';
import {
  ArrowLeft, ArrowRight, Building2, Upload, FileText, Phone,
  CheckCircle2, Loader2, X, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const STEPS = [
  { key: 'basics', label: 'Property Info' },
  { key: 'kb', label: 'Knowledge Base' },
  { key: 'review', label: 'Review & Activate' },
] as const;

type Step = typeof STEPS[number]['key'];

interface FormData {
  property_name: string;
  address: string; // Optional context
  unit_count: string;
  contact_email: string;
  contact_phone: string;
  area_code: string;
  password: string;
  kb_files: File[];
}

interface ProvisionResult {
  phone_number: string;
  property_id: string;
  agent_id: string;
}

// Reusable Input Component
const Input = ({ label, field, value, error, onChange, type = 'text', placeholder, required = false, ...props }: {
  label: string; field: string; value: string; error?: string;
  onChange: (field: string, value: string) => void;
  type?: string; placeholder?: string; required?: boolean;
  [key: string]: any;
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-ramp-lime/20'} focus:border-ramp-lime focus:ring-4 outline-none transition-all placeholder:text-gray-400`}
        placeholder={placeholder}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const OnboardingView: React.FC = () => {
  const [step, setStep] = useState<Step>('basics');
  const [formData, setFormData] = useState<FormData>({
    property_name: '',
    address: '',
    unit_count: '',
    contact_email: '', // Will be pre-filled from URL or prop
    contact_phone: '',
    area_code: '',
    password: '',
    kb_files: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionResult, setProvisionResult] = useState<ProvisionResult | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill email from URL if present
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (email) {
      setFormData(prev => ({ ...prev, contact_email: email }));
    }
  }, []);

  const updateField = (field: keyof FormData, value: string | File[] | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateBasics = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.property_name.trim()) newErrors.property_name = 'Property name is required';
    if (!formData.contact_email.trim()) newErrors.contact_email = 'Email description is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) return `File too large (max ${formatFileSize(MAX_FILE_SIZE)})`;
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv'
    ];
    // if (!allowedTypes.includes(file.type)) return 'Invalid file type (PDF, DOCX, TXT, CSV only)';
    return null;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const newErrors: Record<string, string> = {};

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.files = error; // Just show last error for now
      } else {
        validFiles.push(file);
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
    }

    setFormData(prev => ({
      ...prev,
      kb_files: [...prev.kb_files, ...validFiles]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      kb_files: prev.kb_files.filter((_, i) => i !== index)
    }));
  };

  const handleProvision = async () => {
    setIsProvisioning(true);
    setErrors({});

    try {
      // 1. Sign Up User
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.contact_email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      const userId = authData.user.id;

      // 2. Create Property
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .insert({
          name: formData.property_name,
          timezone: 'America/New_York', // Default for now
          // address: formData.address,
          // unit_count: parseInt(formData.unit_count) || 0
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      // 3. Link User to Property
      const { error: linkError } = await supabase
        .from('user_properties')
        .insert({
          user_id: userId,
          property_id: propertyData.id,
          role: 'owner'
        });

      if (linkError) throw linkError;

      // Success!
      setProvisionResult({
        phone_number: '(555) 123-4567', // Mock for now
        property_id: propertyData.id,
        agent_id: 'agent_default'
      });

    } catch (err: any) {
      console.error('Provisioning error:', err);
      setErrors({ submit: err.message || 'Failed to create account. Please try again.' });
    } finally {
      setIsProvisioning(false);
    }
  };

  // Success View
  if (provisionResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6 border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900">You're all set!</h2>
          <p className="text-gray-500">
            Your property <span className="font-semibold text-gray-900">{formData.property_name}</span> has been created.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 text-left border border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">DASHBOARD ACCESS</p>
              <p className="font-medium text-gray-900">{formData.contact_email}</p>
            </div>
          </div>

          <a
            href="http://localhost:3001"
            className="block w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ramp-lime rounded-lg flex items-center justify-center font-bold text-black border border-black/5">V</div>
            <span className="font-bold text-lg tracking-tight">Voiceptionist</span>
          </div>
          <div className="text-sm text-gray-500 font-medium">Setup Guide</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-12 pb-20 px-4">
        <div className="max-w-2xl w-full">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 px-4">
            {STEPS.map((s, i) => {
              const isActive = s.key === step;
              const isPast = STEPS.findIndex(x => x.key === step) > i;

              return (
                <div key={s.key} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isActive ? 'bg-gray-900 text-white shadow-lg scale-110' :
                      isPast ? 'bg-green-500 text-white' : 'bg-white text-gray-300 border-2 border-gray-100'
                    }`}>
                    {isPast ? <CheckCircle2 size={18} /> : i + 1}
                  </div>
                  <span className={`text-xs font-bold mt-3 uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-gray-900' : isPast ? 'text-green-600' : 'text-gray-300'
                    }`}>{s.label}</span>
                </div>
              );
            })}
            {/* Connecting Line */}
            <div className="absolute top-[138px] left-0 w-full h-0.5 bg-gray-200 -z-0 hidden md:block" />
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">

              {step === 'basics' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Let's get started</h1>
                    <p className="text-gray-500">Tell us about your property to set up your AI agent.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Property Name"
                      field="property_name"
                      value={formData.property_name}
                      onChange={updateField}
                      placeholder="e.g. The Heights at Downtown"
                      required
                      error={errors.property_name}
                    />

                    <Input
                      label="Work Email"
                      field="contact_email"
                      value={formData.contact_email}
                      onChange={updateField}
                      placeholder="name@company.com"
                      type="email"
                      required
                      error={errors.contact_email}
                    />

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => updateField('password', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-300' : 'border-gray-200'} focus:ring-4 focus:ring-ramp-lime/20 focus:border-ramp-lime outline-none transition-all pr-10`}
                          placeholder="Create a secure password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Approx. Units"
                        field="unit_count"
                        value={formData.unit_count}
                        onChange={updateField}
                        type="number"
                        placeholder="e.g. 150"
                      />
                      <Input
                        label="Zip Code"
                        field="address"
                        value={formData.address}
                        onChange={updateField}
                        placeholder="e.g. 90210"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => {
                        if (validateBasics()) setStep('kb');
                      }}
                      className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Continue</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {step === 'kb' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Knowledge Base</h1>
                    <p className="text-gray-500">Upload documents (PDF, DOCX) to train your AI agent about your property.</p>
                  </div>

                  <div
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-ramp-lime hover:bg-ramp-lime/5 transition-all cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Upload size={32} className="text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                    <p className="font-bold text-gray-900 mb-1">Click to upload documents</p>
                    <p className="text-sm text-gray-500">PDF, DOCX, TXT allowed (Max 100MB)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.docx,.txt"
                    />
                  </div>

                  {formData.kb_files.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Uploaded Files</h3>
                      <div className="space-y-2">
                        {formData.kb_files.map((file, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <FileText size={18} className="text-gray-400 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                              <span className="text-xs text-gray-400">({formatFileSize(file.size)})</span>
                            </div>
                            <button
                              onClick={() => removeFile(i)}
                              className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={() => setStep('basics')}
                      className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep('review')}
                      className="flex-[2] bg-gray-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Continue</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Review & Activate</h1>
                    <p className="text-gray-500">Confirm your details to create your account.</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 space-y-6 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">PROPERTY</p>
                        <p className="font-bold text-lg text-gray-900">{formData.property_name}</p>
                        <p className="text-sm text-gray-500">{formData.unit_count} Units • {formData.address}</p>
                      </div>
                      <button onClick={() => setStep('basics')} className="text-xs font-bold text-ramp-lime hover:underline">EDIT</button>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">ACCOUNT</p>
                        <p className="font-bold text-lg text-gray-900">{formData.contact_email}</p>
                        <p className="text-sm text-gray-500">••••••••</p>
                      </div>
                      <button onClick={() => setStep('basics')} className="text-xs font-bold text-ramp-lime hover:underline">EDIT</button>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">KNOWLEDGE BASE</p>
                        <p className="font-bold text-lg text-gray-900">{formData.kb_files.length} Files Uploaded</p>
                      </div>
                      <button onClick={() => setStep('kb')} className="text-xs font-bold text-ramp-lime hover:underline">EDIT</button>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center space-x-2">
                      <X size={16} />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={() => setStep('kb')}
                      className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                      disabled={isProvisioning}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleProvision}
                      disabled={isProvisioning}
                      className="flex-[2] bg-ramp-lime text-black font-bold text-lg py-4 rounded-xl hover:brightness-95 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProvisioning ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Activate Property</span>
                          <CheckCircle2 size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
