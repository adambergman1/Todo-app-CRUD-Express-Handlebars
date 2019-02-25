/**
 * Mongoose model User.
 *
 * @author Adam bergman
 * @version 1.0
 */

const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const bcrypt = require('bcrypt')

// Create a schema.
const userSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, required: true, unique: true, match: [/^[a-zA-Z0-9]+$/] },
  email: { type: String, lowercase: true, required: true, unique: true, match: [/\S+@\S+\.\S+/] },
  password: String
}, {
  timestamps: true
})

// Extra validation to ensure no password is submitted to the DB shorter than 6 characters.
userSchema.path('password').validate((password) => { return password.length >= 6 },
  'The password must be of minimum length 6 characters.')

// Hash the password
userSchema.pre('save', async function (next) {
  let user = this

  if (user.isModified('password') || user.isNew) {
    let hashPwd = await bcrypt.hash(user.password, 10)
    user.password = hashPwd
  }
  next()
})

// check if password is correct
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.index({ username: 1, email: 1 }, { unique: true })

// Create a model using the schema.
const user = mongoose.model('user', userSchema)

// Exports.
module.exports = user
