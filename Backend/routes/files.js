const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const fileFilter = require('../middleware/fileFilter');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const section = req.body.section;
    let dir = 'uploads/other';
    if(section === 'ACADEMIC BOOKS') dir = 'uploads/academic-books';
    if(section === 'PERSONAL BOOKS') dir = 'uploads/personal-books';
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, fileFilter });

const fs = require('fs');
router.post('/', auth, upload.single('file'), (req, res) => {
  if(!req.file) return res.status(400).json({error:'File rejected'});
  res.json({success:true, path:req.file.path});
});

router.get('/', (req, res) => {
  const getFiles = section => fs.existsSync(section) ? fs.readdirSync(section).map(f => (section+'/'+f)) : [];
  res.json({
    'ACADEMIC BOOKS': getFiles('uploads/academic-books'),
    'PERSONAL BOOKS': getFiles('uploads/personal-books'),
    'OTHER': getFiles('uploads/other')
  });
});

module.exports = router;
// ...existing imports and setup

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use('/api/files', fileRoutes);
app.use('/api/chat', chatRoutes);

// ...socket.io code and server listen unchanged
