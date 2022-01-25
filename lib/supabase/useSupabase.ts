import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseClient: SupabaseClient;

export const useSupabase = () => {
	if (!_supabaseClient) {
		// NOTE: These keys are safe to use in a browser since we have enabled Row Level Security for
		// our tables and configured policies to prevent misuse.
		const SUPABASE_KEY =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDkwNDA0NiwiZXhwIjoxOTU2NDgwMDQ2fQ.QWW7v1d2LoVhaRX7Wlwi9YRG45KdAaycR1a9ziEP8Qw';
		const SUPABASE_URL = 'https://jqemzbdznopmpjijrdix.supabase.co';
		_supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
	}
	return _supabaseClient;
};
