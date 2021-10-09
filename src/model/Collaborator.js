import { v4 as uuidv4 } from 'uuid';
import User from './User';

class Collaborator extends User {
  constructor({
    uuid = uuidv4(), name, email, password,
  }) {
    super({
      uuid,
      name,
      email,
      password,
      collaborator: true,
    });
  }
}

export default Collaborator;
