import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getNonce, updateNonce } from '@lib/supabase';
import { generateSignatureMessage } from '@lib/eth/generateSignatureMessage';
import { isValidPublicAddress } from '@lib/eth';

export type TokenPayload = { address: String };

/**
 * Handles a POST request to /api/auth/
 */
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { publicAddress, signature } = req.body;
		if (!publicAddress) {
			return res.status(400).json({ error: 'Missing publicAddress' });
		} else if (!isValidPublicAddress(publicAddress)) {
			return res.status(400).json({ error: 'Invalid publicAddress' });
		} else if (!signature) {
			return res.status(400).json({ error: 'Missing signature' });
		}

		// Step 1: Get the nonce for the given publicAddress
		const data = await getNonce(publicAddress).catch((err) => res.status(500).send(err));

		// Step 2: Verify digital signature
		try {
			const msg = generateSignatureMessage(data.nonce);
			const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
			const recoveredAddress = recoverPersonalSignature({
				data: msgBufferHex,
				sig: signature,
			});
			// The signature is valid if the given address matches the recovered address
			if (recoveredAddress.toLowerCase() !== publicAddress.toLowerCase()) {
				return res.status(401).send({ error: 'Invalid Signature' });
			}
		} catch (err) {
			return res.status(401).send({ error: 'Signature verification failed' });
		}

		// Step 3: Generate a new nonce for the user
		await updateNonce(publicAddress).catch((err) => res.status(500).send(err));

		// Step 4: Create JWT
		const token = jwt.sign({ address: publicAddress.toLowerCase() }, process.env.JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '24h',
		});
		return res.status(200).send({ loginToken: token });
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
