const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        res.json(posts);
    },

    async store(req, res) { 
        const { author, place, description, hastags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const filename = `${name}.jpg`


        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 80})
            .toFile(
                path.resolve(req.file.destination, '..', filename)
            )

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hastags,
            image: filename
        });

        req.io.emit('post', post);

        res.json(post);
    }
}