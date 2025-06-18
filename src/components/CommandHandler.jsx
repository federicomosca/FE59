// CommandHandler.js
import api from '../services/api';
import UserForm from './forms/UserForm';
import UserLoginForm from './forms/UserLoginForm';
import MovieForm from './forms/MovieForm';

class CommandHandler {
  static async execute(command, addOutput, currentEntity, setCurrentEntity) {
    const parts = command.split(' ');
    
    // Check if setting new entity context
    if (parts.length === 1 && ['user', 'movie'].includes(parts[0])) {
      setCurrentEntity(parts[0]);
      addOutput(`Switched to ${parts[0]} context. Available actions: ${this.getActionsFor(parts[0])}`);
      return;
    }
    
    // If we have context, prepend it to command
    const fullCommand = currentEntity && !['help', 'exit'].includes(parts[0]) 
      ? `${currentEntity} ${command}` 
      : command;
      
    // Handle exit context
    if (command === 'exit' && currentEntity) {
      setCurrentEntity(null);
      addOutput('Exited context');
      return;
    }
    
    // Parse the full command
    const [entity, action, ...args] = fullCommand.split(' ');

    try {
      switch(entity) {
        case 'user':
          await this.handleUserActions(action, addOutput);
          break;
        case 'movie':
          await this.handleMovieActions(action, addOutput);
          break;
        case 'help':
          this.showHelp(addOutput);
          break;
        default:
          addOutput('Available entities: user, movie. Type "help" for more.');
      }
    } catch (error) {
      addOutput(`Error: ${error.message}`);
    }
  }

  static getActionsFor(entity) {
    switch(entity) {
      case 'user': return 'signup, login, list';
      case 'movie': return 'create, list';
      default: return '';
    }
  }

  static async handleUserActions(action, addOutput) {
    switch(action) {
      case 'signup':
        addOutput(<UserForm onSubmit={(data) => this.createUser(data, addOutput)} />);
        break;
      case 'login':
        addOutput(<UserLoginForm onSubmit={(data) => this.loginUser(data, addOutput)} />);
        break;
      case 'list':
        const users = await api.getUsers();
        if (users.length === 0) {
          addOutput('No users found');
        } else {
          users.forEach(user => {
            addOutput(`ID: ${user.id} | Username: ${user.username} | Email: ${user.email}`);
          });
        }
        break;
      default:
        addOutput('user [signup|login|list]');
    }
  }

  static async handleMovieActions(action, addOutput) {
    switch(action) {
      case 'create':
        addOutput(<MovieForm onSubmit={(data) => this.createMovie(data, addOutput)} />);
        break;
      case 'list':
        addOutput('Movie list coming soon...');
        break;
      default:
        addOutput('movie [create|list]');
    }
  }

  static async createUser(userData, addOutput) {
    try {
      const result = await api.createUser(userData);
      addOutput(`User created with ID: ${result}`);
    } catch (error) {
      addOutput(`Failed to create user: ${error.message}`);
    }
  }

  static async loginUser(loginData, addOutput) {
    try {
      const result = await api.loginUser(loginData);
      addOutput(result === 'ok' ? 'Login successful' : 'Login failed');
    } catch (error) {
      addOutput(`Login error: ${error.message}`);
    }
  }

  static async createMovie(movieData, addOutput) {
    try {
      const result = await api.createMovie(movieData);
      addOutput(`Movie created with ID: ${result.id}`);
    } catch (error) {
      addOutput(`Failed to create movie: ${error.message}`);
    }
  }

  static showHelp(addOutput) {
    addOutput('Available commands:');
    addOutput('user - enter user context');
    addOutput('movie - enter movie context');
    addOutput('exit - exit current context');
    addOutput('help - show this help');
  }
}

export default CommandHandler;