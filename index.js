const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 5002;

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this uploads directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      const body = req.body;
      console.log({ body });
      return res.status(200).json({ message: 'MADE IT TO THE END!!!' });
    }
    const headers = req.headers;
    //   console.log(req.body);
    console.log({ headers });

    // Here you can use fs to manipulate the file, but multer already saved it
    console.log(`Received and saved file: ${file.originalname}`);

    // contrive an id property that will be returned from the wordpress API response
    const fakeId = Math.trunc(Math.random() * 1000) + 1;

    return res.json({
      message: `File uploaded successfully: ${file.originalname}`,
      id: fakeId,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
