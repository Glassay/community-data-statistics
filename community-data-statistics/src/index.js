import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/weather').default);
app.model(require('./models/users').default);
app.model(require('./models/population').default);
app.model(require('./models/industrial').default);
app.model(require('./models/enterprise').default);
app.model(require('./models/community').default);
app.model(require('./models/building').default);
app.model(require('./models/inform').default);
app.model(require('./models/age').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
