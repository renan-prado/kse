import fb from '@/database/Firebase';

class User {
  constructor({
    uuid, name, email, password, collaborator = false,
  }) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.collaborator = collaborator;
    this.auth = fb.auth();
    this.database = fb.database();
  }

  create() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((response) => this.fetchUser(response))
      .catch((err) => console.warn(err));
  }

  fetchUser({ user }) {
    this.uuid = user.uid;
    this.save();
  }

  save() {
    this.database
      .ref(`users/${this.uuid}`)
      .set({
        nome: this.name,
        uuid: this.uuid,
        email: this.email,
        collaborator: this.collaborator,
      });
  }
}

export default User;
