'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'تم تسجيل الدخول بنجاح!' });

        // انتظار قصير قبل التوجيه
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1000);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'فشل في تسجيل الدخول' 
        });
      }
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      setMessage({ 
        type: 'error', 
        text: 'حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // إخفاء رسائل الخطأ عند الكتابة
    if (message.type === 'error') {
      setMessage({ type: '', text: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          اسم المستخدم
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={formData.username}
          onChange={handleInputChange}
          placeholder="أدخل ��سم المستخدم"
          className="w-full"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          كلمة المرور
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="أدخل كلمة المرور"
            className="w-full pl-10"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <input id="remember" type="checkbox" className="rounded" disabled={isLoading} />
          <label htmlFor="remember">تذكرني</label>
        </div>
        <span className="text-gray-400">نسيت كلمة المرور؟</span>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !formData.username || !formData.password}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري تسجيل الدخول...
          </>
        ) : (
          'تسجيل الدخول'
        )}
      </Button>
    </form>
  );
}
