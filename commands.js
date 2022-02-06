const fs = require("fs");
const request = require("request");

function pwd(args, done) {
  done(process.cwd());
}

function date(args, done) {
  done(Date());
}

function ls(args, done) {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    let response = "";
    files.forEach(function (file) {
      response += file + "\n"; //cohersión (ojo)
    });
    done(response);
  });
}

function echo(args, done) {
  let response = "";
  args.forEach(arg => {
    let command = arg.slice(1);
    if (process.env[command]) {
      response = process.env[command];
    } else {
      response += `${arg} `;
    }
  });
  done(response);
}

function cat(args, done) {
  fs.readFile(`./${args}`, function read(err, data) {
    if (err) throw err;
    done(data);
  });
}

function head(args, done) {
  fs.readFile(`./${args}`, "utf-8", function (err, data) {
    if (err) throw err;

    let lines = data.split("\n");
    let size = 5;
    let response = "";
    response = lines.slice(0, size).join("\n");

    done(response);
  });
}

function tail(args, done) {
  fs.readFile(`./${args}`, "utf-8", function (err, data) {
    if (err) throw err;

    let lines = data.split("\n");
    let size = 5;
    let response = "";
    lines.slice(lines.length - size, lines.length).map((line) => {
      response += `${line}\n`;
    });

    done(response);
  });
}

function curl(args, done) {
  request(args.toString(), (err, response, body) => {
    if (err) throw err;
    done(body);
  });
}

module.exports = { pwd, date, ls, echo, cat, head, tail, curl };
