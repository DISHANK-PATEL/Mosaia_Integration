import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import toolCall from './tool-call';

const app = express();
const { MONGODB_URI, PORT } = process.env;

app.get('/', async (req, res) => {
    // Read 'mode' and 'input' from the query string
    const { mode, input } = req.query;
    try {
        // Pass the correct parameters to toolCall
        const result = await toolCall(
            typeof mode === 'string' ? mode : '',
            typeof input === 'string' ? input : '',
            MONGODB_URI || ''
        );
        res.send(result);
    } catch (err) {
        res.status(500).send('Server error: ' + err);
    }
});

app.listen(PORT || 3001, () => {
    console.log('Local development server running on port ' + (PORT || 3001));
});
