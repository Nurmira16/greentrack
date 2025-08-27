// src/services/authService.js
import supabase from "./supabaseClient";

// Sign up new user
export async function signUp(email, password) {
  return await supabase.auth.signUp({ email, password }, {redirectTo:"https://Nurmira16.github.io/greentrack"});
}

// Log in
export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

// Log out
export async function signOut() {
  return await supabase.auth.signOut();
}

// Get current user
export async function getUser() {
  return await supabase.auth.getUser();
}
