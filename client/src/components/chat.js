// @flow

import m from 'mithril';
import ChatManager from '../chat-manager';
import ChatEntry from '../chat-entry';

// Component that renders the main chat window
export default class ChatComponent {

  chatHistory: Array<ChatEntry> = [];
  users: Array<string> = [];
  message: string;
  color: string = "#000000";
  cm: ChatManager = ChatManager.get();
  autoscroll: bool = true;

  oninit() {
    if (!this.cm.getUsername()) {
      window.location.replace("#!/welcome");
      return;
    }
    this.chatHistory = this.cm.getHistory();
    this.users = this.cm.getUsers();
  }

  onupdate() {
    if (this.autoscroll) {
      var msgWindow = document.getElementById("msg-window");
      msgWindow.scrollTop = msgWindow.scrollHeight;
    }
  }

  onSend = (event) => {
    event.preventDefault();
    if (this.message) {
      var timestamp = this.cm.getTimestamp();
      this.chatHistory.push(new ChatEntry("You", this.message, this.color, timestamp));
      this.cm.sendMessage(this.message, this.color, timestamp);
      this.message = "";
    }
  }

  view() {
    var messages = this.chatHistory.map((entry) => {
      var style = {
        color: entry.color
      };
      return <div id="msg">{entry.timestamp}  <b>{entry.user}</b>: <span style={style}>{entry.message}</span></div>;
    });
    var users = this.users.map((user) => {
      return <div>{user}</div>;
    });
    return (
      <div id="chat-window">
      <div id="msg-window">{messages}</div>
      <div id="user-list">{users}</div>
      <div id="chat-input">
      <form onsubmit={this.onSend}>
      <input type="text" id="msg-input" value={this.message} oninput={(e) => {this.message = e.target.value}} onchange={m.withAttr("value", (val) => {this.message = val})} autocomplete="off" />
      <input type="color" value={this.color} onchange={m.withAttr("value", (val) => {this.color = val})} />
      <input type="submit" id="send-btn" value="Send" />
      <span id="autoscroll">
      autoscroll
      <input type="checkbox" checked={this.autoscroll} onclick={m.withAttr("value", (val) => {this.autoscroll = !this.autoscroll})} />
      </span>
      </form>
      </div>
      </div>
    );
  }
}
