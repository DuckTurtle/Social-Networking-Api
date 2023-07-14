const { User, Thoughts } = require('../models');

module.exports = {
    // Get all Thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thoughts.find()
            .populate({
                path: 'reactions',
                select: '-__v'
            })
                .select('-__v')
                .then(gotThoughts => res.json(gotThoughts));
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a Thought by id
    async getAThought(req, res) {
        try {
            const aThought = await Thoughts.findOne({ _id: req.params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
                .select('-__v')
                .then(gotThoughts => res.json(gotThoughts));
            if (!aThought) {
                return res.status(404).json({ message: 'No Thoughts found with this id' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new Thoughts
    async createThoughts({ params, body }, res) {
        try {
            const thought = await Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            
                if (!thought) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    //update a Thoughts
    async updateThoughts({ params, body }, res) {
        try {
         const update = await Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
                .then(updated => {
                    if (!updated) {
                        return res.status(404).json({ message: 'No Thoughts found with this id' });
                    }
                    res.json(updated);
                })
        }

        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // delete a Thoughts and remove thoughts
    async deleteThoughts({params}, res) {
        try {
            const thought = await Thoughts.findOneAndRemove({ _id: params.thoughtId })
                if (!thought) {
                    return res.status(404).json({ message: 'No Thoughts found with this id' });
                }
                const user = await User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                res.json({ message: 'Thought successfully deleted' })
            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async newReaction({ params, body }, res) {
        try {
         const update = await Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                    
                }
                res.json(thought);
            })}
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteReaction({ params, }, res) {
        try {
         const update = await Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { id: params.reactionId } } },
            { new: true, runValidators: true }
        )
        console.log(update);
            if (!update) {
                return res.status(404).json({ message: 'No Thoughts found with this id' });
            }
            res.json(update);
    }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}