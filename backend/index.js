const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' })

const app = express();
const port = 8080;

// Define the storage for multer
const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     // Check if the uploaded file is an image
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only images are allowed.'));
//     }
//   },
// });

// Endpoint for handling file uploads and resizing
app.post('/upload', upload.single('file'), async (req, res) => {
  // try {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'No file uploaded.' });
  //   }

  //   const { buffer } = req.file;
  //   const { resolution } = req.body;

  //   // Resize the image using Sharp library based on the selected resolution
  //   const resizedBuffer = await sharp(buffer)
  //     .resize({ width: getResolutionWidth(resolution) })
  //     .toBuffer();

  //   // Determine the category based on the selected resolution
  //   const category = resolution.toLowerCase();

  //   // Create the category directory if not exists
  //   const categoryPath = path.join(__dirname, 'uploads', category);
  //   if (!fs.existsSync(categoryPath)) {
  //     fs.mkdirSync(categoryPath);
  //   }

  //   // Save the resized image in the appropriate directory
  //   const savePath = path.join(categoryPath, `${Date.now()}.jpg`);
  //   fs.writeFileSync(savePath, resizedBuffer);

  //   res.status(200).json({ success: true });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ success: false, error: 'Internal Server Error' });
  // }

  console.log(req.body)
  console.log(req.file)

});

// Endpoint for fetching image data
app.get('/images', (req, res) => {
  try {
    const imageCategories = ['original', 'low', 'medium', 'high'];

    const imageData = imageCategories.reduce((result, category) => {
      const categoryPath = path.join(__dirname, 'uploads', category);

      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath).map((file) => {
          return {
            url: `http://localhost:8080/uploads/${category}/${file}`,
            category,
          };
        });

        result[category] = files;
      }

      return result;
    }, {});

    res.status(200).json(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to get width based on resolution
function getResolutionWidth(resolution) {
  switch (resolution) {
    case 'low':
      return 320;
    case 'medium':
      return 640;
    case 'high':
      return 1280;
    default:
      return null; // Original resolution
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
