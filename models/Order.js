const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {type: String , required: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number , default: 1}
        }
    ],
    address: {type: String , required: true},
    address: {type: Number , required: true},
    address: {type: String , default:'pending', required: true},
}, {timeStamps: true});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);