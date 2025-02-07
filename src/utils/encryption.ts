import crypto from 'crypto';

const ENCRYPTION_KEY = crypto.randomBytes(32); // Fallback to a random key if env variable is not set
const IV_LENGTH = 16; // AES block size is 16 bytes

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Prepend the IV to the encrypted text
    return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
    const textParts = text.split(':');
    if (textParts.length !== 2) {
        throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(textParts[0], 'hex');
    if (iv.length !== IV_LENGTH) {
        throw new Error('Invalid IV length');
    }

    const encryptedText = textParts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
