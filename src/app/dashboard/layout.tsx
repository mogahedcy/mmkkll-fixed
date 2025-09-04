import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import HeaderClient from './HeaderClient'

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
    <div className="min-h-screen grid grid-cols-12 bg-slate-50" dir="rtl">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-l bg-white p-4 space-y-6">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
          <div>
            <div className="font-bold text-gray-900">الديار العالمية</div>
            <div className="text-xs text-gray-500">مرحباً، {admin!.username}</div>
          </div>
        </div>
        <nav className="space-y-2 text-sm">
          <Link href="/dashboard" className="block rounded-lg px-3 py-2 hover:bg-slate-100">نظرة عامة</Link>
          <Link href="/dashboard/projects" className="block rounded-lg px-3 py-2 hover:bg-slate-100">المشاريع</Link>
          <Link href="/dashboard/projects/add" className="block rounded-lg px-3 py-2 hover:bg-slate-100">إضافة مشروع</Link>
          <Link href="/dashboard/settings" className="block rounded-lg px-3 py-2 hover:bg-slate-100">الإعدادات</Link>
        </nav>
        <div className="mt-auto hidden md:block text-xs text-gray-400">© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
      </aside>
      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b p-4">
          {/* @ts-expect-error Async Server Component interop */}
          <div className="max-w-6xl mx-auto"><div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-900">لوحة التحكم</div>
            {/* Client header */}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <div suppressHydrationWarning>
              <HeaderClient />
            </div>
          </div></div>
        </header>
        <main className="p-4 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  )
}
