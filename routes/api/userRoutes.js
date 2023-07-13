const router = require('express').Router();

const {
    getUsers,
    getAUser,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/user
router
    .route('/')
    .get(getUsers) 
    .post(createUser); 

// /api/user/:id
router
    .route('/:id')
    .get(getAUser)
    .put(updateUser) 
    .delete(deleteUser);

// /api/user/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(newFriend)
    .delete(deleteFriend)

module.exports = router;