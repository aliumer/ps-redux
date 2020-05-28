import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about/AboutPage';
import HomePage from './home/HomePage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage'

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/Courses" component={CoursesPage} />
        <Route path="/Course/:slug" component={ManageCoursePage} />
        <Route path="/Course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;