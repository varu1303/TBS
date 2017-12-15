const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  ticketTitle: {
    type: String,
    required: true
  },
  ticketDescripton: {
    type: String,
    required: true
  },
  raisedBy: {
    name: String,
    emailId: String,
    phoneNumber: String
  },
  involvedAdmins: [{
    name: String,
    emailId: String
  }],
  chat: [{
    text: String,
    by: String
  }]
})


module.exports = mongoose.model('Ticket', ticketSchema);