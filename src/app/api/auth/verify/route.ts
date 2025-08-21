import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    const admin = await authenticateAdmin(request);

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.adminId,
        username: admin.username
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'غير مصرح' },
      { status: 401 }
    );
  }
}