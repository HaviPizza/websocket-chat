// @flow

import m from 'mithril';
import ChatManager from '../chat-manager';

// Component that renders the welcome screen
export default class WelcomeComponent {

  username: string;

  onEnter = (event) => {
    event.preventDefault();
    if (this.username) {
      ChatManager.get().setUsername(this.username);
      ChatManager.get().init();
      window.location.replace("#!/chat");
    }
  }

  view() {
    return (
      <div id="welcome-window">
      <h2>WebSocket Chat</h2>
      Enter your username:
      <form onsubmit={this.onEnter}>
      <input type="text" id="message-input" name="messageInput" onchange={m.withAttr("value", (val) => {this.username = val})} value={this.username} />
      <input type="submit" value="Enter" />
      </form>
      </div>
    );
  }
}
