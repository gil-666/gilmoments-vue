// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const websocket = require('ws');

const app = express();
const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 5001;
const server = http.createServer(app);
const wss = new websocket.Server({ server });
let activeConnections = 0;
app.use(cors());
server.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb+srv://proyectodb:cucsur@cluster0.s4l9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/gilsexweb', {
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

const CommentSchema = new mongoose.Schema({
    post_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: { type: String, required: true }
},{timestamps: true});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

//get connect number
wss.on('connection', (ws) => {
    activeConnections++; // Increment active connection
    console.log(`New connection. Total active connections: ${activeConnections}`);

    ws.on('close', () => {
        activeConnections--; // Decrement active connection
        console.log(`Connection closed. Total active connections: ${activeConnections}`);
    });
});

app.get('/api/active-connections', (req, res) => {
    res.json({ activeConnections });
});


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

app.get('/api/comments/:id', async(req, res) =>{
    const postId = req.params.id;
    console.log("got comments for post ", postId);
    try{
       const comment = await Comment.find({ post_id: postId }).populate('user_id', 'name');
       res.status(200).json(comment);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
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

//CREATE POST
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

        res.status(201).json(post); 
    } catch (err) {
        console.error('Error creating post serverjs:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//CREATE COMMENT
app.post('/api/comments', async (req, res) => {
    console.log('Received POST request:', req.body);
    const { post_id, user_id, text } = req.body;

    try {

        const comment = new Comment({post_id: post_id, user_id: user_id, text});
        await comment.save();

        res.status(201).json(comment); 
    } catch (err) {
        console.error('Error creating comment serverjs:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//GET LIKES

app.get('/api/posts/:id/likes', async (req, res) => {
    // console.log("Fetching likes for post with ID:", req.params.id);
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

server.listen(PORT2, () => {
    console.log(`WEBSOCKET IS RUNNING ON ws://localhost:${PORT2}`);
});
