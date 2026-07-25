"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { AuthState } from "@/types/user"

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setState({
          user: {
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            locale: "en",
            created_at: session.user.created_at,
          },
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        getUser()
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return state
}
