
# Tokopedia Play Clone API  ( Express.js + MongoDB)

This repository includes a Video Management RESTful API developed with Express.js and MongoDB. It enables clients to do video retrieval, fetching linked products and comments, and adding new comments for individual videos. Detailed setup instructions and a database schema explanation are provided.

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Installation
1. Clone this Repository to your local machine
2. Navigate to the project directory and open terminal
3. install the required dependencies using : 

```bash
  npm install
```
    
## Configuration

To get started with the API, ensure proper configuration of environment variables. Begin by creating a `.env` file using the provided `.env.example` file using the command:

    cp .env.example .env
Next, open the `.env` file and fill in the appropriate values for the environment variables based on your MongoDB setup.

Example `.env` file:

    DATABASE_URL = mongodb://localhost:27017/tokpedplay
Remember to replace the DATABASE_URL with the connection string specific to your MongoDB database. This setup will enable smooth functioning of the API with your database.

## Database Schema

The API utilizes Mongoose to define the MongoDB database schema and consists of three main collections: `Video`, `Product`, and `Comment`.

### 1. Video Schema
This Collection stores data video.

```javascript video.js
const videoSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    urlThumbnail:{
        required:false,
        type:String,
    },
    linkVideo:{
        required:true,
        type:String
    },
    products:[{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:false,
    }],
    comments:[{
        type:mongoose.Types.ObjectId,
        ref:'Comment',
        required:false,
    }]

});
```
#### Fields :
- `title` (String, required) : The title of the video.
- `urlThumbnail` (String) : Url for thumbnail of the video. 
- `linkVideo` (String, required) : Embeded Url of the video.
- `products` (Array of ObjectIds, ref: 'Product') :  An array of references to Product documents associated with the video.
- `comments` (Array of ObjectIds, ref: 'Comments') :  An array of references to Comments documents associated with the video.

### 2. Product Schema
This Collection stores data video.

```javascript product.js
const productSchema = new mongoose.Schema({
    productName:{
        required:true,
        type:String,
    },
    price:{
        required:true,
        type:Number,
    },
    linkProduct:{
        required:true,
        type:String
    },
});
```
#### Fields :
- `productName` (String, required) : The name of the product.
- `price` (String) : The price of the product.
- `linkProduct` (String, required) : Embeded Url of the product.

### 3. Comment Schema
This Collection stores data video.

```javascript comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    comment:{
        required:true,
        type:String,
    },
},
{ 
timestamps: true 
});

module.exports = mongoose.model('Comment', commentSchema)
```
#### Fields :
- `productName` (String, required) : The name of the product.
- `price` (String) : The price of the product.
- `linkProduct` (String, required) : Embeded Url of the product.
## API Endpoints
List of available endpoints : 
1. GET `/api/video` : Get a list of all videos.
2. GET `/api/product/:videoId` : Get a list product for a specific video.
3. GET `/api/comment/:videoId` : Get a list comments for a specific video.
4. POST `/api/comment/:videoId` : Create a new comment for a specific video.

For a detailed explanation of the request and response format for each endpoint, please refer to this [gist API Endpoints.](https://gist.github.com/nasrulazis/f08b1b1ca2c534b5acb6fb9ea9352ef8)
## Usage/Examples
To start the API, run the following command in the terminal:
```javascript
npm run dev
```
After initiating the API server, you will be able to interact with the endpoints by navigating to `http://localhost:3000`, assuming the default port is utilized. 
