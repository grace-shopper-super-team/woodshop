const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/:productId', (req, res, next) => {
  Review.findAll({where: {productId: req.params.productId }})
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
  console.log('got to POST review route')
  console.log('req.body:', req.body)
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})
