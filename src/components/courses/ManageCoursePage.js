import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from '../../redux/actions/authorsActions';
import PropTypes from "prop-types";
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({ authors, courses, loadCourses, loadAuthors, saveCourse, history, ...props }) {

  const [ course, setCourse ] = useState({...props.course});
  const [ errors, setErrors ] = useState({});
  const [ saving, setSaving ] = useState(false);

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
    setSaving(true);
    setCourse( prevCourse => ({
      ...prevCourse, 
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }))
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.authorId = 'Author is required.';
    if (!category) errors.category = 'Category is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


  function handleSave(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    saveCourse(course).then( () => {
      toast.success('Course saved successfully.');
      history.push('/courses');
    }).catch(error => {
      setSaving(false);
      setErrors({ onSave: error.message });
    });
  }

  return (
    authors.length === 0 || courses.length === 0
    ? (<Spinner />)
    : (<CourseForm saving={saving} course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} />)
  ) 
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
