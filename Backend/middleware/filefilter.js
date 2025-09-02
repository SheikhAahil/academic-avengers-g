const allowedTypes = ['pdf','jpeg','img','jpg','xls','mp3'];
module.exports = (req, file, cb) => {
  const ext = file.originalname.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(ext)) return cb(null, false);
  if(file.size > 7 * 1024 * 1024) return cb(null, false);
  cb(null, true);
};
