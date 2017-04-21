# WebSocket Chat
Simple WebSocket chatroom built using Mithril (client) and Node.js (server).

### Features
* usernames
* broadcast when users join/leave
* timestamp on messages and broadcasts
* colored messages
* list of connected users
* auto scrolling (which can be disabled/enabled with a checkbox)


## How to run it locally
### Prerequisites
install `Node.js`, `npm` and `git`

### Clone repository
```sh
git clone https://github.com/havi95/websocket-chat
cd websocket-chat
```

### Install dependencies
* Install global npm packages:
  ```sh
  npm install -g nodemon webpack
  ```
  If you receive an error, try add `sudo` before the above command.

* Install JavaScript dependencies (package.json):
  ```sh
  cd client
  npm install
  cd ../server
  npm install
  cd ..
  ```
  
  ### Build and run
*  Open a second terminal in the same directory

* Build the client sources to `bin/app.js` to reduce the download size and enable the newest JS standard:
  ```sh
  # In terminal 1
  cd client
  npm start
  ```
  `bin/app.js` is automatically updated when the client source files are altered.

* Run node server with newest JS standard (harmony) enabled:
  ```sh
  # In terminal 2
  cd server
  nodemon --harmony server.js
  ```
  `nodemon` ensures that the server restarts when the source files have been changed.

* Open http://localhost:3000 (open at least two windows to test the chat)
