import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbehomikovbwvwkileeh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

console.log(supabaseUrl, supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey)

console.log(supabase)
// Supabase auth functions
const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return user
}

const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return user
}

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

module.exports =  { supabase, signUp, signIn, signOut }
