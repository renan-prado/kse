import { v4 as uuidv4 } from 'uuid';
import fb from '@/database/Firebase';

class Campaign {
  constructor({
    name, url,
  }) {
    this.uuid = uuidv4();
    this.name = name;
    this.url = url;
    this.database = fb.database();
  }

  create() {
    this.database
      .ref(`campaign/${this.uuid}`)
      .set({
        uuid: this.uuid,
        nome: this.name,
        url: this.url,
      });
  }
}

export default Campaign;
