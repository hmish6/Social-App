const mongoose = require("mongoose"),
  validator = require("validator"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcryptjs"),
  Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: Buffer,
    default: null
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: [true, "Email is already in use"],
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is an incorrect email"
    }
  },
  tokens: [
    {
      access: {
        required: true,
        type: String
      },
      token: {
        required: true,
        type: String
      }
    }
  ],
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be atleast 6 characters"]
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
      default: null
    }
  ]
});

UserSchema.methods.toJSON = function() {
  let user = this,
    object = user.toObject();
  let { _id, email, name, following } = object;
  return { _id, email, name, following };
};

UserSchema.methods.generateAuthToken = function() {
  let user = this,
    access = "auth",
    token = jwt
      .sign({ _id: user._id.toHexString(), access }, "socialKey")
      .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
};

UserSchema.pre("save", function(next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(password) {
  let user = this;
  return bcrypt
    .compare(password, user.password)
    .then(res => res)
    .catch(err => false);
};

UserSchema.statics.findByToken = function(token) {
  let User = this,
    decoded;

  try {
    decoded = jwt.verify(token, "socialKey");
  } catch (e) {
    return Promise.reject("Invalid request");
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
