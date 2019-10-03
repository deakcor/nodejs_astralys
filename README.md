# Nodejs Astralys
Nodejs website to host Astralys game

## Running the site

    node app.js
The database to display the leaderboard must be in a folder `bdd/`
The HTML5 game files must be in a folder `views/build`

## Example of use with docker-compose file

    run-site:
        image : darcemontv/node_astralys
        volumes:
          - './bdd:/bdd'
          - './build:/views/build'
        ports :
          - 8080:8080
