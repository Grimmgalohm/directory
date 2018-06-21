#!/usr/bin/env node
const colors = require('colors');
const cmd = require('commander');
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
      {type:'password',name:'password',message:'Please create your password:', validate:llenar, mask: function(input) {
        return '█' + new Array(String(input).length).join('█');
      }},
      {type:'password',name:'confirmPassword',message:'Please confirm your password:',validate: confirmPassword, mask: function(input) {
        return '█' + new Array(String(input).length).join('█');
      }},
      {type:'input', name:'celphone', message:'Número celular: '},
      {type:'input', name:'home', message:'Número de casa: '},
      {type:'input', name:'work', message:'Número de trabajo: '},
      {type:'input', name:'emergency', message:'Número de emergencias: '}
    ];

    const loginquestions = [
    {type:'input', name:'email', message:'Ingresa tu email: '},
    {type:'password', name:'password', message:'Ingrese su password: ', mask: function(input) {
      return '█' + new Array(String(input).length).join('█');
    }}
    ];
    
    var response;
    function llenar(respuesta){
      response=respuesta;
      return true;
    };
    function confirmPassword(password){
      if(password !== response){
        console.log('No coincide.Ingrésalo nuevamente'.bgRed.white);
      }
      return (password == response);
    };
  
    cmd
    .command('crear')
    .action(function(){
      let _answers;
      inquirer.prompt(questions)
      .then(function(answers){
        _answers=answers;
        return bcrypt.hash(answers.password, 8);
      })
      .then(hashedPassword =>{
        return directorio.create({
          nombre:_answers.name,
          apellido1:_answers.apellido1,
          apellido2:_answers.apellido2,
          email:_answers.email,
          password:hashedPassword,
          celphone:_answers.celphone,
          home:_answers.home,
          work:_answers.work,
          emergency:_answers.emergency
        });
      })
      .then(function(){
        console.log('Genial, hemos guardado tus contactos :D'.blue.bold);
        mongoose.disconnect();
      });
    });

    cmd
    .command('one')
    .option('--name [user]')
    .action(function(opts){
      directorio.find({nombre:opts.name}).then(directorio => {
        for(var i = 0; i < directorio.length; i++){
          var item = directorio [i];
          console.log('\n\r');
          console.log(`Usuario: ${item.apellido1+' '+item.apellido2+' '+item.nombre}`.bgBlue);
          console.log(`email: ${item.email}`);
          console.log(`Números\nMóvil: ${item.celphone}\nCasa: ${item.home}\nTrabajo: ${item.work}\nEmergencias: ${item.emergency}`);
        }
        mongoose.disconnect();
      });
    });

    //hago otro cmd por que flojera del if :v
    cmd
    .command('list')
    .action(function(){
      directorio.find().then(directorio =>{
        for(var i = 0; i < directorio.length; i++){
          var item = directorio [i];

        console.log('\n\r');
        console.log(`Usuario: ${item.apellido1+' '+item.apellido2+' '+item.nombre}`.bgBlue);
        console.log(`email: ${item.email}`);
        console.log(`Números\nMóvil: ${item.celphone}\nCasa: ${item.home}\nTrabajo: ${item.work}\nEmergencias: ${item.emergency}`);
        }
        mongoose.disconnect();
      })
    })

    cmd
    .command('login')
    .action(function(){
      var _answers;

      inquirer.prompt(loginquestions)
      
      .then(function(answers){
        _answers=answers;
        return directorio.findOne({name:answers.name});
      })
      .then(user => {
        if(!user){
          mongoose.disconnect();
          console.log('Nope :v');

          return
        }
        res=bcrypt.compare(_answers.password, user.password);
        return res;
      })
        .then(res => {
          if(res === true){
            console.log('date :v');
          }else{
            console.log('Nope');
          }
          mongoose.disconnect();
      })
    })

  cmd.parse(process.argv);

  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error('\n === Did you remember to start `mongod`? === \n');
    console.error(err);
  });