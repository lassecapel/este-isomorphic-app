// import config from './config';
import messages from '../client/messages';

const initialLocale = 'en';

export default {
  $pendingActions: {},
  auth: {
    form: {
      fields: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  newTodo: {
    title: ''
  },
  todos: [
    {id: 1, title: 'consider ‘stop doing’ app'},
    {id: 2, title: 'relax'}
  ],
  damesMode : Array.from(Array(1).keys()).map(i => {
    return ({
      'src': 'http://hermanschoenen.nl/wp-content/gallery/joshv-diamond-2013-spring-summer/damesmode-met-injeans-online-dames-pak-pugina-j100.jpg',
      'title': 'Hoi',
      'productId': '123'
    });
  }),
  user: {
    authData: null
  },
    search: {
        query: ''
    }
};
