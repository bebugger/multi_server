const express = require('express')
const router = express.Router();
const quoteCtrl = require('../Controllers/quoteController')
const auth = require('../Middleware/auth')

router.post('/',auth,quoteCtrl.create);

router.post('/get',auth,quoteCtrl.getAll);

router.post('/get/:id',auth,quoteCtrl.getOne);

router.post('/update/:id',auth,quoteCtrl.upadte);

router.post('/delete/:id',auth,quoteCtrl.delete);

module.exports = router;