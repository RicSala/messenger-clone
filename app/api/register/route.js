import bcrypt from 'bcryptjs';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {

        const body = await req.json();

        const { email, password, name } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Bad credentials' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
