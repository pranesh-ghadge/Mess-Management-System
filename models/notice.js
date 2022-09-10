const mongoose = require('mongoose');

const noticeSchema = {
    heading: String,
    text: String,
    date: Date
}

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
