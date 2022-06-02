/* CONFIDENCIALIDADE */

const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

/*  
    Objeto contendo os usuários da aplicação.
    Como não está sendo usado banco de dados, se caso for desejado criar 
    um novo usuário, deve declarar ele dentro do array
 */
const users = [{ 
    _id: 1, 
    username: "adm", 
    password: "$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW", // Senha: 123
    email: "diogo.cerutti@unochapeco.edu.br"
}];

module.exports = function(passport){

    // Percorre os usuários existentes

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        (username, password, done) => {
            try {
                const user = findUser(username);
    
                // usuário inexistente
                if (!user) { return done(null, false) }
    
                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.password);
                if (!isValid) return done(null, false)
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));

    // Busca um usuário específico (por NOME ou ID)

    function findUser(username){
        return users.find(user => user.username === username);
    }
    
    function findUserById(id){
        return users.find(user => user._id === id);
    }
}