const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The `/api/tags` endpoint


// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id'],
        through: 'ProductTag',
      }]
    })
    
    if (!tagData) {
      res.status(404).json({ message: 'No Tags Avilable!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id'],
        through: 'ProductTag',
      }]
    })
    
    if (!tagData) {
      res.status(404).json({ message: 'No Tags Avilable!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body.tag_name);
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});
  
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body.tag_name, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete tag by ID
router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        }
      });
      if (!tagData[0]) {
        res.status(404).json({ message: 'No Tag to delete!' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
