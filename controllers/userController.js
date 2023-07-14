const { User, Thoughts } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .then(gotUsers => res.json(gotUsers));
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a user by id
    async getAUser(req, res) {
        try {
            const aUser = await User.findOne({ _id: req.params.id })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .then(gotUsers => res.json(gotUsers));
            if (!aUser) {
                return res.status(404).json({ message: 'No user found with this id' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
                res.json(user);
        }
         catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //update a user
    async updateUser({ params, body }, res) {
        try {
         const update = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
                .then(updated => {
                    if (!updated) {
                        return res.status(404).json({ message: 'No user found with this id' });
                        
                    }
                    res.json(updated);
                })
        }

        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // delete a user and remove thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id })
            .then (removed => {
                if (!removed) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                return Thoughts.deleteMany({ _id: { $in: removed.thoughts } })
            })
         .then (res.json({ message: 'User successfully deleted' }));
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async newFriend({ params, }, res) {
        try {
         const update = await User.findOne({ _id: params.friendId })
         .then(friend => {
            if (!friend) {
                return res.status(404).json({ message: 'No user found with this id' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
            )
            .then(addedfriend => {
                if (!addedfriend) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                res.json(addedfriend);
            })
        })}
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteFriend({ params, }, res) {
        try {
         const update = await User.findOne({ _id: params.friendId })
         .then(friend => {
            if (!friend) {
                return res.status(404).json({ message: 'No user found with this id' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            )
        })
        .then(gonefriend => {
            if (!gonefriend) {
                return res.status(404).json({ message: 'No user found with this id' });
            }
            res.json(gonefriend);
        })
    }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}