// CommandHandler.js
import api from '../services/api';
import UserForm from './forms/UserForm';
import MovieForm from './forms/MovieForm';

class CommandHandler {
  static async execute(command, addOutput) {
    const parts = command.split(' ');
    const [cmd, action, ...args] = parts;

    try {
      switch(cmd) {
        case 'user':
          await this.handleUser(action, args, addOutput);
          break;
        case 'movie':
          await this.handleMovie(action, args, addOutput);
          break;
        case 'help':
          this.showHelp(addOutput);
          break;
        default:
          addOutput('Unknown command. Type "help" for commands.');
      }
    } catch (error) {
      addOutput(`Error: ${error.message}`);
    }
  }

  static async handleUser(action, args, addOutput) {
    switch(action) {
      case 'list':
        const users = await api.getUsers();
        addOutput(`Found ${users.length} users`);
        break;
      case 'create':
        addOutput(<UserForm onSubmit={(data) => this.createUser(data, addOutput)} />);
        break;
      default:
        addOutput('user [list|create]');
    }
  }

  static async handleMovie(action, args, addOutput) {
    // similar structure
  }

  static showHelp(addOutput) {
    addOutput('Available commands:');
    addOutput('user list - show all users');
    addOutput('user create - create new user');
  }
}

export default CommandHandler;