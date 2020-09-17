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

### Populate the Database

There is a pre-built database data you can run next script, if you have problems seeding db check the package.json engines. Ensure you have set the defaults config variables or environment variables if you want to change theme.  

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
