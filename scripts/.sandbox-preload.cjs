// Dev-only workaround for the local Windows sandbox: Vite probes `net use`
// via child_process.exec, which cannot open a named pipe here. This preload
// makes that specific probe a no-op. It is not part of the site bundle.
const childProcess = require('node:child_process');

const originalExec = childProcess.exec;
childProcess.exec = function patchedExec(command, options, callback) {
  if (typeof command === 'string' && command.trim().toLowerCase() === 'net use') {
    const done = typeof options === 'function' ? options : callback;
    if (typeof done === 'function') process.nextTick(() => done(null, '', ''));
    return { on() {}, kill() {} };
  }
  return originalExec.apply(this, arguments);
};
