
module.exports = {
    env: {
        SUPABASE_KEY: process.env.SUPABASE_KEY,
        API_URL: process.env.NEXT_PUBLIC_API_URL?process.env.NEXT_PUBLIC_API_URL:"http://localhost:5000"
    },

  }