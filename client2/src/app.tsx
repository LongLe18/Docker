import React from 'react';

import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { RouterLinks } from './const';

import { BookPage } from './pages';

import './app.scss';
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <div className='MainApp'>
            <div className='MainContent'>
              <div className='ContentPage'>
                <Switch>
                  <Route component={BookPage} path={RouterLinks.BOOK_PAGE} />
                  <Redirect to={RouterLinks.BOOK_PAGE} />
                </Switch>
              </div>
            </div>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
