# PhishSploit

PhishSploit is a website that provides a convenient way of viewing correlated Exploits/Phish. For the purposes of this project, we are attempting to identify which exploit is associated with a phish by it's request path, in order to determine if this is a viable means of identifying correlated phish and exploits. At a bare minimum, this framework provides a convenient way of aggregating and querying a populated phish and exploit dataset, and could easily be extended in the future.

## Dependencies

PhishSploit has the following dependencies:

* Node.js
* bower - `sudo npm install -g bower`
* PostgreSQL

### Recommended NPM Dependencies

The following NPM Global Dependencies may prove useful for various tasks:

* esdoc - Used for generating documentation
* apidoc - Used for generating REST api documentation
* node-generate-sql - Used for updating/generating the schema.js file (node-sql)
* nodemon - Useful for live reloading on file changes

## Setup

NOTE: This setup assumes that the exploit_loader and the phish_loader have been used to populate the postgres database.

First, update config.js to include the appropriate postgres database crendentials. Then, install the npm and bower dependencies with the following:

```bash
npm install && bower install
```

Generate REST API Documentation using the following:
```
npm run apidoc
```

You can view this documentation on the /api route, or use http-server to host the documentation independently of the PhishSploit site.

### Babel-Node

This code was written to be used with ECMAScript 6, and thus won't run correctly if you just execute `node` from the command line. All of the built in npm commands will utilize `babel-node` instead of `node` for running the application, as it will transpile the code into ES5 compliant JavaScript on start (which is why it takes a few seconds to start up). You can also compile the application using `babel`, if you're so inclined.

### Environment

Lastly, the app uses the NODE_ENV environment variable to decide which configurations should be loaded in config.js. The supported environments are:

* testing - this is an unused environment intended to be used for unit tests
* development - this is the default environment if NODE_ENV isn't set
* production - this is the environment intended deployment of the application.

There are no huge differences between the environments at the present, but it provides a convenient means of maintaining multiple sets of database credentials for local development and deployment.

## Usage

To run the application, execute the following command:

```bash
npm start
```

Note: On the production server, we're using pm2 to monitor and run the application.
```
pm2 start exploiter/phishsploit/app/index.js --interpreter babel-node --name phishsploit
```

For development, the following command is useful:
```bash
npm run live
```

Any changes made to the application should automatically be reloaded upon save.

## Design

The basic structure of this project follows an MVC design and consists of several main folders:

* config - Folder containing Express App and environment specific configuration settings
* controllers - Modules that expose the REST API through Express Routers.
* helpers - Utility modules/objects that are used across the application.
* middleware - Folder containing Express Middleware functions used in the various controllers.
* models - Data Access modules that are responsible for fetching and storing data from the Database.

The app structure largely follows this [guide](http://www.terlici.com/2014/08/25/best-practices-express-structure.html). In essence, each controller module will be mapped to the route corresponding to it's name when including the controllers folder:

```
app.use('/', require('./controllers'));
```

### Models

All models in the application utilize Promises for the purposes of handling asynchronous operations, although they should still support the standard Node.js err/result callback through the use of nodeify and an optional callback function argument.

The models themselves mostly correspond to the SQL Schema, and are explained further in the module documentation.

## Schema
The PhishSploit Schema is shown in the following diagram:

![schema](https://git.cis.uab.edu/cfilby/exploiter/raw/master/phishsploit/images/schema.png)

Note: Non-views have foreign key constraints linking them to their corresponding exploit/phish table rows.

### Table Description

Each of the tables in the schema are explained below, in order to better illustrate our intentions:

* exploit - The exploit table contains exploit metadata from ExploitDB. Each exploit should have an Exploit File associated with it.
* exploit_file - The Exploit File is a table that contains the exploit description in a BLOB/bytea format. This separation was  mostly done in order to optimize queries on the exploit table (this may have been overkill, given that most exploit files are small text files).
* exploit_key_path - An Exploit Key Path is a url path that we believe can identify correlated phish as being associated with this exploit.
* exploit_phish - This view contains a list of linked exploits and phish, based on the overlap of the exploit_key_path and phish_path_part tables.
* exploit_phish_frequency - This view aggregates statistics on the exploit_phish table in order to indicate how many phish are assocated with each exploit.
* import - An import refers to the loading of a given phish file, and provides a convenient means of correlating sets of phish by their import_id.
* phish - A phish consists of an import_id, indicating the file the phish was loaded from, and metadata about the phish, such as the date it was reported and url information.
* phish_path_part - A phish path part refers to a URL Path substring associated with a given phish url. For example, a phish.com/a/b would have the entries: /a, /a/b and /b in the phish_path_part table.
* phish_part_frequency - This view aggregates Phish Path Parts in order to count the most common path substrings. Note: Even with an index, this view runs very slowly given the massive size of the underlying dataset.

## Improvements

There are several possible improvements for this application, such as:

* Utilize ORM - Sequelize was proving difficult to master
* Support CRUD Operations - Right now we only support the R in crud within the website.
* Testing Suite - Testing would be pretty easy to integrate, although given the time constraints and the relative simplicity of the application these were skipped.
