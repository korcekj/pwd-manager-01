const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length >= 4,
    },
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator: (v) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length >= 8,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (passwordToCompare) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordToCompare, user.password, (error, isMatch) => {
      if (error) return reject(error);
      if (!isMatch) return reject(false);
      return resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
