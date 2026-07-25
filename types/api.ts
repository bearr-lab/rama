import type { Property } from "./property"

/** AI chat message */
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  property_cards?: Property[]
  created_at: string
}

/** API response wrapper */
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  count?: number
}

/** Paginated response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number
  per_page: number
  total: number
  has_more: boolean
}

/** AI chat request body */
export interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[]
  property_context?: Property | null
}

/** Rate limit info returned in headers */
export interface RateLimitInfo {
  remaining: number
  reset_at: string
}
