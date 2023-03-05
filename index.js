import express from 'express';
import sharp from 'sharp'
import fs from 'fs';
import https from 'https';
import tf from '@tensorflow/tfjs-node';
import nsfwjs from 'nsfwjs';

const app = express();
app.use(express.json());

(async () => {
    const model = await nsfwjs.load(`https://nsfwjs.com/model/`, { size: 299 });;

    app.get("/detector", async(req, res) => {
        var url = req.query.url;
        if (!url) return res.status(400).send("invalid URL.");

        https.get(url, (response) => {
            const chunks = [];
            response.on('data', (chunk) => {
              chunks.push(chunk);
            });
            response.on('end', () => {
              const inputBuffer = Buffer.concat(chunks);
              sharp(inputBuffer)
                .png()
                .toBuffer()
                .then(async(outputBuffer) => {
                    const tocheck = await tf.node.decodeImage(outputBuffer, 3);
                    const predictions = await model.classify(tocheck);
                    tocheck.dispose();
                    const score = predictions.find(e => e.className === 'Porn').probability + predictions.find(e => e.className === 'Hentai').probability + predictions.find(e => e.className === 'Sexy').probability;
                    if (score >= 0.4) return res.status(401).send("nsfw content detected");
                    res.setHeader('Content-Type', 'image/png');
                    res.status(200).send(outputBuffer);
                })
                .catch((err) => {
                  console.error(err);
                });
            });
          }).on('error', (err) => {
            console.error(err);
          });
            })

        })()


    app.listen(3000, () => {
        console.log("Server is ready.");
    })
