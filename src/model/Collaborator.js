import User from './User';

class Collaborator extends User {
  constructor({
    uuid, name, email, password,
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
