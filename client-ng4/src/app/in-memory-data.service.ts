import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const emojis = [
      { id: 1,  name: 'happy', describe:'기쁨', src:'src/images/emoji/1.gif', cover_color: '#4FB77C'},
      { id: 2, name: 'lovely', describe:'사랑스러움', src:'src/images/emoji/2.gif'},
      { id: 3, name: 'angry', describe:'화남', src:'src/images/emoji/3.gif', cover_color: '#FF5252'},
      { id: 4, name: 'relaxed', describe:'졸림', src:'src/images/emoji/4.gif', cover_color: '#C7C7C7'},
      { id: 5, name: 'sad', describe:'슬픔', src:'src/images/emoji/5.gif', cover_color: '#324D9A'},
      { id: 6, name: 'sick', describe:'아픔', src:'src/images/emoji/6.gif', cover_color: '#4AACD7'},
      { id: 7, name: 'amazing', describe:'환상적임', src:'src/images/emoji/7.gif', cover_color: '#FDAA4C'},
      { id: 8, name: 'disgusting', describe:'역겨움', src:'src/images/emoji/8.gif', cover_color: '#4C3B21'},
      { id: 9, name: '', describe:'편안함', src:'src/images/emoji/9.gif'}
    ];
    return {emojis};
  }
}
