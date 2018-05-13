const handleSignIn = (knex, bcrypt) => (req, res, ) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json('invalid form submission');
    }
    knex.select('email', 'hash')
        .from('login')
        .where('email', email)
        .then(data => {
            const { hash } = data[0];
            bcrypt.compare(password, hash, function (err, result) {
                // result == true or false
                if (result) {
                    return knex.select('*')
                        .from('users')
                        .where('email', email)
                        .then(user => {
                            res.json(user[0]);
                        })
                        .catch(err => res.status(400).json('error finding user'))
                } else {
                    res.status(400).json('incorrect credentials')
                }
            });
        })
        .catch(err => res.status(400).json('error signing in'))
    
}

module.exports = {
    handleSignIn
}