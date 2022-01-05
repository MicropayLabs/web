import { useSupabase } from './useSupabase';

/**
 * Updates the nonce for the given publicAddress with a new random nonce.
 * @param publicAddress The public address of the user.
 */
export const updateNonce = async (publicAddress: string) => {
	const MAX_INT = 2147483647;
	const supabase = useSupabase();

	const { data, error } = await supabase.from('nonces').upsert({
		address: publicAddress,
		nonce: Math.floor(Math.random() * MAX_INT),
	});

	if (error) {
		console.log(error);
		throw new Error(error.message);
	} else {
		console.log(data);
		return data[0]; // TODO: handle empty data
	}
};
