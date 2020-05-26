import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (<div className="jumbotron">
    <h1>The Home Page</h1>
    <p>some more text about page can go here.</p>
    <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
  </div>);
}

export default HomePage;