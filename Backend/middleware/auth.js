require('dotenv').config();
module.exports = function(req, res, next) {
  const pass = req.headers['x-upload-password'];
  if(pass !== process.env.UPLOAD_PASSWORD) return res.status(401).json({error:'Bad password'});
  next();
};
