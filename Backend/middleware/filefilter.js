
const allowedTypes = ['pdf','jpeg','png','jpg','xls','mp3'];

module.exports = (req, file, cb) => {
  const ext = file.originalname.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(ext)) return cb(new Error('File type not allowed'), false);
  cb(null, true);
};
