# TrouveTonClub

![NodeSecurity Logo][nodesecurity]
![travis-ci Logo][travis-ci]

TrouveTonClub is a mobile-ready, node.js powered website for searching sports club.

  - enter your search

### Tech

TrouveTonClub uses a number of open source projects to work properly:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [jQuery] - duh

And of course TrouveTonClub itself is open source with a [public repository][ttc]
 on GitHub.

### Installation

TrouveTonClub requires [Node.js] v7+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd TrouveTonClub
$ npm install -d
$ npm run dev
```

For production environments...

```sh
$ cd TrouveTonClub
$ npm install
$ npm run start
```

### Development

Want to contribute? Great!

TrouveTonClub uses [PM2] for developing.
Make a change in your file and reload to see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ pm2 start app.js
```

License
----

GPLv3


   [ttc]: <https://github.com/ACS-DDS/TrouveTonClub>
   [Node.js]: <https://nodejs.org/>
   [PM2]: <http://pm2.keymetrics.io/>
   [Twitter Bootstrap]: <https://getbootstrap.com/>
   [jQuery]: <https://jquery.com/>
   [express]: <https://expressjs.com/>
   [nodesecurity]: <https://nodesecurity.io/orgs/acs-dds/projects/d54f29ae-5ab1-4ca6-bcfd-554e8356afc0/badge> "NodeSecurity Logo"
   [travis-ci]: <https://api.travis-ci.org/ACS-DDS/TrouveTonClub.svg?branch=master> "travis-ci"
