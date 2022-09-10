const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    Enrollment_Number :{
        type: String,
        required: true
    },
    Email :{
        type: String,
        required: true
    },
    Complaint: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
        required: true
    }
})

const Complaint_Object = mongoose.model('complaint_collection', ComplaintSchema);

module.exports = Complaint_Object;