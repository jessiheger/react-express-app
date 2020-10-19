// Import express
const express = require('express')

// Import users controller
// const routes = require('./controller')

// // Create router
const router = express.Router()

var pool = require('./db')


// router.get('/all', routes.getUsers)

// router.get('/:id([0-9]+)', routes.getByUserId)

// router.post('/', routes.createUser)

// router.post('/checkForUser', routes.getByContactInfo)

// router.put('/', routes.updateFulfilled)

// router.put('/reset', routes.resetUsers)

// router.delete('/:id([0-9]+)', routes.deleteUser)

router.post('/', (req, res, next) => {
    const values = [ 
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.street1,
        req.body.street2 ? req.body.street2 : '',
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.phone,
        req.body.ccNum,
        req.body.expiration,
        req.body.quantity,
        req.body.total
                    ]
    pool.query(`INSERT INTO potionorder(firstname, lastname, email, street1, street2, city, state, zip, phone, ccnum, expiration, quantity, total, orderdate, fulfilled)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW() , false)`,
             values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
      })
  })
  
  // Get single user by contact info
router.post('/checkForUser', (req, res) => {
    const values = [ 
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.street1,
      req.body.street2 ? req.body.street2 : '',
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.phone
    ]
    pool.query(`SELECT * FROM potionorder WHERE firstname = $1 AND lastname = $2')`,
          values, (q_err, q_res) => {
        if(q_err) return res.json(q_err);
        res.json(q_res.rows)
        })
      })
      
// router.get('/all', (req, res) => {
//     pool.query(`SELECT * FROM potionorder`,
//     (q_err, q_res) => {
//         if(q_err) return res.send(q_err);
//         res.json(q_res.rows)
//     })
// })
  

module.exports = router