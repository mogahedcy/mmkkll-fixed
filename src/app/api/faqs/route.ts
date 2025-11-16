import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
      return null;
    }
    
    const decoded = verifyToken(token) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'PUBLISHED';
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = { status };
    
    if (category && category !== 'all') {
      where.category = category;
    }

    const faqs = await prisma.faqs.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });

    return NextResponse.json({
      success: true,
      faqs,
      total: faqs.length
    });
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await checkAuth();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { question, answer, category, order, featured, status } = body;

    if (!question || !answer || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const faq = await prisma.faqs.create({
      data: {
        question,
        answer,
        category,
        order: order || 0,
        featured: featured || false,
        status: status || 'PUBLISHED'
      }
    });

    return NextResponse.json({
      success: true,
      faq
    });
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
