import { isValidPublicAddress } from '@lib/eth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateNonce } from '@lib/supabase';

/**
 * Returns the nonce for the given publicAddress.
 */
export default async function users(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const { publicAddress } = req.query;
		if (!publicAddress) {
			return res.status(400).send({ error: 'Request should have publicAddress' });
		}
		if (typeof publicAddress !== 'string' || !isValidPublicAddress(publicAddress as string)) {
			return res.status(400).send({ error: 'Invalid publicAddress' });
		}
		return await updateNonce(publicAddress as string)
			.then(({ nonce }) => res.status(200).send({ publicAddress, nonce }))
			.catch((err) => res.status(500).send(err));
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
