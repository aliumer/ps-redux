import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from '../../redux/actions/authorsActions';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from './CourseList';

class CoursesPage extends React.Component {

  state = {
    redirectToAddCoursePage: false
  }

  componentDidMount() {
    const { authors, courses, actions } = this.props;

    if(courses.length === 0 ) {
      actions.loadCourses().then(courses => {
        this.setState({courses});
      }).catch(error => {
        console.log('load courses failed:', error);
      })
    }

    if(authors.length === 0) {
      actions.loadAuthors().then(authors => {
        this.setState({authors});
      }).catch(error => {
        console.log('Load authors failed:', error);
      })
    }

  }

  render() {
    return (
      <>
        { this.state.redirectToAddCoursePage && <Redirect to='/course' /> }
        <h2>Courses</h2>
        <button 
        style={{ marginBottom: 20}}
        className='btn btn-primary add-course'
        onClick={() => { this.setState({ redirectToAddCoursePage: true })}}>
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0 ? [] : state.courses.map(course => {
      return {
        ...course, 
        authorName: state.authors.find(a =>  a.id===course.authorId).name
      }
    }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorsActions.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
