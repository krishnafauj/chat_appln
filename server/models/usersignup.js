import mongoose from 'mongoose';
const signupSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Signup = mongoose.model('signup', signupSchema);
export default Signup;