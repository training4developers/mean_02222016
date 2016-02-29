# MEAN App

1. Install [Node.js](https://nodejs.org) and clone this repository.
2. Run the following commands from a terminal in the root folder of the cloned repository.

```bash
$ npm install --global gulp bower
$ npm install
$ bower install
```

4. Run gulp from the terminal, to create the application files.

```bash
gulp
```

5. Open a new terminal, and run the following gulp command to start the web server. The web server will run on port 8080 by default. If this port is not available on your machine, then edit the **config.json** file in the project's root folder, and specify a port that will work. Also, you may need to tweak the database settings in the **config.json** file as well.

```bash
gulp server
```

6. Open your web browser and point it to [http://localhost:8080](http://localhost:8080). The web application will load.
