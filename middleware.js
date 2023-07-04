import { withAuth } from 'next-auth/middleware'

export default withAuth({
    // Options
    pages: {
        signIn: '/', // so that users are redirected to / when they are not signed in
    }
})

export const config = {
    matcher: [
        '/users/:path*'
    ]
}

