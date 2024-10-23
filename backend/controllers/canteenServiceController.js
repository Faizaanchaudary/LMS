const CanteenItem = require('../models/canteenItemModel');
const Order = require('../models/canteenOrderModel');


const addItem = async (req, res) => {
    const { name, amountAvailable, price, companyName } = req.body;
    
    try {
        const newItem = await CanteenItem.create({
            name,
            amountAvailable,
            price,
            companyName,
        });
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(400).json({ message: 'Error adding item', error });
    }
};


const deleteItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        await CanteenItem.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting item', error });
    }
};


const getItems = async (req, res) => {
    try {
        const items = await CanteenItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching items', error });
    }
};


const placeOrder = async (req, res) => {
    const { studentName , semester , department , itemId, amount, location } = req.body;
    console.log('Data inside payload is', req.body)

    const newOrder = new Order({
        item: itemId,
        amount,
        location,
        status: 'Pending',
        semester ,
        department ,
        studentName
    });

    try {
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.log('Got error in placeOrder function that is', error)
        res.status(500).json({ message: 'Error placing order' });
    }
};


const getNewOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('item', 'name'); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};


const fetchItems = async (req, res) => {
    try {
        const items = await CanteenItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};



module.exports = { addItem, deleteItem, getItems, getNewOrders , fetchItems, placeOrder };
