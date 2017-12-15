const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const Ticket = require('./ticketSchema');
//
const bcrypt = require('bcrypt');
const saltRounds = 13;


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  assignedTickets: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Ticket' 
  }],
  raisedTickets: [{
    type: Schema.Types.ObjectId, 
    ref: 'Ticket'    
  }] 
});

// Hashes password pre save!
userSchema.pre('save', function (next) {
  
  let u = this;
  // generate a salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(u.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      u.password = hash;
      next();
    })
  })

});

// Sending back publicfields on success
userSchema.methods.getPublicFields = function () {
  return {
    name: this.name,
    emailId: this.emailId,
  }
};

// Sending payload data
userSchema.methods.getPayload = function () {
  let payload = {
      name: this.name,
      emailId: this.emailId,
      phoneNumber: this.phoneNumber,
      admin: this.admin,
  };
  return payload;
};


module.exports = mongoose.model('User', userSchema);