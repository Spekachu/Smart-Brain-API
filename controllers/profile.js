const handleProfileGet = (knex) => (req, res) => {
    const { id } = req.params;

    knex.select('*').from('users').where('id', id)
        .then(user => {
            user.length ?
                res.json(user[0]) :
                res.status(400).json('Not found');
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet
}