const express = require('express');
const { registerCanteenUser, loginCanteenUser } = require('../controllers/canteenUserController');
const { addItem, deleteItem, getItems, getNewOrders , fetchItems, placeOrder } = require('../controllers/canteenServiceController');
const router = express.Router();


router.post('/register', registerCanteenUser);
router.post('/login', loginCanteenUser);
router.post('/add-item', addItem);
router.delete('/delete-item/:itemId', deleteItem);
router.get('/items', getItems);
router.get('/new-orders', getNewOrders);
router.get('/items', fetchItems);
router.post('/order', placeOrder);




module.exports = router;
