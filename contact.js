#!/usr/bin/env node

const program = require('commander');


// Require logic.js file and extract controller functions using JS destructuring assignment
const { addContact, getContact, getQuote } = require('./logic');

//Stocks Require
const { getBatch , getlist} = require('./stocks');

//Dashboard Requier
const { dashboard} = require('./dashboard');

const { prompt } = require('inquirer'); // require inquirerjs library

// Craft questions to present to users
const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  }
];

const listOptions = [
  {
    type : 'list',
    name : 'listOptionsAnsw',
    message : 'Pick list Options',
    choices : ['mostactive', 'gainers','losers', 'iexvolume', 'iexpercent']
  }
];

program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('addContact')
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers =>
      addContact(answers));
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

  program
    .command('getQuote <symbols>')
    .alias('Q')
    .description('Get Quote by symbol')
    .action(symbols => getQuote(symbols));


// Stocks Implementation
program
  .command('getBatch <types> <symbols> <range> ')
  .alias('B')
  .description('Get Batch Report of symbols')
  .action((types, symbols, range ) => getBatch(types, symbols, range));


  program
    .command('list')
    .alias('L')
    .description('Get list of Movers, Most Actice, etc')
    .action(()=>{
        prompt(listOptions).then(listOptionsAnsw => {getlist(listOptionsAnsw.listOptionsAnsw)});
    });
//  End of Stocks Implementation



// dashboard Implementation
program
  .command('dashboard')
  .alias('dB')
  .description('Draw Dashboard')
  .action(() => dashboard());
//end of dashboard
program.parse(process.argv);
