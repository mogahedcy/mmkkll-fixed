import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS faqs (
        id TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT NOT NULL,
        "order" INTEGER DEFAULT 0,
        status TEXT DEFAULT 'PUBLISHED',
        featured BOOLEAN DEFAULT false,
        views INTEGER DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_faqs_category_status_order 
      ON faqs(category, status, "order");
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'FAQs table created successfully' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
