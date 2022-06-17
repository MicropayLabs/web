import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseClient: SupabaseClient;

export const useSupabase = () => {
	if (!_supabaseClient) {
		// NOTE: These keys are safe to use in a browser since we have enabled Row Level Security for
		// our tables and configured policies to prevent misuse.
		const SUPABASE_KEY =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYWpqdnFkam5ob3RqY3R0cXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU0MTcwOTMsImV4cCI6MTk3MDk5MzA5M30.xn5D98ujvMy8z07kWBofG1h6Mx9AQF0fngWmEEv95vY';
		const SUPABASE_URL = 'https://xoajjvqdjnhotjcttqxk.supabase.co';
		_supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
	}
	return _supabaseClient;
};
