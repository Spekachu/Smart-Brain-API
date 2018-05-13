const saltRounds = 10;

const handleRegister = (knex, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json('invalid form submission');
    }
    knex.transaction(trx => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                // Store hash in your password DB.
                trx('login')
                    .insert({
                        hash,
                        email
                    })
                    .returning('email')
                    .then(loginEmail => {
                        return trx('users')
                            .insert({
                                name,
                                email: loginEmail[0],
                                joined: new Date()
                            })
                            .returning('*')
                            .then(newUser => {
                                res.json(newUser[0]);
                            })
                            .catch(error => {
                                res.status(400).json("unable to register")
                            });
                    })
                    .then(trx.commit)
                    .catch(error => {
                        trx.rollback;
                        res.status(400).json("unable to register")
                    });
            });
        });
    })
    .catch(error => {
        res.status(400).json("unable to register")
    });
}

module.exports = {
    handleRegister
}