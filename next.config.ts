import type { NextConfig } from "next";
import path from "path";

// Fix for FAT32 / exFAT drives where readlink produces EISDIR instead of EINVAL
const patchPath = path.resolve(__dirname, "patch-fs.js").replace(/\\/g, "/");
if (!process.env.NODE_OPTIONS?.includes("patch-fs.js")) {
  process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ""} --require "${patchPath}"`.trim();
}
try {
  require("./patch-fs.js");
} catch (e) {}

const nextConfig: NextConfig = {
  distDir: process.env.DIST_DIR || ".next",
};

export default nextConfig;
