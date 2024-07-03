const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
 },
 password: {
    type: String,
    trim: true,
    required: true,
 },
 first_name: {
   type: String,
   trim: true,  
},
last_name: {
   type: String,
   trim: true, 
}
});

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function(next) {
 if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
 }
 next();
});

 const User = mongoose.model('users',UserSchema);

module.exports = User;
