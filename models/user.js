/**
 * Mongoose model User.
 *
 * @author Adam bergman
 * @version 1.0
 */

const mongoose = require('mongoose')
const crypto = require('crypto')

// Create a schema.
const userSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, required: true, match: [/^[a-zA-Z0-9]+$/] },
  email: { type: String, lowercase: true, required: true, match: [/\S+@\S+\.\S+/] },
  hash: String,
  salt: String
}, { timestamps: true })

userSchema.methods.setPassword = password => {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

userSchema.methods.validPassword = password => {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

// Create a model using the schema.
const user = mongoose.model('user', userSchema)

// Exports.
module.exports = user
