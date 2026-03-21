#!/usr/bin/env node
/**
 * SS Logistics - Automated Setup Script
 * Run: node scripts/setup.js  OR  npm run setup
 *
 * This script:
 *  1. Copies .env.example → .env for backend and frontend (if not already present)
 *  2. Installs npm dependencies for backend and frontend
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function run(cmd, cwd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { cwd: cwd || ROOT, stdio: 'inherit' });
}

function copyEnv(dir) {
  const example = path.join(ROOT, dir, '.env.example');
  const target = path.join(ROOT, dir, '.env');
  if (!fs.existsSync(target)) {
    fs.copyFileSync(example, target);
    console.log(`✅ Created ${dir}/.env from .env.example`);
  } else {
    console.log(`ℹ️  ${dir}/.env already exists — skipping`);
  }
}

console.log('\n🚛  SS Logistics — Setup\n' + '='.repeat(40));

// 1. Copy .env files
console.log('\n📋 Setting up environment files...');
copyEnv('backend');
copyEnv('frontend');

// 2. Install root deps (concurrently)
console.log('\n📦 Installing root dev dependencies...');
run('npm install');

// 3. Install backend deps
console.log('\n📦 Installing backend dependencies...');
run('npm install', path.join(ROOT, 'backend'));

// 4. Install frontend deps
console.log('\n📦 Installing frontend dependencies...');
run('npm install', path.join(ROOT, 'frontend'));

console.log(`
${'='.repeat(40)}
✅ Setup complete!

Next steps:
  1. (Optional) Edit backend/.env to set your MongoDB URI:
     MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/sslogistics

  2. Start both servers together:
     npm run dev

  3. Open http://localhost:3000 in your browser

🔗 Backend API: http://localhost:5000/api/health
${'='.repeat(40)}
`);
