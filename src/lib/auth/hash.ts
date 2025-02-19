import { sha256 } from '@oslojs/crypto/sha2';

/**
 * Hashes the password with SHA-256 and returns a the hashed password as a hex string.
 *
 * @param password
 * @returns
 */
export const hash = (password: string) => {
	const buffer = Buffer.from(password);
	const hashed = sha256(buffer);
	const hex = Array.from(hashed)
		.map((i) => i.toString(16).padStart(2, '0'))
		.join('');

	return hex;
};

/**
 * Compares the hash of the password with the hashed password.
 *
 * Returns `true` if the password matches, `false` otherwise.
 *
 * @param password
 * @param hashed
 * @returns
 */
export const verify = (password: string, hashed: string) => {
	const hashedPassword = hash(password);
	return hashedPassword === hashed;
};
