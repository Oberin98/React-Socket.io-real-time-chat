const exress = require('express');
const router = exress.Router();

router.get('/', (req, res) => {
  res.send('Server is up!')
})

module.exports = router;
