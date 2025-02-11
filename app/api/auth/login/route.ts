import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Import shared Prisma instance
import { verifyPassword } from '@/app/lib/auth';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: 'Server error: missing JWT secret' }, { status: 500 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    return NextResponse.json(
      { message: 'Logged in successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `auth-token=${token}; HttpOnly; Path=/; ${
            process.env.NODE_ENV === 'production' ? 'Secure;' : ''
          } SameSite=Strict; Max-Age=86400`,
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
