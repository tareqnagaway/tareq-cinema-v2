import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Initialize Supabase only if valid URL is provided
let supabase: any = {
  from: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
  auth: {
    signInWithOAuth: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null } }),
  }
};

if (supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase initialization failed');
  }
}

export { supabase };

// Watchlist functions
export const watchlistApi = {
  // Get user's watchlist
  getWatchlist: async (userId: string) => {
    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Add to watchlist
  addToWatchlist: async (userId: string, item: any) => {
    const { data, error } = await supabase
      .from('watchlist')
      .insert({
        user_id: userId,
        media_id: item.id,
        media_type: item.type,
        title: item.title || item.name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        added_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Remove from watchlist
  removeFromWatchlist: async (userId: string, mediaId: number) => {
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('media_id', mediaId);
    
    if (error) throw error;
  },

  // Check if in watchlist
  isInWatchlist: async (userId: string, mediaId: number) => {
    const { data, error } = await supabase
      .from('watchlist')
      .select('id')
      .eq('user_id', userId)
      .eq('media_id', mediaId)
      .single();
    
    return !!data && !error;
  },
};

// Comments functions
export const commentsApi = {
  // Get comments for media
  getComments: async (mediaId: number, mediaType: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (full_name, avatar_url)
      `)
      .eq('media_id', mediaId)
      .eq('media_type', mediaType)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Add comment
  addComment: async (userId: string, comment: any) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        user_id: userId,
        media_id: comment.mediaId,
        media_type: comment.mediaType,
        content: comment.content,
        rating: comment.rating,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete comment
  deleteComment: async (commentId: string, userId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId);
    
    if (error) throw error;
  },

  // Update comment
  updateComment: async (commentId: string, userId: string, content: string) => {
    const { data, error } = await supabase
      .from('comments')
      .update({ 
        content, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', commentId)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Profile functions
export const profileApi = {
  // Get user profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update profile
  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Auth helpers
export const authHelpers = {
  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
    return data;
  },

  // Sign in with email
  signInWithEmail: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  // Sign up with email
  signUpWithEmail: async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};
