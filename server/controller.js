const knex = require('./db')

// Get all users
exports.getUsers = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.status(404)
      res.json({ message: `Resource not found: ${err}` })
    })
}

// Get single user by contact info
exports.getByContactInfo = async (req, res) => {
  knex('users')
    .where({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'email': req.body.email,
      'street1': req.body.street1,
      'street2': req.body.street2 ? req.body.street2 : '',
      'city': req.body.city,
      'state': req.body.state,
      'zip': req.body.zip,
      'phone': req.body.phone
    })
    .then(data => {
      if (data.length > 0) {
        res.json({data: data, message: 'User already exists'})
      } else {
        res.json({data: data, message: 'User is not in the database'})
      }
    })
    .catch(err => {
      res.status(404);
      res.json({ message: `Resource not found: ${err}` })
    })
}

// Get single user by id
exports.getByUserId = async (req, res) => {
  knex('users')
    .where('id', req.params.id)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.status(404);
      res.json({ message: `Resource not found: ${err}` })
    })
}

// Create new user
exports.createUser = async (req, res) => {
  knex('users')
    .insert({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'email': req.body.email,
      'street1': req.body.address.street1,
      'street2': req.body.address.street2  ? req.body.address.street2 : '',
      'city': req.body.address.city,
      'state': req.body.address.state,
      'zip': req.body.address.zip,
      'phone': req.body.phone,
      'ccNum': req.body.payment.ccNum,
      'exp': req.body.payment.exp,
      'quantity': req.body.quantity,
      'total': req.body.total,
      'orderDate': Date.now(),
      'fulfilled': false,
    })
    .then( data => {
      res.status(201);
      res.json({ id: `${data}` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating a new order: ${err}` })
    })
}

// Update fulfilled status of order by user id
exports.updateFulfilled = async (req, res) => {
  knex('users')
    .where('id', req.body.id)
    .update({fulfilled: `${req.body.fulfilled}`}, ['id', 'fulfilled'])
    .then( () => {
      res.status(204);
      res.json({message: `Resource updated successfully`})
    })
    .catch(err => {
      res.status(404);
      res.json({ message: `Resource not found: ${err}` })
    })
}


// Delete specific user by id
exports.deleteUser = async (req, res) => {
  knex('users')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.status(204);
      res.json({message: `Resource deleted successfully`})
    })
    .catch(err => {
      res.status(404);
      res.json({ message: `Resource not found: ${err}` })
    })
}

// Delete all users from the database
exports.resetUsers = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .truncate()
    .then(() => {
      res.json({ message: 'User list cleared.' })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting user list: ${err}.` })
    })
}