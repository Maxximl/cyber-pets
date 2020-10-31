const bcrypt = require("bcryptjs");
const config = require("config");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистарции",
      });
    }

    const { email, password, type = "user" } = req.body;
    const candidate = await User.findOne({ where: { login: email } });
    console.log(candidate);
    if (candidate) {
      return res.status(400).json({
        message: "Такой пользователь уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 14);
    console.log(hashedPassword, email, type);
    User.create({
      login: email,
      password: hashedPassword,
      type,
    });

    res.status(201).json({ message: "Пользователь успешно зарегистирован!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при входе",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { login: email } });

    if (!user) {
      return res.status(400).json({
        message: "Такой пользователь не существует",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте снова" });
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "12h",
    });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
