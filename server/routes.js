// Import express
const express = require('express')

// Import users controller
const routes = require('./controller')

// Create router
const router = express.Router()

router.get('/all', routes.getUsers)

router.get('/:id([0-9]+)', routes.getByUserId)

router.post('/', routes.createUser)

router.post('/checkForUser', routes.getByContactInfo)

router.put('/', routes.updateFulfilled)

router.put('/reset', routes.resetUsers)

router.delete('/:id([0-9]+)', routes.deleteUser)

module.exports = router