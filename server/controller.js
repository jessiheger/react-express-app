// const knex = require('./db')

// // Get all users
// exports.getUsers = async (req, res) => {
//   knex
//     .select('*')
//     .from('users')
//     .then(userData => {
//       res.json(userData)
//     })
//     .catch(err => {
//       res.status(404)
//       res.json({ message: `Resource not found: ${err}` })
//     })
// }

// // Get single user by contact info
// exports.getByContactInfo = async (req, res) => {
//   knex('users')
//     .where({
//       'firstName': req.body.firstName,
//       'lastName': req.body.lastName,
//       'email': req.body.email,
//       'street1': req.body.street1,
//       'street2': req.body.street2, ? req.body.street2 : '',
//       'city': req.body.city,
//       'state': req.body.state,
//       'zip': req.body.zip,
//       'phone': req.body.phone
//     })
//     .then(data => {
//       if (data.length > 0) {
//         res.json({data: data, message: 'User already exists'})
//       } else {
//         res.json({data: data, message: 'User is not in the database'})
//       }
//     })
//     .catch(err => {
//       res.status(404);
//       res.json({ message: `Resource not found: ${err}` })
//     })
// }

// // Get single user by id
// exports.getByUserId = async (req, res) => {
//   knex('users')
//     .where('id', req.params.id)
//     .then(userData => {
//       res.json(userData)
//     })
//     .catch(err => {
//       res.status(404);
//       res.json({ message: `Resource not found: ${err}` })
//     })
// }

// // Create new user
// exports.createUser = async (req, res) => {
//   knex('users')
//     .insert({
//       'firstName': req.body.firstName,
//       'lastName': req.body.lastName,
//       'email': req.body.email,
//       'street1': req.body.address.street1,
//       'street2': req.body.address.street2 ? req.body.address.street2 : '',
//       'city': req.body.address.city,
//       'state': req.body.address.state,
//       'zip': req.body.address.zip,
//       'phone': req.body.phone,
//       'ccNum': req.body.payment.ccNum,
//       'exp': req.body.payment.exp,
//       'quantity': req.body.quantity,
//       'total': req.body.total,
//       'orderDate': Date.now(),
//       'fulfilled': false,
//     })
//     .then( data => {
//       res.status(201);
//       res.json({ id: `${data}` })
//     })
//     .catch(err => {
//       res.json({ message: `There was an error creating a new order: ${err}` })
//     })
// }

// // Update fulfilled status of order by user id
// exports.updateFulfilled = async (req, res) => {
//   knex('users')
//     .where('id', req.body.id)
//     .update({fulfilled: `${req.body.fulfilled}`}, ['id', 'fulfilled'])
//     .then( () => {
//       res.status(204);
//       res.json({message: `Resource updated successfully`})
//     })
//     .catch(err => {
//       res.status(404);
//       res.json({ message: `Resource not found: ${err}` })
//     })
// }


// // Delete specific user by id
// exports.deleteUser = async (req, res) => {
//   knex('users')
//     .where('id', req.params.id)
//     .del()
//     .then(() => {
//       res.status(204);
//       res.json({message: `Resource deleted successfully`})
//     })
//     .catch(err => {
//       res.status(404);
//       res.json({ message: `Resource not found: ${err}` })
//     })
// }

// // Delete all users from the database
// exports.resetUsers = async (req, res) => {
//   knex
//     .select('*')
//     .from('users')
//     .truncate()
//     .then(() => {
//       res.json({ message: 'User list cleared.' })
//     })
//     .catch(err => {
//       res.json({ message: `There was an error deleting user list: ${err}.` })
//     })
// }

var express = require('express')
var router = express.Router()
var pool = require('./db')

function updateProductByID (id, cols) {
  // Setup static beginning of query
  var query = ['UPDATE products'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')'); 
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push('WHERE pr_id = ' + id );

  // Return a complete query string
  return query.join(' ');
}


router.post('/', (req, res, next) => {
  const values = [ 
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.address.street1,
      req.body.address.street2 ? req.body.address.street2 : '',
      req.body.address.city,
      req.body.address.state,
      req.body.address.zip,
      req.body.phone,
      req.body.payment.ccNum,
      req.body.payment.expiration,
      req.body.quantity,
      req.body.total
                  ]
  pool.query(`INSERT INTO potionorder(firstname, lastname, email, street1, street2, city, state, zip, phone, quantity, total, ccnum, expiration, fulfilled, orerdate)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW() , false)`,
           values, (q_err, q_res) => {
          if(q_err) return next(q_err);
          res.json(q_res.rows)
    })
})

// module.exports = router