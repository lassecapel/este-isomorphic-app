import DocumentTitle from 'react-document-title';
import NewTodo from '../todos/newtodo.react';
import React from 'react';
import TodoList from '../todos/todolist.react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import {addHundredTodos, clearAll} from '../todos/actions';
import {getNewTodo, getTodos} from '../todos/store';
import {msg} from '../intl/store';
import {state} from '../state';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('./todos.styl');

// Naïve undo implementation.
// TODO: Reimplement it.
const undoStates = [];

export default class Todos extends React.Component {

  componentDidMount() {
    state.on('change', this.onStateChange);
    document.addEventListener('keypress', this.onDocumentKeypress);
  }

  componentWillUnmount() {
    state.removeListener('change', this.onStateChange);
    document.removeEventListener('keypress', this.onDocumentKeypress);
  }

  onStateChange(newState) {
    undoStates.push(newState);
  }

  onDocumentKeypress(e) {
    // Press shift+ctrl+s to save app state and shift+ctrl+l to load.
    if (!e.shiftKey || !e.ctrlKey) return;
    switch (e.keyCode) {
      case 19:
        window._appState = state.save();
        window._appStateString = JSON.stringify(window._appState);
        /*eslint-disable no-console */
        console.log('app state saved');
        console.log('copy the state to your clipboard by calling copy(_appStateString)');
        console.log('or type _appState and press enter');
        /*eslint-enable */
        break;
      case 12:
        const stateStr = window.prompt('Path the serialized state into the input'); // eslint-disable-line no-alert
        const newState = JSON.parse(stateStr);
        if (!newState) return;
        state.load(newState);
        break;
    }
  }

  undo() {
    undoStates.pop();
    state.set(undoStates.pop());
  }

  render() {
    // This is just a demo. In real app you would set first undo elsewhere.
    if (!undoStates.length) undoStates.push(state.get());

    // This is composite component. It load its data from store, and passes them
    // through props, so NewTodo and TodoList can leverage PureComponent.
    const newTodo = getNewTodo();
    const todos = getTodos();

    return (
      <DocumentTitle title={msg('todos.title')}>
        <section className="todos">
          <NewTodo todo={newTodo} />
          <TodoList todos={todos} />
          <div className="buttons">
            <button
              children={msg('todos.clearAll')}
              disabled={!todos.size}
              onClick={clearAll}
            />
            <button
              children={msg('todos.add100')}
              onClick={addHundredTodos}
            />
            <button
              disabled={undoStates.length === 1}
              onClick={() => this.undo()}
            ><FormattedMessage
              message={msg('todos.undo')}
              steps={undoStates.length - 1}
            /></button>
          </div>
        </section>
      </DocumentTitle>
    );
  }

}
