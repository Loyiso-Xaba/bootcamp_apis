import express from 'express';
import cors from 'cors';
import { longestWord, shortestWord, wordLengths } from './wordGame.js';
import { totalPhoneBill, enoughAirtime } from './totalphonebill.js';


const PORT = process.env.PORT || 4020;
const app = express();
app.use(cors());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Word game
app.get('/api/word_game', function (req, res) {
    const sentence = req.query.sentence;
    res.json(
        {
            longestWord: longestWord(sentence),
            shortestWord: shortestWord(sentence),
            sum: wordLengths(sentence),
        }
    );
})

// Total phone bill
app.post('/api/phonebill/total', function (req, res) {
    const data = req.body.bill;
    const total = totalPhoneBill(data);
    res.json(
        {
            total: total
        }
    );
});

app.get('/api/phonebill/prices', function (req, res) {
    res.json(
        {
            call: 1.50,
            sms: 0.50
        }
    );
});

app.post('/api/phonebill/price', function (req, res) {
    const { type, price } = req.body;

    if (type === 'call') {
        res.json({
            status: 'successful',
            message: `The call price is now ${price}`
        });
    } else if (type === 'sms') {
        res.json({
            status: 'successful',
            message: `The sms price is now ${price}`
        });
    } else {
        res.json({
            status: 'error',
            message: 'ONLY call or sms!!'
        });
    }
});

//Enough Airtime
app.post('/api/enough', (req, res) => {
    const { usage, available } = req.body;

    if (typeof usage !== 'string' || typeof available !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const result = enoughAirtime(usage, available);
    res.json({ result });
});


app.listen(4020, function () {
    console.log(`app listening on port ${PORT}`);
});