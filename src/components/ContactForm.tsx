'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, Send, Check } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = language === 'pt' ? 'Nome é obrigatório' : 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'pt' ? 'Email é obrigatório' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'pt' ? 'Email inválido' : 'Invalid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = language === 'pt' ? 'Mensagem é obrigatória' : 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/20 backdrop-blur-sm rounded-3xl border border-gray-700/20 p-8 shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-2">{t('contactTitle')}</h3>
      <p className="text-gray-400 mb-8">{t('contactSubtitle')}</p>
      
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/20 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h4 className="text-2xl font-bold mb-3 text-gray-100">{t('contactSuccess')}</h4>
          <p className="text-gray-400">{t('contactSuccessMessage')}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              {t('formName')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full pl-12 pr-4 py-4 bg-gray-900/50 border ${
                  errors.name ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                placeholder={t('formNamePlaceholder')}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              {t('formEmail')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-12 pr-4 py-4 bg-gray-900/50 border ${
                  errors.email ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                placeholder={t('formEmailPlaceholder')}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
              {t('formMessage')}
            </label>
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`block w-full pl-12 pr-4 py-4 bg-gray-900/50 border ${
                  errors.message ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all`}
                placeholder={t('formMessagePlaceholder')}
              ></textarea>
            </div>
            {errors.message && (
              <p className="mt-2 text-sm text-red-400">{errors.message}</p>
            )}
          </div>
          
          <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contactSending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('contactSendMessage')}
                    </>
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                  {language === 'pt' ? 'Clique para enviar sua mensagem' : 'Click to send your message'}
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </form>
      )}
    </motion.div>
  );
}