import express from 'express';
const router = express.Router()
import {createPost, deletePost, getPost, updatePost} from '../controllers/postController'
import {createComment, getComment, delteComment} from '../controllers/commentController'

router.post('/', createPost as any)
router.delete('/:postID', deletePost as any)
router.patch('/:postID', updatePost as any)
router.get('/:postID', getPost)
router.post('/:postID/comments', createComment as any)
router.get('/:postID/comments/:commentID', getComment)
router.delete('/:postID/comments/:commentID', delteComment)


export default router;