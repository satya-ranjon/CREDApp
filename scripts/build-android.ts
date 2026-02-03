/**
 * Android APK Build Script
 * ============================================
 * This script builds Android APKs for staging or production
 * and organizes them in the apk/ folder at project root
 *
 * Usage:
 *   pnpm run build              # Interactive mode - select option
 *   pnpm run build -- staging   # Build staging APK directly
 *   pnpm run build -- prod      # Build production APK directly
 *   pnpm run build -- all       # Build both APKs directly
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

// Paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ANDROID_DIR = path.join(PROJECT_ROOT, 'android');
const APK_DIR = path.join(PROJECT_ROOT, 'apk');

const GRADLE_DEBUG_APK = path.join(ANDROID_DIR, 'app/build/outputs/apk/debug/app-debug.apk');
const GRADLE_RELEASE_APK = path.join(ANDROID_DIR, 'app/build/outputs/apk/release/app-release.apk');

// Build types
type BuildType = 'staging' | 'prod' | 'all';

// Logging functions
function printInfo(message: string): void {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

function printSuccess(message: string): void {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function printWarning(message: string): void {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function printError(message: string): void {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

// Show interactive menu and get user selection
function showMenu(): Promise<BuildType> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log('');
    console.log('  Android Build Options');
    console.log('  ---------------------');
    console.log('');
    console.log('  [1] Staging  - Debug APK');
    console.log('  [2] Prod     - Release APK');
    console.log('  [3] All      - Both APKs');
    console.log('');

    rl.question('Select an option (1-3): ', (answer: string) => {
      rl.close();

      const option = answer.trim();

      switch (option) {
        case '1':
          resolve('staging');
          break;
        case '2':
          resolve('prod');
          break;
        case '3':
          resolve('all');
          break;
        default:
          printError(`Invalid option: ${option}`);
          process.exit(1);
      }
    });
  });
}

// Setup directory structure
function setupDirectories(): void {
  printInfo('Setting up APK directory structure...');

  const stagingDir = path.join(APK_DIR, 'staging');
  const prodDir = path.join(APK_DIR, 'prod');

  if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir, { recursive: true });
  }

  if (!fs.existsSync(prodDir)) {
    fs.mkdirSync(prodDir, { recursive: true });
  }

  printSuccess(`Directory structure ready: ${APK_DIR}`);
}

// Clean previous APK files
function cleanPreviousApk(targetDir: string, folderName: string): void {
  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    const apkFiles = files.filter((file: string) => file.endsWith('.apk'));

    if (apkFiles.length > 0) {
      printWarning(`Removing previous APK(s) from ${folderName} folder...`);

      apkFiles.forEach((apkFile: string) => {
        const filePath = path.join(targetDir, apkFile);
        fs.unlinkSync(filePath);
      });

      printSuccess('Previous APK(s) removed');
    }
  }
}

// Generate timestamp for APK naming
function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// Get file size in human readable format
function getFileSize(filePath: string): string {
  const stats = fs.statSync(filePath);
  const bytes = stats.size;

  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Build staging APK
function buildStaging(): void {
  printInfo('==========================================');
  printInfo('Building STAGING APK (Debug)...');
  printInfo('==========================================');

  const stagingDir = path.join(APK_DIR, 'staging');

  // Clean previous staging APK
  cleanPreviousApk(stagingDir, 'staging');

  // Run Gradle build
  printInfo('Running Gradle assembleDebug...');

  try {
    execSync('./gradlew assembleDebug', {
      cwd: ANDROID_DIR,
      stdio: 'inherit',
    });
  } catch (error) {
    printError('Failed to build staging APK');
    process.exit(1);
  }

  // Check if APK was created and copy it
  if (fs.existsSync(GRADLE_DEBUG_APK)) {
    const timestamp = getTimestamp();
    const apkName = `CREDApp-staging-${timestamp}.apk`;
    const destPath = path.join(stagingDir, apkName);

    fs.copyFileSync(GRADLE_DEBUG_APK, destPath);

    printSuccess('Staging APK built successfully!');
    printSuccess(`Location: ${destPath}`);
  } else {
    printError('Failed to build staging APK - APK file not found');
    process.exit(1);
  }
}

// Build production APK
function buildProd(): void {
  printInfo('==========================================');
  printInfo('Building PRODUCTION APK (Release)...');
  printInfo('==========================================');

  const prodDir = path.join(APK_DIR, 'prod');

  // Clean previous prod APK
  cleanPreviousApk(prodDir, 'prod');

  // Run Gradle build
  printInfo('Running Gradle assembleRelease...');

  try {
    execSync('./gradlew assembleRelease', {
      cwd: ANDROID_DIR,
      stdio: 'inherit',
    });
  } catch (error) {
    printError('Failed to build production APK');
    process.exit(1);
  }

  // Check if APK was created and copy it
  if (fs.existsSync(GRADLE_RELEASE_APK)) {
    const timestamp = getTimestamp();
    const apkName = `CREDApp-prod-${timestamp}.apk`;
    const destPath = path.join(prodDir, apkName);

    fs.copyFileSync(GRADLE_RELEASE_APK, destPath);

    printSuccess('Production APK built successfully!');
    printSuccess(`Location: ${destPath}`);
  } else {
    printError('Failed to build production APK - APK file not found');
    process.exit(1);
  }
}

// Show build summary
function showSummary(): void {
  console.log('');
  printInfo('==========================================');
  printInfo('BUILD SUMMARY');
  printInfo('==========================================');
  console.log('');

  printInfo(`APK Location: ${APK_DIR}`);
  console.log('');

  const stagingDir = path.join(APK_DIR, 'staging');
  const prodDir = path.join(APK_DIR, 'prod');

  if (fs.existsSync(stagingDir)) {
    console.log('📁 staging/');
    const files = fs.readdirSync(stagingDir);
    files
      .filter((file: string) => file.endsWith('.apk'))
      .forEach((file: string) => {
        const filePath = path.join(stagingDir, file);
        const size = getFileSize(filePath);
        console.log(`   └── ${file} (${size})`);
      });
  }

  if (fs.existsSync(prodDir)) {
    console.log('📁 prod/');
    const files = fs.readdirSync(prodDir);
    files
      .filter((file: string) => file.endsWith('.apk'))
      .forEach((file: string) => {
        const filePath = path.join(prodDir, file);
        const size = getFileSize(filePath);
        console.log(`   └── ${file} (${size})`);
      });
  }

  console.log('');
}

// Execute build based on type
function executeBuild(buildType: BuildType): void {
  // Setup directories
  setupDirectories();

  // Build based on type
  switch (buildType) {
    case 'staging':
      buildStaging();
      break;
    case 'prod':
      buildProd();
      break;
    case 'all':
      buildStaging();
      console.log('');
      buildProd();
      break;
  }

  // Show summary
  showSummary();

  printSuccess('Build complete! 🎉');
}

// Main execution
async function main(): Promise<void> {
  console.log('');
  printInfo('🚀 CREDApp Android Build Script');
  printInfo('================================');

  const args = process.argv.slice(2);
  let buildType!: BuildType;

  // Check if argument is provided directly
  if (args.length > 0) {
    const arg = args[0];
    if (arg === 'staging' || arg === 'prod' || arg === 'all') {
      buildType = arg;
    } else {
      printError(`Invalid option: ${arg}`);
      console.log('Valid options: staging, prod, all');
      process.exit(1);
    }
  } else {
    // Show interactive menu
    buildType = await showMenu();
  }

  console.log('');
  printInfo(`Selected: ${buildType.toUpperCase()}`);
  console.log('');

  executeBuild(buildType);
}

// Run the script
main().catch((error: unknown) => {
  printError(`Build failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
