const exec = require('child_process').exec;
const isDebug = false;

function execute(...commands) {
  const command = commands.join(' && ');
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error && isDebug) {
        console.warn(error);
      }
      const out = stdout ? stdout : stderr;
      console.log(out);
      resolve(out);
    });
  });
}

function executeStream(...commands) {
  const command = commands.join(' && ');

  return new Promise((resolve, reject) => {

    const myShellScript = exec(command);
  
    myShellScript.stdout.on('data', (data) => {
      console.log(data);
    });
    myShellScript.stderr.on('data', (data) => {
      console.error(data);
    });
  
    myShellScript.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
      resolve();
    });

  });

}

// exports.runn = runn;
exports.run = executeStream;
