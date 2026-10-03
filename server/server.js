require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database error:', err.message));

app.get('/', (req, res) => {
  res.send('Blog server is running');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/posts/:postId/comments', require('./routes/comments'));

app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT));
