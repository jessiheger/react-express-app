// Import express
const express = require('express')

// // Create router
const router = express.Router()

var pool = require('./db')


router.get('/:id([0-9]+)', (req, res) => {
    pool.query(`SELECT * FROM potionorder WHERE id = ${req.params.id}`,
    (q_err, q_res) => {
        if (q_err) {
            res.status(404);
            res.json({message: `Resource not found: ${q_err}`})
        }
        else {
            res.json(q_res.rows);
        }
        
    })
})

// NOT WORKING YET
router.put('/', (req, res) => {
    pool.query(`UPDATE potionorder SET fulfilled = ${req.body.fulfilled} WHERE id = ${req.body.id}`,
    (q_err, q_res) => {
        if (q_err) {
            res.status(404);
            res.json({message: `Resource not found: ${q_err}`})
        } else {
            res.status(204);
            res.json({message: `Resource updated successfully`})
        }
    });
})

// working but shows success message even when there is no user with that id
router.delete('/:id([0-9]+)', (req, res) => {
    pool.query(`DELETE from potionorder WHERE id = ${req.params.id}`,
    (q_err, q_res) => {
        if (q_err) {
            res.status(404);
            res.json({message: `Resource not found: ${q_err}`})
        } else {
            res.status(204);
            res.json({message: `Resource deleted successfully`})
        }
    });
})

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
    pool.query(`INSERT INTO potionorder(firstname, lastname, email, street1, street2, city, state, zip, phone, ccnum, expiration, quantity, total, orderdate, fulfilled)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW() , false)`,
             values, (q_err, q_res) => {
                if (q_err) {
                    res.status(404);
                    res.json({message: `There was an error creating a new order: ${q_err}`})
                } else {
                    res.status(201);
                    res.json(q_res.rows)
                }
      })
  })
  
router.post('/checkForUser', (req, res) => {
    const values = [ 
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone
    ]
    pool.query(`SELECT * FROM potionorder WHERE firstname = $1 AND lastname = $2 AND email = $3 AND phone = $4`,
          values, (q_err, q_res) => {
        if(q_err) return res.json(q_err);
        res.json(q_res.rows)
        })
      })
      
router.get('/all', (req, res) => {
    pool.query(`SELECT * FROM potionorder`,
    (q_err, q_res) => {
        if(q_err) return res.json(q_err);
        res.json(q_res.rows)
    })
})
  

module.exports = router