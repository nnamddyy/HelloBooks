import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const userModel = model.users;
const bookModel = model.books;

const secret = process.env.SECRET;

/**
 * @class authentication
 * @classdesc creates an authentication class
 */
class Authentication {
  /**
   * @param { object } req 
   * @param { object} res 
   * @param { object } next
   * @returns { object } response
   */
  static verifyAdmin(req, res, next) {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized - Access Denied' });
    } else {
      const decoded = jwt.verify(req.headers.authorization, secret);
      if (decoded.role === 'user') {
        res.status(401).json({ message: 'Unauthorized - Access Denied' });
      } else {
        next();
      }
    }
  }

  /**
   * @param { object } req --- request object
   * @param { object} res  ---response object
   * @returns { object } --- return object
   */
  static verifyUser(req, res, next) {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Invalid/expired token' });
    } else {
      const decoded = jwt.verify(req.headers.authorization, secret);
      userModel.findOne({ where: { email: decoded.email, id: decoded.id } }).then((user) => {
        if (user) {
          req.body.userid = decoded.id;
          req.membership = decoded.membership;
          next();
        } else {
          res.status(401).json({ message: 'User does not exist' });
        }
      }).catch(() => {
        res.status(401).json({ message: 'Invalid/expired token' });
      });
    }
  }
}

export default Authentication;
