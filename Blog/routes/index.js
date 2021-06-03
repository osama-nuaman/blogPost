var express = require('express');
var router = express.Router();

//Database
const Post = require('../model/post');
const Comment = require('../model/comment');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let posts = await Post.find();
  posts = posts.reverse();
  res.render('index', { title: 'Blog Post', posts });
});


//GET CREATE POST PAGE
router.get('/create', async (req, res, next) => {
  res.render('createPost', { title: 'New Post' });
});

//CREATE NEW POST
router.post('/create', async (req, res, next) => {
  const { title, content } = req.body;
  let post = new Post({ title, content })
  try {
    post = await post.save()
    return res.redirect('/')
  } catch {
    return res.status(400).send(err)
  }
  
});

// DELETE POST
router.get('/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  let post = await Post.findByIdAndDelete(id)
  if (!post) {
    return res.status(400).send('the post looking for is not found');
  }
  return res.redirect('/')
});

//GET UPDATE POST PAGE
router.get('/update/:id', async (req, res, next) => {
  const { id } = req.params;
  //console.log(req.params);
  const post = await Post.findById(id);
  res.render('updatePost', { title: 'Update Post', post })
});

//UPDATE POST
router.post('/update/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    post = await Post.findByIdAndUpdate(id, { title, content }, { new: true })
  } catch {
    return res.status(400).send(err)
  }
  return res.redirect('/');
});

//GET READ POST PAGE
router.get('/read/:id', async (req, res, next) => {
  const { id } = req.params;
  let post = await Post.findById(id);
  let comment = await Comment.find({ post_id: id });
  //console.log(comments);
  // console.log(post);
  res.render('readpost', { title: 'Post', post, comment });
});

// FUNCTION ADD COMMENT
router.post("/addcomment", async (req, res, next) => {
  try {
    const newComment = await new Comment({
      post_id: req.body.postID,
      username: req.body.username,
      usercomment: req.body.usercomment
    });
    const comment = newComment.save();
    res.redirect('back');
  } catch (error) {
    res.status(500).json(error);
  }
})

// FUNCTOIN DELETE COMMENT
router.get('/deletecomment/:id', async (req, res, next) => {
  const { id } = req.params;
  let comment = await Comment.findByIdAndDelete(id)
  if (!comment) {
    return res.status(400).send('the comment looking for is not found');
  }
  res.redirect('back')
});

// GET PAGE UPDATE COMMENT
router.get('/updatecomment/:id', async (req, res, next) => {
  const { id } = req.params;
  //console.log(req.params);
  const comment = await Comment.findById(id);
  res.render('updatecomment', { title: 'Update Comment', comment })
});

//UPDATE COMMENT
router.post('/updatecomment/:id', async (req, res, next) => {
  const id = req.body.comentID;
  const _id = req.params.id;
  const { username, usercomment } = req.body;
  try {
    comment = await Comment.findByIdAndUpdate(id, { username, usercomment }, { new: true })
  } catch {
    return res.status(400).send(err)
  }
  return res.redirect(`/read/${_id}`);
});

module.exports = router;
