"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function useShortlist(userId?: string) {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) {
      setSavedIds([])
      setIsLoading(false)
      return
    }

    const fetchShortlist = async () => {
      const { data, error } = await supabase
        .from("shortlists")
        .select("property_id")
        .eq("user_id", userId)

      if (!error && data) {
        setSavedIds(data.map(item => item.property_id))
      }
      setIsLoading(false)
    }

    fetchShortlist()
  }, [userId, supabase])

  const toggleSave = async (propertyId: string) => {
    if (!userId) return false // Require login

    const isSaved = savedIds.includes(propertyId)
    
    // Optimistic UI update
    setSavedIds(prev => 
      isSaved ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    )

    try {
      if (isSaved) {
        await supabase
          .from("shortlists")
          .delete()
          .eq("user_id", userId)
          .eq("property_id", propertyId)
      } else {
        await supabase
          .from("shortlists")
          .insert({ user_id: userId, property_id: propertyId })
      }
      return true
    } catch (error) {
      // Revert on error
      setSavedIds(prev => 
        isSaved ? [...prev, propertyId] : prev.filter(id => id !== propertyId)
      )
      return false
    }
  }

  return { savedIds, toggleSave, isLoading }
}
