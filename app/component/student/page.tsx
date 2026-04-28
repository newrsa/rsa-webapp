
import React from 'react';
import styles from './student.module.css';

const page = () => {
  return (
    <div className={styles['student-container']}>
      <div className={styles['student-card']}>
        <div className={styles['student-badge']}>Student Portal</div>
        <h1>Welcome back, Student</h1>
        <p className={styles['student-subtitle']}>
          Track progress, upcoming tasks, and class performance in one place.
        </p>

        <div className={styles['student-grid']}>
          <div className={styles['student-grid-item']}>
            <span>Attendance</span>
            <strong>94%</strong>
          </div>
          <div className={styles['student-grid-item']}>
            <span>Assignments</span>
            <strong>7/8 done</strong>
          </div>
          <div className={styles['student-grid-item']}>
            <span>Next Class</span>
            <strong>Math • 10:30 AM</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;