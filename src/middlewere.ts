import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')

    console.log('Token:', token)  // クッキーの値をコンソールに出力して確認

    if (!token) {
        console.error('Token is missing or undefined')  // トークンがない場合のエラーログ
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // トークンが存在する場合の処理
    console.log('User is authenticated')
    return NextResponse.next()  // 次の処理に進む
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!auth/).*)',
}