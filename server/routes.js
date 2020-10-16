// Import express
const express = require('express')

// Import users controller
const routes = require('./controller')

// Create router
const router = express.Router()

router.get('/all', routes.getUsers)

router.get('/:id([0-9]+)', routes.getByUserId)

router.post('/checkForUser', routes.getByContactInfo)

router.post('/', routes.createUser)

router.put('/', routes.updateFulfilled)

router.delete('/:id([0-9]+)', routes.deleteUser)

router.put('/reset', routes.resetUsers)


module.exports = router