import mongoose from ('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  url:{type:string},
  password:{},
  username:""
});

const User = mongoose.model('User', userSchema);
module.exports = User;