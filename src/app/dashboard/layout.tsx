import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/jwt'
import HeaderClient from './HeaderClient'

export const metadata: Metadata = {
  title: 'لوحة التحكم | محترفين الديار العالمية',
  robots: { index: false, follow: false },
}

async function requireAdmin() {
  const token = (await cookies()).get('admin-token')?.value
  if (!token) return null
  try {
    const decoded = verifyToken(token) as any
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
    <div className="min-h-screen grid grid-cols-12 bg-gradient-to-br from-slate-50 to-gray-100" dir="rtl">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-l bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="p-6 space-y-6 h-full flex flex-col">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/favicon.svg" alt="logo" className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">الديار العالمية</div>
              <div className="text-sm text-gray-500">مرحباً، {admin!.username}</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            <Link href="/dashboard" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium">نظرة عامة</span>
            </Link>
            
            <Link href="/dashboard/projects" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium">المشاريع</span>
            </Link>
            
            <Link href="/dashboard/projects/add" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium">إضافة مشروع</span>
            </Link>
            
            <Link href="/dashboard/comments" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">التعليقات</span>
            </Link>
            
            <hr className="my-4 border-gray-200" />
            
            <Link href="/portfolio" target="_blank" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium">معاينة الموقع</span>
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            
            <Link href="/dashboard/settings" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">الإعدادات</span>
            </Link>
          </nav>
          
          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <div className="mb-1">© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
              <div className="text-blue-600 font-medium">محترفين الديار العالمية</div>
            </div>
          </div>
        </div>
      </aside>
      
      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">لوحة التحكم المتقدمة</div>
              <div suppressHydrationWarning>
                <HeaderClient />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  )
}
