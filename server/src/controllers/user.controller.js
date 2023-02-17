import userModel from '../models/user.js';

class UserController {
  async getAll(req, res) {
    try {
      const users = await userModel.find({}).limit(req.query._end);

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async getOneById(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel
        .findOne({ _id: id })
        .populate('allProperties');

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      const { name, email, avatar } = req.body;

      const userExists = await userModel.findOne({ email });
      if (userExists) return res.status(200).json(userExists);

      const newUser = await userModel.create({
        name,
        email,
        avatar,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
