import bcrypt from "bcrypt";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  console.log("signin", req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log("existingUser====", existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("isPasswordCorrect====", isPasswordCorrect);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invlaid Credentials!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log("token====", token);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        fullName: fullName,
        email: email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });
      res.status(200).json({ result, token });
    } else {
      const result = await User.create({
        fullName: fullName,
        email: email,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });
      res.status(200).json({ result, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User creation failed" });
  }
};

export const thirdPartyUser = async (req, res) => {
  console.log(req.body);
  const { fullName, email } = req.body;
  try {
    const existingUser = await User.findOne({
      email,
    });
    console.log('existingUser=======',existingUser)
    if (existingUser) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "test",
        { expiresIn: "1h" }
      );
      console.log("token====", token);
      res.status(200).json({ result: existingUser, token });
    } else {
      const result = await User.create({
        fullName: fullName,
        email: email,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });
      res.status(200).json({ result, token });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};
