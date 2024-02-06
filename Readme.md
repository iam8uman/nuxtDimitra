# NUXTDimitra - Images/Video(Multimedia) resolution conversion

## Frontend part

*To start frontend *

cd frontend
yarn
yarn dev

In frontend, i used NUXT along with NUXTUI as a UI library. Nuxtjs is a vue framework similar to the NEXTjs. 

# Backend part

*To start backend*

cd backend
yarn
yarn start

In backend, we have two APIs, 
1. /upload = this api handle the uploaded images(for now) to store in their respective directory accroging to their changing resolution value such as "original", "low", "high", "medium"

2. /images = this api handle all the get request from the frontend which responds all the list of multimedia list along with its number like this. Low=1, imgURL= img.jpg etc

## Multer for file handling
Here i used Multer package for handling file which has been uploaded from the frontend. 

## Sharp for changing resolution
This npm package help to change the resolution of a image(only image). 

Note: for video only we can downgrade its resolution. I was planning to use cloudinary for all the multimedia but due to the limited time i couldnot make it.
