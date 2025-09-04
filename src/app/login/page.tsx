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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100" dir="rtl">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="hidden md:flex items-center justify-center p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 to-white">
          <div className="text-center max-w-md">
            <img src="/favicon.svg" alt="الشعار" className="mx-auto w-16 h-16 mb-6" />
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3">لوحة تحكم محترفة</h2>
            <p className="text-gray-600 leading-relaxed">
              إدارة المشاريع، المراجعات، والتقارير بمنتهى السهولة والسرعة.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
              <p className="text-gray-600">ادخل بياناتك للوصول إلى لوحة التحكم</p>
            </div>

            <Card className="shadow-xl border-slate-200/70">
              <CardHeader>
                <CardTitle>بيانات تسجيل الدخول</CardTitle>
                <CardDescription>أدخل اسم المستخدم وكلمة المرور الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>

            <div className="text-center text-xs text-gray-500 mt-6">
              بالدخول، فإنك توافق على الشروط وسياسة الخصوصية
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
