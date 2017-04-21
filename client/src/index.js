// @flow

import m from 'mithril';
import WelcomeComponent from './components/welcome';
import ChatComponent from './components/chat';

// Routing
m.route(document.body, "/welcome", {
  "/welcome": WelcomeComponent,
  "/chat": ChatComponent
});
