import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Debug Environment Variables');
console.log('=============================\n');

// Load .env file
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Environment variables after dotenv.config():');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? `"${process.env.GOOGLE_CLIENT_ID}"` : 'undefined');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? `"${process.env.GOOGLE_CLIENT_SECRET}"` : 'undefined');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'set' : 'undefined');

console.log('\nChecking if variables are truthy:');
console.log('GOOGLE_CLIENT_ID truthy:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET truthy:', !!process.env.GOOGLE_CLIENT_SECRET);

console.log('\nChecking variable lengths:');
console.log('GOOGLE_CLIENT_ID length:', process.env.GOOGLE_CLIENT_ID?.length || 0);
console.log('GOOGLE_CLIENT_SECRET length:', process.env.GOOGLE_CLIENT_SECRET?.length || 0);
