const commands = require("./commands");

function done(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");
// El evento STDIN 'data' se dispara cuando el usuario escribe una línea.

process.stdin.on("data", function (data) {
  let parametros = data.toString().trim();
  parametros = parametros.split(" ");

  const cmd = parametros[0];
  if (parametros.length > 1) parametros.shift();
  // const userCommand = cmd;
  commands[cmd](parametros, done);
});
