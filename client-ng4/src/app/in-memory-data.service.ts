import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const emojis = [
      { id: 1,  name: 'happy', describe:'기쁨', src:'src/images/emoji/1.gif'},
      { id: 2, name: '', describe:'환상적', src:'src/images/emoji/2.gif'},
      { id: 3, name: 'angry', describe:'화남', src:'src/images/emoji/3.gif'},
      { id: 4, name: 'relaxed', describe:'졸림', src:'src/images/emoji/4.gif'},
      { id: 5, name: 'sad', describe:'슬픔', src:'src/images/emoji/5.gif'},
      { id: 6, name: '', describe:'우울함', src:'src/images/emoji/6.gif'},
      { id: 7, name: '', describe:'놀람', src:'src/images/emoji/7.gif'},
      { id: 8, name: '', describe:'무서움', src:'src/images/emoji/8.gif'},
      { id: 9, name: '', describe:'편안함', src:'src/images/emoji/9.gif'}
    ];
    return {emojis};
  }
}
