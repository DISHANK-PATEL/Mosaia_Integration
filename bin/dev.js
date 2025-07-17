const dotenv = require('dotenv');
const express = require('express');
require('../dist/index.js');

dotenv.config();

const app = express();

const { MONGODB_URI, PORT } = process.env;

app.get('/', async (req, res) => {
    const { EXAMPLE_PARAM_ONE, EXAMPLE_PARAM_TWO } = req.query;

    const event = {
        body: JSON.stringify({
            args: {
                EXAMPLE_PARAM_ONE,
                EXAMPLE_PARAM_TWO
            },
            secrets: {
                MONGODB_URI
            }
        })
    }

    const result = await handler(event)

    res.status(result.statusCode).send(result.body);
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Local development server running on port ${port}`);
});
