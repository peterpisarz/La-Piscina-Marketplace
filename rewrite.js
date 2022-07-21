"use strict";
//************************WARNING: THIS PROGRAM WRITES OVER EXISTING CONTRACT DATA**********************
// JAVASCRIPT DIRECTORY TOOLS
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require('fs')
console.log(basePath)

// VARIABLES TO BE REPLACED
const ContractName = "OpenPunks"
const contractName = "openPunks"
const ContractSpace = "Open Punks"
const ContractUnder = "open_punks"

// NEW VARIABLE NAMES - *** UPDATE THESE BEFORE RUNNING ***
const NewContract = "ShowTime"
const NewSpace = "Show Time"
const newContract = "showTime"
const setContract = "setShowTime"
const newPackage = "show_time"
const newDash = "show-time"

// PATHS TO FILES NEEDING VARIABLE REWRITE
const contract = path.join(basePath, "src/contracts/OpenPunks.sol")
const newcontract = path.join(basePath, "src/contracts/", NewContract + ".sol")
const originalTest = path.join(basePath, "test/OpenPunks.test.js")
const newtest = path.join(basePath, "test/", NewContract + ".test.js")
const deployContract = path.join(basePath, "migrations/2_deploy_contracts.js")
const packagejson = path.join(basePath, "package.json")
const configjson = path.join(basePath, "src/config.json")

// CONSOLE LOGS
console.log(contract + " >>> " + newcontract)
console.log(ContractName + " >>> " + NewContract)
console.log(contractName + " >>> " + newContract)

// REPLACE VARIABLES IN MAIN CONTRACT
fs.readFile(contract, 'utf8', function (err,data) {

  var formatted = data.replace(/OpenPunks/g, NewContract).replace(/openPunks/g, newContract).replace(/'Open Punks'/g, ContractSpace);

 fs.writeFile(newcontract, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});

// REPLACE VARIABLES IN TEST FILE
fs.readFile(originalTest, 'utf8', function (err,data) {

  var formatted = data.replace(/OpenPunks/g, NewContract).replace(/openPunks/g, newContract).replace(/"Open Punks"/g, ContractSpace);

 fs.writeFile(newtest, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});

// Replace VARIABLES IN 2_deploy_contracts.js
fs.readFile(deployContract, 'utf8', function (err,data) {

  var formatted = data.replace(/OpenPunks/g, NewContract).replace(/openPunks/g, newContract).replace(/"Open Punks"/g, ContractSpace);

 fs.writeFile(deployContract, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});

// REPLACE VARIABLES IN App.js
fs.readFile(path.join(basePath, "src/components/App.js"), 'utf8', function (err,data) {

  var formatted = data.replace(/OpenPunks/g, NewContract).replace(/openPunks/g, newContract).replace(/"Open Punks"/g, ContractSpace).replace(/"setOpenPunks"/g, setContract);

 fs.writeFile(path.join(basePath, "src/components/App.js"), formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});

// Replace package.json
fs.readFile(packagejson, 'utf8', function (err,data) {

  var formatted = data.replace(/open_punks/g, newPackage)
    .replace(/openPunks/g, newContract)
    .replace(/"Open Punks"/g, ContractSpace)
    .replace(/"setOpenPunks"/g, setContract);

 fs.writeFile(packagejson, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});

// Replace config.json
fs.readFile(configjson, 'utf8', function (err,data) {

  var formatted = data.replace(/open-punks/g, newDash)

 fs.writeFile(configjson, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});

// Replace index.html NEEDS MANUAL

// Replace .env NEEDS MANUAL