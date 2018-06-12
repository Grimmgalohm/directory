#!/usr/bin/env node
const colors = require('colors');
const cmd = require('commander');
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const directorio = require('./db/directory-db');

mongoose.connect('mongodb://localhost/directory-cats-test')
  .then(instance => {
    const conn = instance.connections[0];
    console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);

    const questions = [
      {type:'input', name:'name', message:'Nombre: '},
      {type:'input', name:'apellido1', message:'Apellido materno: '},
      {type:'input', name:'apellido2', message:'Apellido paterno: '},
      {type:'input', name:'email', message:'E-mail: '},
      {type: 'password', name:'password', message:'Contraseña: '},
      {type:'input', name:'celphone', message:'Número celular: '},
      {type:'input', name:'home', message:'Número de casa: '},
      {type:'input', name:'work', message:'Número de trabajo: '},
      {type:'input', name:'emergency', message:'Número de emergencias: '}
    ];
  
    cmd
    .command('create')
    .action(function(){
      inquirer.prompt(questions).then(function(answers){
        directorio.create({
          name:answers.name,
          apellido1:answers.apellido1,
          apellido2:answers.apellido2,
          email:answers.email,
          password:answers.password,
          celphone:answers.celphone,
          home:answers.home,
          work:answers.work,
          emergency:answers.emergency
        })
      }).then(function(){
        console.log('Genial, hemos guardado tus contactos :D'.blue.bold);
        mongoose.disconnect();
      });
    });

    cmd.parse(process.argv);

  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error('\n === Did you remember to start `mongod`? === \n');
    console.error(err);
  });

  cmd
  .command('one <name>')
  .action(function(){
  directorio.find({name:answers.name}).then(function(){
  });
});