// @flow

import m from 'mithril';
import ChatEntry from './chat-entry';

// Class that manages the connection with the server
export default class ChatManager {

  static instance = null;
  username: string;
  chatHistory: Array<ChatEntry> = [];
  users: Array<string> = [];
  ws: WebSocket;

  // Set up WebSocket connection with the server
  init() {
    this.ws = new WebSocket("ws://localhost:3001/"+this.username);

    this.ws.onerror = (error) => {
      console.log(error);
    };

    this.ws.onopen = () => {
      console.log("connected");
    };

    this.ws.onmessage = (event) => {
      var json = JSON.parse(event.data);
      if (json.user && json.message && json.color && json.timestamp) {
        this.chatHistory.push(new ChatEntry(json.user, json.message, json.color, json.timestamp));
      } else if (json.users) {
        this.users.length = 0;
        [].push.apply(this.users, json.users);
      } else if (json.broadcast) {
        this.chatHistory.push(new ChatEntry("", json.broadcast, "#555555", this.getTimestamp()));
      }
      m.redraw();
    };

    this.ws.onclose = (message) => {
      console.log("not connected");
    };

  }

  // Return singleton
  static get() {
    if (!ChatManager.instance) {
      ChatManager.instance = new ChatManager();
    }
    return ChatManager.instance;
  }

  // Set the username of this client
  setUsername(username) {
    this.username = username;
  }

  // Get the username of this client
  getUsername() {
    return this.username;
  }

  // Send a message to the server that will be forwarded to all other clients
  sendMessage(message, color, timestamp) {
    if (this.ws.readyState == 1) {
      var json = {"user": this.username, "message": message, "color":color, "timestamp": timestamp};
      this.ws.send(JSON.stringify(json));
    }
  }

  // Get chat history since this client connected
  getHistory() {
    return this.chatHistory;
  }

  // Get list of connected users (usernames)
  getUsers() {
    return this.users;
  }

  // Get a timestamp (hh:mm)
  getTimestamp() {
    var date = new Date();
    return ((date.getHours() < 10) ? "0"+date.getHours() : date.getHours()) + ":" + ((date.getMinutes() < 10) ? "0"+date.getMinutes() : date.getMinutes());
  }

}
