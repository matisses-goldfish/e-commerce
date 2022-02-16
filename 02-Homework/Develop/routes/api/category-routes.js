const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    
    if (!categoryData) {
      res.status(404).json({ message: 'No Category Avilable!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findbyPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    
    if (!categoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// update category by id
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
        password:req.params.id,
      },
      individualHooks: true
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category
router.delete('/:id', async (req, res) => {
  try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    },
  });
  if (!categoryData[0]) {
    res.status(404).json({ message: 'No Category with this id!' });
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
