import { SHA3 } from 'sha3';

/**
 * Checks if the given string is a valid public address
 *
 * @param address the given HEX adress
 */
export const isValidPublicAddress = (address: string): boolean => {
	if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
		// check if it has the basic requirements of an address
		return false;
	} else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
		// If it's all small caps or all all caps, return true
		return true;
	} else {
		return true;
		// TODO: Allow matrixID with uppercase characters
		// return _isChecksumAddress(address);
	}
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
export const _isChecksumAddress = (address: string): boolean => {
	address = address.replace('0x', '');
	const hash = new SHA3(256);
	var addressHash = hash.update(address.toLowerCase()).digest().toString();
	for (var i = 0; i < 40; i++) {
		// the nth letter should be uppercase if the nth digit of casemap is 1
		if (
			(parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
			(parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
		) {
			return false;
		}
	}
	return true;
};
