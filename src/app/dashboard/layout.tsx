import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import './page.css'

export const metadata: Metadata = {
  title: 'لوحة التحكم | محترفين الديار العالمية',
  robots: { index: false, follow: false },
}

async function requireAdmin() {
  const token = (await cookies()).get('admin-token')?.value
  if (!token) return null
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key-change-in-production') as any
    return { id: decoded.adminId, username: decoded.username }
  } catch {
    return null
  }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin()
  if (!admin) {
    return (
      <html lang="ar" dir="rtl"><body>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-600">غير مصرح</h1>
            <p className="text-gray-600">الرجاء تسجيل الدخول للوصول للوحة التحكم.</p>
            <Link href="/login" className="inline-flex px-4 py-2 rounded-md bg-primary text-white">الانتقال لتسجيل الدخول</Link>
          </div>
        </div>
      </body></html>
    )
  }

  return (
    <html lang="ar" dir="rtl"><body>
      <div className="min-h-screen grid grid-cols-12">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-l bg-white p-4 space-y-4">
          <div className="font-bold text-primary">مرحباً، {admin.username}</div>
          <nav className="space-y-2 text-sm">
            <Link href="/dashboard" className="block hover:text-primary">نظرة عامة</Link>
            <Link href="/dashboard/projects" className="block hover:text-primary">المشاريع</Link>
            <Link href="/dashboard/projects/add" className="block hover:text-primary">إضافة مشروع</Link>
            <Link href="/dashboard/settings" className="block hover:text-primary">الإع��ادات</Link>
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4">{children}</main>
      </div>
    </body></html>
  )
}
