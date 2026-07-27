/** Authenticated user profile */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  locale: 'en' | 'ar';
  created_at: string;
}

/** Auth session state */
export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
