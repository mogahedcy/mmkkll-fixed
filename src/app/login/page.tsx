
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // فحص إذا كان المستخدم مسجل دخول بالفعل
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.log('غير مسجل دخول');
      }
    };

    checkAuthentication();
  }, [router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-lg text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-gray-600">
            قم بتسجيل الدخول للوصول إلى لوحة التحكم
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>بيانات تسجيل الدخول</CardTitle>
            <CardDescription>
              أدخل اسم المستخدم وكلمة المرور الخاصة بك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">بيانات تسجيل الدخول الافتراضية:</h3>
            <p className="text-blue-800">
              <strong>اسم المستخدم:</strong> admin<br />
              <strong>كلمة المرور:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
