# mejor-webapp

This is a project performed for GRUPO-MCONTIGO

Tools used : 
- framework : NodeJS
- package control : npm 

## Installation

To install that project; please run `npm start`
This commands : 
- install npm necessary packages
- launch our nodejs server

If you wish to develop on that project; please install nodemon (https://github.com/remy/nodemon)
and use `npm test` to start a livereload node js server

Server is started on port : 3000

Database used is a remote Mongodb database on MLab.
Login / password are defined within JS files.

## Usage

This api exposes several services for mejor-webapp including :
- POST user/ (create a new user based on his email adress)
- GET user/ (get user info)

Moreover; a nodescheduler is defined to purge database every 72h.
Moment.js has not been used for that project; as date management were very few to justify the use of that lib.
However; I'm very familiar with it.


## Credits
Alexandre ORFEVRE

