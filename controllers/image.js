const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c909b23117c4454781870c2715eff4cf'
});

const handleClarifaiApiCall = () => (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (knex) => (req, res) => {
    const { id } = req.body;
    knex('users')
        .where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImagePut,
    handleClarifaiApiCall
}