// @flow

// Class that represents an entry in the chat
export default class ChatEntry {
  user: string;
  message: string;
  color: string;
  timestamp: string;
  constructor(user: string, message: string, color: string, timestamp: string) {
    this.user = user;
    this.message = message;
    this.color = color;
    this.timestamp = timestamp;
  }
}
