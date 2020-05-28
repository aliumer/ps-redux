import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorsActions from '../../redux/actions/authorsActions';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from "react-toastify";

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

  handleDeleteCourse = async course => {
    try {
      toast.success('Course deleted successfully.');
      await this.props.actions.deleteCourse(course);
    } catch(error) {
      toast.error('Delete failed, ' + error.message, { autoClose: false });
    }
  }

  render() {
    return (
      <>
        { this.state.redirectToAddCoursePage && <Redirect to='/course' /> }
        <h2>Courses</h2>
        {
          this.props.loading 
          ? <Spinner />
          : (
            <>
              <button 
              style={{ marginBottom: 20}}
              className='btn btn-primary add-course'
              onClick={() => { this.setState({ redirectToAddCoursePage: true })}}>
                Add Course
              </button>
              <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
            </>
          )
        }
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0 ? [] : state.courses.map(course => {
      return {
        ...course, 
        authorName: state.authors.find(a =>  a.id===course.authorId).name
      }
    }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorsActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
