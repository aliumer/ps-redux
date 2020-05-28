import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from '../../redux/actions/authorsActions';
import PropTypes from "prop-types";
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

function ManageCoursePage({ authors, courses, loadCourses, loadAuthors, saveCourse, history, ...props }) {

  const [ course, setCourse ] = useState({...props.course});
  const [ errors, setErrors ] = useState({});

  useEffect(()=>{
    if(courses.length === 0 ) {
      loadCourses().catch(error => {
        console.log('load courses failed:', error);
      })
    } else {
      setCourse({ ...props.course })
    }
  
    if(authors.length === 0) {
      loadAuthors().catch(error => {
        console.log('Load authors failed:', error);
      })
    }

  }, [props.course]) // cause of this array it will only run once, when the component mount

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse( prevCourse => ({
      ...prevCourse, 
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }))
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then( () => {
      history.push('/courses');
    });
  }

  return <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} />
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired // any component loaded via route gets history passed in on props from react router.
};

export function getCourseBySlug(courses, slug) {
  return courses.find( c => c.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = state.courses.length > 0 && slug ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
}

// this function connects our component to redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
