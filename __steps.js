/**
 * ------------------------------------
 * * * START steps of server/backend site ***
 * ------------------------------------
 *      * ******* NOTES *******
 * 1. express.js, Node এর কাজগুলোকে organize, esier করতে সাহায্য করে।
 * 2. React, JavaScript এর কাজগুলোকে organize করতে সাহায্য করে।
 * 3. git clone করে npm i দিতে হয়।
 * 4. দুইটা আলাদা port থেকো communicate করার জন্য cors install করতে হয়।
 * 5. password secure করার জন্য dotenv install করতে হয়।
 * 6. dotenv/.env file এর জন্য “require('dotenv').config();” টা import করতে হয়।
 *      * ******* NOTES *******
 * 1. mkdir appName > code . > npm init -y > npm i express cors mongodb dotenv > npm install -g nodemon[optional.once time]
 * 2. go to (package.json) file > 
 *      "scripts": {
 *          "start": "node index.js",
 *          "start-dev": "nodemon index.js",}
 * 3. create (index.js) file > then put the following all into indes.js 
 * [ * // configuration
1. const express = require('express'); // [req দিলে ‍shor-cut]
2. const app = express();
3. const port = process.env.PORT || 5000;
4. const cors = require('cors'); [দুইটা আলাদা port থেকে communicate করার জন্য]
5. require('dotenv').config(); [password secure করার জন্য এই config টাকে আনতে হয়]


* // middleware
1. app.use(cors());
2. app.use(express.json()); [body দিয়ে যে ডাটাটা পায় সেটা আমরা parse করতে পারি]


* // root API]
1. app.get('/', (req, res) => {
    res.send('Running Genius Server');
});

2. app.listen(port, () => {
    console.log('Listening to port', port);
})
* ------------------------------------
 * * * END steps of server/backend site ***
 * ------------------------------------
 */




/**
 *         ------ NOTES -----
 * ডাটা insert করার সারকথা: 
 * 1. Create a form into CLIENT SITE > take data through event hadler and set a user
 * 2. Send the data into SERVER SITE through the POST API
 * 3. Send the data into database through insertOne
 * 4. আমাদের নিজস্ব ডাটা use করার জন্য server site এ get API তৈরি করব।
 * 5. Cluster name = Nabin, Database name = geniusCar & Collection name = user,  User Name = geniusUser.
 *         ------ NOTES -----
 *  ------------------------------------
 * * * START steps of mongodb/database ***
 * ------------------------------------
 * 
 ******** connect to the database ********
     ---------------------------------
 * step-1: serch mongodb atlas > signin > go to console > login > Browser Collection > Create Database > put Database name & Collection name > Click on Create button
 *2. serch node mognodb CRUD > Usage Example > Find Operation > Find Multiple Documents 
 * 4. go to database > connect > connect you application > copy the code example > paste it into the sever site under the middleware > after paste, cut the top line, again paste the line under the configure
 * 5. ensure the connect putting the console.log 
 * 6. set the password > Database Access > edit / +ADD NEW DATABASE > put User Name & copy the password > paste them into .env file
 * 7. go to index.js file and edit the file this way:
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nabin0.mmmsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
8. database এ connect করার সময় অবশ্যই database name এবং collection name হুবুহু দিতে হবে।
    ---------------------------------
 ******** connect to the database ********

        ******** data load *********
        ----------------------------
1. data load করার সময় async function use করতে হয় > ‍async function এর মধ্যে try and finally use করতে হয়।
2. try এর ভিতরে প্রথম কাজ হচ্ছে connection করা। > collection set করা।(client এর মধ্যে ডাটাবেজ খোঁজা, তারপর collection খোঁজা )
3. তারপর query set করা। > তারপর cursor set করা তারপর toArray set করা।
4. array একটাকে খুঁজলে find এবং একাধিক খুঁজলে filter করতে হয়।
5. async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally {

    }
};
6. Write the following code: 
app.post('/service', async(req, res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })
7. go to AddService.js file
run().catch(console.dir); -> এগুলো লিখার পর > CLIENT SITE এর ‍Services.js file এ চলে যেতে হয়।
6. তারপর url এর যায়গায় http://localhost:5000/service টা দিতে হয়।
7. তারপর id গুলোকে _id তে পরিণত করতে হবে।
8. go to server site index.js file > create another app.get route>  app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }; [ObjectId টাকে import করতে হবে]
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        ----------------------------
        ******** data load *********
 * ------------------------------------
 * * * END steps of mongodb/database ***
 * ------------------------------------
 */




/**
 * --------------------------------------
 *              KEY SHORT-CUT
 * --------------------------------------
 * 1. [alt + click] = একই সাাথে অনেক যায়গায় cursor select করার জন্য।
 * 2. [shift + left or rigth arrow] = একটা letter করে অনেকগুলো word select করার জন্য।
 * 3. [ctrl + shift + left/right arrow] = একটা word করে অনেকগুলো word select করার জন্য।
 * 4. shift চেপে ধরে যে যায়গায় click করব ততটুকু select করার জন্য।
 * 5. [ctrl + shift + E] = VS কোডের Explorer button Expand করার জন্য।
 * 6. [ctrl + D] = similar word select হবে।
 * 7. [alt + upper/lower arrow] = line উপরে নিচে উঠানোর জন্য।
 * 8. [ctrl + home] = page এর শুরুতে চলে যায়।
 * 9. [ctrl + end] = page এর শেষে চলে আসে।
 * 10. [ctrl + page up/page down] = tab পরিবর্তন হয়।
 * 11. [] = 
 */



/**
 * ---------------------------------------
 *              START CLINET SITE 
 * ---------------------------------------
 * 1. Go to the ServiceDetail file > load the data using useStatat()
 * 2. Create another components, AddService.js 
 * 3. Search Reat hook form > Copy this 'npm install react-hook-form' and install at the client site
 * 4. Add React hook form ata AddServic.js file 
 * 5. textArea দিলে text এর মতো করে লেখা যায়।
 * 6. got to server site
 * 7. Writ the following code: 
 * const onSubmit = data => {
        console.log(data);
        const url = `http://localhost:5000/service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    };
    8. 
 */



/**
 * // Last Step
 * 1. Create a .gitignore file > Write node_modules and .env into the .gitignore file
 */