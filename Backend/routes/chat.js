const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "chat handled by socket.io" });
});

module.exports = router;
