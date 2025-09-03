import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

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
    redirect('/login')
  }

  return (
    <div className="min-h-screen grid grid-cols-12" dir="rtl">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-l bg-white p-4 space-y-4">
        <div className="font-bold text-primary">مرحباً، {admin!.username}</div>
        <nav className="space-y-2 text-sm">
          <Link href="/dashboard" className="block hover:text-primary">نظرة عامة</Link>
          <Link href="/dashboard/projects" className="block hover:text-primary">المشاريع</Link>
          <Link href="/dashboard/projects/add" className="block hover:text-primary">إضافة مشروع</Link>
          <Link href="/dashboard/settings" className="block hover:text-primary">الإعدادات</Link>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4">{children}</main>
    </div>
  )
}
