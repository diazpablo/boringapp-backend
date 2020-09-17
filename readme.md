## Introduction

This project is the backend of Boring App
This is the implementation is in 
Node.js.

## Setup

### Install MongoDB

To run this project locally, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running. Then create a DB and set it up in the config/default.json file.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm install
    
### Configure Cloudinary

This project is develop to work with Cloudinary service. To setup the cloud static server you can get a free account here: 

https://cloudinary.com/users/register/free

From there you can set your environment variables:
    
On Mac:

    export boringapp_cdn_name="Cloud name"
    export boringapp_cdn_api_key="API Key" 
    export boringapp_cdn_api_secret="API Secret" 

On Windows:

    set boringapp_cdn_name="Cloud name"
    set boringapp_cdn_api_key="API Key" 
    set boringapp_cdn_api_secret="API Secret" 


### Populate the Database

There is a pre-built database data you can run next script, if you have problems seeding db check the package.json engines. Ensure you have set the default config variables or environment variables if you want to change them. The image within this is uploaded to cloudinary.  

    node seed.js
    
Defaults users: admin@mail.com (admin role) and user@mail.com (user role).

### Start the Server

    node index.js

This will launch the Node server on port 3900. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:3900/api/types

You should see the list of types. That confirms that you have set up everything successfully.

### (Optional) Environment Variables

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac:

    export boringbackend_jwtPrivateKey=yourSecureKey

On Windows:

    set boringbackend_jwtPrivateKey=yourSecureKey
