const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtsecret = "rsrdfgyktrdgchvjhklyitf";

// Create user route
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
    body("name", "Name must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      
      const newUser = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });

      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

// Login user route
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const userdata = await User.findOne({ email });

      if (!userdata) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const pwdcomp = await bcrypt.compare(password, userdata.password);
      if (!pwdcomp) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: userdata.id
        }
      };

      const authtoken = jwt.sign(payload, jwtsecret, { expiresIn: '1h' });

      res.status(200).json({ success: true, authtoken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
