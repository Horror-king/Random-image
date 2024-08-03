const express = require('express');
const app = express();
const port = 3000;

const predefinedKeywords = {
    cat: 'https://picsum.photos/seed/cat',
    dog: 'https://picsum.photos/seed/dog',
    nature: 'https://picsum.photos/seed/nature',
    city: 'https://picsum.photos/seed/city',
    animal: 'https://picsum.photos/seed/animal',
    food: 'https://picsum.photos/seed/food',
    tech: 'https://picsum.photos/seed/tech',
    sports: 'https://picsum.photos/seed/sports',
    travel: 'https://picsum.photos/seed/travel',
    people: 'https://picsum.photos/seed/people'
};

app.get('/random', (req, res) => {
    const query = req.query.query || 'random';

    const generateRandomImage = (baseUrl) => {
        const width = Math.floor(Math.random() * 1000) + 100;
        const height = Math.floor(Math.random() * 1000) + 100;
        return `${baseUrl}/${width}/${height}`;
    };

    let baseUrl;
    if (predefinedKeywords[query]) {
        baseUrl = predefinedKeywords[query];
    } else {
        baseUrl = 'https://picsum.photos';
    }

    const images = [
        generateRandomImage(baseUrl),
        generateRandomImage(baseUrl),
        generateRandomImage(baseUrl),
        generateRandomImage(baseUrl)
    ];

    res.json({ urls: images });
});

app.listen(port, () => {
    console.log(`Lorem Picsum API listening at http://localhost:${port}`);
});
