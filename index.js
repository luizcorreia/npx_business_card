#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");
clear();

const prompt = inquirer.createPromptModule();

const EMAIL = "luiz@luizcorreia.eti.br";
const TWITTER = "luiz__correia";
const LINKEDIN = "luizgcorreia";
const SITE = "https://luizcorreia.eti.br";
const GITHUB = "luizcorreia";
const TITLE = "Creative Enginner";
const COMPANY = "Rethink";
const NAME = "Luiz Correia";

const questions = [
  {
    type: "list",
    name: "action",
    message: "What you want to do?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: () => {
          open(`mailto:${EMAIL}`);
          console.log("\nDone, see you soon at inbox.\n");
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
        value: () => {
          // cliSpinners.dots;
          const loader = ora({
            text: " Downloading Resume",
            spinner: cliSpinners.material,
          }).start();
          let pipe = request(`${SITE}/resume`).pipe(
            fs.createWriteStream("./anmol-resume.html")
          );
          pipe.on("finish", function () {
            let downloadPath = path.join(process.cwd(), "anmol-resume.html");
            console.log(`\nResume Downloaded at ${downloadPath} \n`);
            open(downloadPath);
            loader.stop();
          });
        },
      },
      {
        name: "Just quit.",
        value: () => {
          console.log("Hasta la vista.\n");
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.green(`                  ${NAME}`),
  handle: chalk.white(`@${GITHUB}`),
  work: `${chalk.white(`${TITLE} at`)} ${chalk.hex("#2b82b2").bold(COMPANY)}`,
  twitter: chalk.gray("https://twitter.com/") + chalk.cyan(TWITTER),
  github: chalk.gray("https://github.com/") + chalk.green(GITHUB),
  linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue(LINKEDIN),
  web: chalk.cyan(SITE),
  npx: chalk.red("npx") + " " + chalk.white(GITHUB),

  labelWork: chalk.white.bold("       Work:"),
  labelTwitter: chalk.white.bold("    Twitter:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelWeb: chalk.white.bold("        Web:"),
  labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("I am currently looking for new opportunities,")}`,
    `${chalk.italic("my inbox is always open. Whether you have a")}`,
    `${chalk.italic("question or just want to say hi, I will try ")}`,
    `${chalk.italic("my best to get back to you!")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
  }
);

console.log(me);
const tip = [
  `Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
  "",
].join("\n");
console.log(tip);

prompt(questions).then((answer) => answer.action());
