const mongoose = require('mongoose');
const crypto = require('crypto');

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
  salt: {
    type: String,
  },
  iterations: {
    type: Number,
  },
  logs: [{ type: Date }],
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

  const salt = crypto.randomBytes(128).toString('base64');
  const iterations = 100000;
  crypto.pbkdf2(user.password, salt, iterations, 64, 'sha512', (err, hash) => {
    if (err) return next(error);
    hash = hash.toString('base64');

    user.password = hash;
    user.salt = salt;
    user.iterations = iterations;
    next();
  });
});

userSchema.methods.comparePassword = function (passwordToCompare) {
  const user = this;

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      passwordToCompare,
      user.salt,
      user.iterations,
      64,
      'sha512',
      (error, hash) => {
        if (error) return reject(error);
        const isMatch = user.password === hash.toString('base64');
        if (!isMatch) return reject(false);
        return resolve(true);
      }
    );
  });
};

mongoose.model('User', userSchema);
