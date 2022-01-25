import { useSupabase } from './useSupabase';

/**
 * Returns the nonce for the given publicAddress as a number.
 * @param publicAddress The public address of the user.
 */
export const getNonce = async (publicAddress: string): Promise<any> => {
	const supabase = useSupabase();
	const { data, error } = await supabase
		.from('nonces')
		.select('address, nonce')
		.eq('address', publicAddress);
	if (error) {
		throw new Error(error.message);
	} else {
		return data[0]; // TODO: handle empty data
	}
};
