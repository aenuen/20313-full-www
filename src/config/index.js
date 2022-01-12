export const axiosConfig = {
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:20310' : 'http://localhost:20310',
  noToken: [/^\/public/, /^\/login/]
}
