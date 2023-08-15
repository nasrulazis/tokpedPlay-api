## FINAL PROJECTS GIGIH 3.0 BACKEND
# Tokopedia Play Clone API ( Express.js + MongoDB)

This repository includes a Video Management RESTful API developed with Express.js and MongoDB. It enables clients to do video retrieval, fetching linked products and comments, and adding new comments for individual videos. Detailed setup instructions and a database schema explanation are provided.


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
    CORS_ORIGIN = http://localhost:5173
Remember to replace the DATABASE_URL and CORS_ORIGIN with the connection string specific to your MongoDB database. This setup will enable smooth functioning of the API with your database and your app.

## Database Schema

The API utilizes Mongoose to define the MongoDB database schema and consists of 4 collections: `Video`, `Product`, `Comment` and `User`.

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
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:false,
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
- `user` (ObjectIds, ref: 'User') : A reference to User document associated with the video.
- `products` (Array of ObjectIds, ref: 'Product') :  An array of references to Product documents associated with the video.
- `comments` (Array of ObjectIds, ref: 'Comments') :  An array of references to Comments documents associated with the video.

### 2. Product Schema
This Collection stores data products.

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
    linkImageProduct:{
        required:true,
        type:String
    },
});
```
#### Fields :
- `productName` (String, required) : The name of the product.
- `price` (String) : The price of the product.
- `linkProduct` (String, required) : Embeded Url of the product.
- `linkImageProduct` (String, required) : Embeded Url of the product image.

### 3. Comment Schema
This Collection stores data comments.

```javascript comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:false,
    }
    comment:{
        required:true,
        type:String,
    },
},
{ 
timestamps: true 
});

```
#### Fields :
- `user` (String, required) : A reference to User document associated with the comment.
- `comment` (String) : The comment document.

### 4. User Schema
This Collection stores data user.

```javascript comment.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    image:{
        required:false,
        type:String,
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
});

```
#### Fields :
- `name` (String, required) : The user name.
- `image` (String) : The user image url (only string because it should be linked to public images path).
- `email` (String) : The user email for login.
- `password` (String) : The user pawword for login.

## API Endpoints
List of available endpoints : 
- Video
1. GET `/api/video` : Get a list of all videos.
2. GET `/api/video/search` : Get a list of search videos.
3. GET `/api/video/:id` : Get an object of single videos.
4. POST `/api/video` : Post a videos.
- Product
1. GET `/api/products/:videoId` : Get a list of products in a single videos.
2. POST `/api/products/:videoId` : Create a products in a single videos.
- Comment
1. GET `/api/comment/:videoId` : Get a list comments for a specific video.
2. POST `/api/comment/:videoId` : Create a new comment for a specific video.
- User
1. GET `/api/user/` : Get a list of all user.
2. GET `/api/user/user` : Get the loged in user with access token.
2. GET `/api/user/:id` : Get a single user by id.
3. POST `/api/user/login` : Loged user in and set user accesstoken to cookies.
4. POST `/api/user/logout` : Loged user out and remove user accesstoken from cookies.


For a detailed explanation of the request and response format for each endpoint, please refer to this [gist API Endpoints.](https://gist.github.com/nasrulazis/81356e5323e3c9308bd5d05a09bfe77c)
## Usage/Examples
To start the API, run the following command in the terminal:
```javascript
npm run dev
```
After initiating the API server, you will be able to interact with the endpoints by navigating to `http://localhost:3000`, assuming the default port is utilized. 
