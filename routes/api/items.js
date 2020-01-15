const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get all items
//@access public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route POST api/items
//@desc create a post in items
//@access public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items
//@desc del particular item
//@access public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ deleted: true })))
        .catch(err => res.status(404).json({ deleted: false }));
});




module.exports = router;