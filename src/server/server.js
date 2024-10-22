// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://192.168.1.8:5174', // Local frontend
        'http://177.230.254.9:5173' // External frontend
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://177.230.254.9:6697/gilsexweb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose schemas and models
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
const PostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 }
},{timestamps: true});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

// Get all posts with user information
app.get('/api/posts', async (req, res) => {
    console.log("got posts");
    try {
        const posts = await Post.find().populate('user_id', 'name');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    const postId = req.params.id; // id from request
    console.log("got individual post for ID:", postId);
    try {
        const post = await Post.findById(postId).populate('user_id', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/api/posts', async (req, res) => {
    console.log('Received POST request:', req.body);
    const { name, text } = req.body; // Expecting { name: 'User Name', text: 'Post content' }

    try {
        // Check if the user already exists
        let user = await User.findOne({ name });

        // If the user does not exist, create a new user
        if (!user) {
            user = new User({ name });
            await user.save(); // Save the new user to the database
        }

        // Create a new post associated with the user
        const post = new Post({ user_id: user._id, text });
        await post.save(); // Save the post to the database

        res.status(201).json(post); // Respond with the created post
    } catch (err) {
        console.error('Error creating post serverjs:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//GET LIKES

app.get('/api/posts/:id/likes', async (req, res) => {
    console.log("Fetching likes for post with ID:", req.params.id);
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId).populate('user_id', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ likes: post.likes }); // Return only the likes count
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching likes', error: err });
    }
});
//ADD LIKES
app.post('/api/posts/:id/likes', async (req, res) => {
    try {
      const postId = req.params.id;
      console.log("add like on post: ",postId)
      await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });
      res.status(200).send('Likes incremented');
    } catch (error) {
      res.status(500).send('Error updating likes');
    }
  });

//DELETE LIKES
app.delete('/api/posts/:id/likes', async (req, res) => {
    try {
        const postId = req.params.id;
        console.log("delete like on post: ", postId);

        // Find the current likes count first
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        
        if (post.likes <= 0) {
            return res.status(400).send('No likes to decrement');
        }

        await Post.updateOne({ _id: postId }, { $inc: { likes: -1 } });
        res.status(200).send('Likes decremented');
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).send('Error updating likes');
    }
});

  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
