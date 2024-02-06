```markdown
# NUXTDimitra - Multimedia Resolution Conversion

## Frontend

**To start the frontend:**

```bash
cd frontend
yarn
yarn dev
```

The frontend utilizes NUXT along with NUXTUI as a UI library. NUXTjs, a Vue framework akin to NEXTjs, powers the frontend.

## Backend

**To start the backend:**

```bash
cd backend
yarn
yarn start
```

The backend comprises two APIs:

1. **/upload:** This API manages uploaded images, storing them in directories based on their resolution values such as "original," "low," "high," and "medium."

2. **/images:** This API handles all frontend GET requests, responding with a list of multimedia items, each accompanied by a unique identifier, e.g., Low=1, imgURL=img.jpg, etc.

### Multer for File Handling

File handling for uploads is managed using the Multer package, facilitating efficient handling of files received from the frontend.

### Sharp for Resolution Conversion

The Sharp npm package is employed to alter the resolution of images exclusively. Note that for videos, only resolution downgrading is supported. Although Cloudinary was initially considered for multimedia handling, due to time constraints, it was not implemented.

Feel free to enhance the functionality by incorporating image uploads! Strive to optimize the solution to the best of your abilities.
```