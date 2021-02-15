const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var Usuario = require('./usuario');

// const usuario_controller = require('./usuario_controller');
let list = [];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/aula-fullstack', 
    {useNewUrlParser: true, useUnifiedTopology: true});

// app.use('/usuarios', usuario_controller);

// app.put('/:id', (req, res) => {
//     Usuario.findByIdAndUpdate(req.params.id, { nome: req.body.nome, email: req.body.email, foto: req.body.foto }, (err, usuario) => {
//         if (err)
//             res.status(500).send(err);
//         else 
//             res.status(200).send(usuario);
//     })
// })

app.patch('/:id', (req, res) => {
    Usuario.findOne({id: req.params.id}, (err, usu) => {
        if (err)
            res.status(500).send(err);
        else if (!usu)
            res.status(404).send({});
        else {
            usu.nome = req.body.nome;
            usu.email = req.body.email;
            usu.foto = req.body.foto;
            // prod.price = req.body.price;
            // prod.stock = req.body.stock;
            // prod.departments = req.body.departments;
            usu.save((err, usu) => {
                if (err)
                    res.status(500).status(err);
                else
                    res.status(200).send(usu);
            })
        }
    })
})

app.delete('/:id', (req, res) => {
    Usuario.deleteOne({id: req.params.id}, (err) => {
        if (err)
             res.status(500).send(err);
        else 
            res.status(200).send({});
    })
 })

 app.get('/:id', (req, res) => {
    Usuario.findOne({id: req.params.id}, (err, usuario) => {
        if (err)
             res.status(500).send(err);
        else 
            res.status(200).send(usuario);
    })
 })

app.get('/', (req,res) => {
    // res.send(list);
    Usuario.find().exec((err, usuarios) => {
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).send(usuarios);
    })
});

app.post('/', (req,res) => {

    console.log(req.body);

    // var usuarioReq = {
    //     "id": req.body.id,
    //     "nome": req.body.nome,
    //     "email": req.body.email
    // }

    // list.push(usuarioReq);
    // res.status(200).send(usuarioReq);

    let usuario = new Usuario({
        id : req.body.id,
        nome : req.body.nome,
        email: req.body.email,
        foto: req.body.foto,
    });

    usuario.save((err, usu) => {
        if (err)
            res.status(500).send(err);
        else 
            res.status(201).send(usu);
    })
});


app.listen(3002);