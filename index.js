
const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const port = 3000;

app.get('/randomanimal', async (req, res) => {
    try {
        const animalTypes = ['dog', 'cat', 'panda', 'fox', 'bird', 'koala', 'horse', 'kangaroo'];
        const randomAnimal = animalTypes[Math.floor(Math.random() * animalTypes.length)];
        const url = `https://some-random-api.com/animal/${randomAnimal}`;

        const response = await axios.get(url);

        if (response.data) {
            const { fact, image } = response.data;

            let animalInfo = `📚 Information about a random ${randomAnimal}:\n\n`;
            animalInfo += `**Fact**: ${fact}\n`;

            const imgResponse = await axios.get(image, { responseType: 'arraybuffer' });
            const cacheDir = path.join(__dirname, 'cache');
            await fs.ensureDir(cacheDir);
            const imgPath = path.join(cacheDir, 'animal_image.jpg');
            await fs.outputFile(imgPath, imgResponse.data);
            const imgStream = fs.createReadStream(imgPath);

            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Disposition': `attachment; filename=${randomAnimal}.jpg`
            });
            res.write(animalInfo);
            imgStream.pipe(res);
        } else {
            res.status(404).send("Sorry, no information was found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Sorry, there was an error fetching animal information.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
