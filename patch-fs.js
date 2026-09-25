const fs = require('fs');

function transformReadlinkError(err) {
  if (err && (err.code === 'EISDIR' || err.message?.includes('illegal operation on a directory, readlink'))) {
    const newErr = new Error(`EINVAL: invalid argument, readlink '${err.path || ''}'`);
    newErr.code = 'EINVAL';
    newErr.errno = -4071;
    newErr.syscall = 'readlink';
    newErr.path = err.path;
    return newErr;
  }
  return err;
}

function handleMkdirError(err, path) {
  if (err && err.code === 'EPERM') {
    try {
      if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
        return null; // Directory already exists on FAT32/exFAT, treat as success
      }
    } catch (_) {}
  }
  return err;
}

// 1. Patch readlink
const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  const cb = typeof options === 'function' ? options : callback;
  const opts = typeof options === 'function' ? undefined : options;
  return origReadlink.call(fs, path, opts, (err, linkString) => {
    if (cb) cb(transformReadlinkError(err), linkString);
  });
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    throw transformReadlinkError(err);
  }
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      throw transformReadlinkError(err);
    }
  };
}

// 2. Patch mkdir
const origMkdir = fs.mkdir;
fs.mkdir = function (path, options, callback) {
  const cb = typeof options === 'function' ? options : callback;
  const opts = typeof options === 'function' ? undefined : options;
  return origMkdir.call(fs, path, opts, (err, ...rest) => {
    const handled = handleMkdirError(err, path);
    if (cb) cb(handled, ...rest);
  });
};

const origMkdirSync = fs.mkdirSync;
fs.mkdirSync = function (path, options) {
  try {
    return origMkdirSync.call(fs, path, options);
  } catch (err) {
    const handled = handleMkdirError(err, path);
    if (handled) throw handled;
  }
};

if (fs.promises && fs.promises.mkdir) {
  const origPromisesMkdir = fs.promises.mkdir;
  fs.promises.mkdir = async function (path, options) {
    try {
      return await origPromisesMkdir.call(fs.promises, path, options);
    } catch (err) {
      const handled = handleMkdirError(err, path);
      if (handled) throw handled;
    }
  };
}
