import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'https://nathannfs.vercel.app/api',
  // hooks: {
  //   beforeRequest: [
  //     async (request) => {
  //       let cookieStore: CookiesFn | undefined

  //       if (typeof window === 'undefined') {
  //         const { cookies: serverCookies } = await import('next/headers')
  //         cookieStore = serverCookies
  //       }

  //       const token = await getCookie('token-bz', { cookies: cookieStore })

  //       if (token) {
  //         request.headers.set('Authorization', `Bearer ${token}`)
  //       }
  //     },
  //   ],
  // },
})
