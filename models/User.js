const mongoose = require('mongoose');
const crypto = require('crypto');

// Definovanie User schemy podla mongoose dokumentacie
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

// Metoda, ktora pred kazdym ulozenim pouzivatela do databazy skontroluje ci bolo vytvorene nove heslo
// V pripade ze heslo bolo modifikovane (vytvorene/zmenene), tak vytvori novy hash derivacnou funkciou `pbkdf2`
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  const salt = crypto.randomBytes(128).toString('base64'); // 16B salt nahodne generovany
  const iterations = 100000; // Odporucane najnizsie cislo iteracii je 10 000
  // Vytvorenie hashu z hesla poskytnuteho pouzivatelom
  crypto.pbkdf2(user.password, salt, iterations, 64, 'sha512', (err, hash) => {
    if (err) return next(error);
    hash = hash.toString('base64');
    // Ulozenie hashu, saltu, iteracii do MongoDB, ktore nam umoznia nasledne heslo porovnat
    user.password = hash;
    user.salt = salt;
    user.iterations = iterations;
    next();
  });
});

// Metoda, ktora sluzi na kontrolu hesiel pri pokuse prihlasenia sa do nasho systemu
userSchema.methods.comparePassword = function (passwordToCompare) {
  const user = this;

  return new Promise((resolve, reject) => {
    // Vytvorenie hashu z hesla zadaneho pri pokuse o prihlasenie a nasledne porovnanie tychto hesiel
    crypto.pbkdf2(
      passwordToCompare,
      user.salt,
      user.iterations,
      64,
      'sha512',
      (error, hash) => {
        if (error) return reject(error);
        // Kontrola zhody hesiel na zaklade hashu
        const isMatch = user.password === hash.toString('base64');
        if (!isMatch) return reject(false);
        return resolve(true);
      }
    );
  });
};

mongoose.model('User', userSchema);
