import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

console.log('🚀 ThinkBoard Backend Setup');
console.log('============================\n');

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
} else {
  console.log('📝 Creating .env file from template...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please edit the .env file and add your configuration values:');
    console.log('   - MONGODB_URI: Your MongoDB connection string');
    console.log('   - JWT_SECRET: A secure random string for JWT tokens');
    console.log('   - SESSION_SECRET: A secure random string for sessions');
    console.log('   - GOOGLE_CLIENT_ID: Your Google OAuth client ID');
    console.log('   - GOOGLE_CLIENT_SECRET: Your Google OAuth client secret');
    console.log('   - UPSTASH_REDIS_REST_URL: Your Upstash Redis URL (optional)');
    console.log('   - UPSTASH_REDIS_REST_TOKEN: Your Upstash Redis token (optional)');
  } else {
    console.log('❌ env.example file not found');
  }
}

console.log('\n📋 Next steps:');
console.log('1. Edit the .env file with your configuration values');
console.log('2. Set up Google OAuth credentials at https://console.cloud.google.com/');
console.log('3. Run "npm run dev" to start the development server');
console.log('\n🔗 For detailed setup instructions, see the README.md file');
