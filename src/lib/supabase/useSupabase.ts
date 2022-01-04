import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseClient: SupabaseClient;

export const useSupabase = () => {
	if (!_supabaseClient) {
		// NOTE: These keys are safe to use in a browser since we have enabled Row Level Security for
		// our tables and configured policies to prevent misuse.
		_supabaseClient = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_KEY
		);
	}
	return _supabaseClient;
};
