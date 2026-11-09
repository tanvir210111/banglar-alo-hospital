import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const adminDist = path.join(rootDir, 'admin-panel', 'client', 'dist');
const websiteDist = path.join(rootDir, 'main-website', 'client', 'dist');
const websiteAdminDist = path.join(websiteDist, 'admin');
const rootDist = path.join(rootDir, 'dist');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🔄 Merging Admin Panel build into Main Website dist (/admin)...');

if (fs.existsSync(adminDist)) {
  copyRecursiveSync(adminDist, websiteAdminDist);
  console.log('✅ Admin Panel build copied to main-website/client/dist/admin');
} else {
  console.warn('⚠️ admin-panel/client/dist not found.');
}

if (fs.existsSync(websiteDist)) {
  copyRecursiveSync(websiteDist, rootDist);
  console.log('✅ Unified dist copied to root dist/');
}

console.log('🎉 Unified Build Ready for Vercel!');

