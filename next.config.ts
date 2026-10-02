import type { NextConfig } from "next";

// Remove any stale patch-fs.js references from NODE_OPTIONS left by previous runs
if (process.env.NODE_OPTIONS?.includes('patch-fs.js')) {
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS
    .replace(/--require\s+"?[^\s"]*patch-fs\.js"?/g, '')
    .trim() || undefined;
}

// patch-fs.js is only needed on Windows FAT32/exFAT drives for local dev.
// Never set NODE_OPTIONS — it causes build worker failures with path quoting issues.
if (process.platform === 'win32') {
  try {
    require('./patch-fs.js');
  } catch (e) {
    // Optional — silently ignore if not present
  }
}

const nextConfig: NextConfig = {};

export default nextConfig;
