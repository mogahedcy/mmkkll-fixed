'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { FormValidator, type FormData, sendContactEmail } from '@/lib/form-validation';

export function ContactFormAdvanced() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'mazallat',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = FormValidator.validateForm(formData);
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce(
        (acc, err) => ({ ...acc, [err.field]: err.message }),
        {}
      );
      setErrors(errorMap);
      return;
    }

    setStatus('loading');
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus('success');
      setStatusMessage(result.message);
      setFormData({ name: '', email: '', phone: '', serviceType: 'mazallat', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setStatusMessage(result.message);
    }
  };

  const services = [
    { value: 'mazallat', label: 'مظلات سيارات' },
    { value: 'pergolas', label: 'برجولات' },
    { value: 'sawater', label: 'سواتر' },
    { value: 'landscaping', label: 'تنسيق حدائق' },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">اسمك</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="محمد أحمد"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors dark:bg-gray-800 ${
            errors.name
              ? 'border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary'
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors dark:bg-gray-800 ${
            errors.email
              ? 'border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="0553719009"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors dark:bg-gray-800 ${
            errors.phone
              ? 'border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary'
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Service Type */}
      <div>
        <label className="block text-sm font-medium mb-2">نوع الخدمة</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-primary transition-colors dark:bg-gray-800"
        >
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-2">الرسالة</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="أخبرنا عن احتياجاتك..."
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors dark:bg-gray-800 resize-none ${
            errors.message
              ? 'border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary'
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {statusMessage}
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {statusMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            إرسال الطلب
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
