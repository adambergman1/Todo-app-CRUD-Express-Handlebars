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
  password: { type: String, required: true }
}, { timestamps: true })

userSchema.path('password').validate((password) => { return password.length >= 8 },
  'The password must be of minimum length 8 characters.')

userSchema.pre('save', async function (next) {
  let user = this

  if (user.isModified('password') || user.isNew) {
    let hashPwd = await bcrypt.hash(user.password, 12)
    user.password = hashPwd
  }
  next()
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Create a model using the schema.
const user = mongoose.model('user', userSchema)

// Exports.
module.exports = user
