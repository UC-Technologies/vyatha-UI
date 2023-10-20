
import React from 'react';
import styles from './SortByButton.module.scss';

const SortByButton = ({ sortBy, handleSort }) => {
  return (
    <div className={styles.dropdownContainer}>
      <select
        value={sortBy}
        onChange={handleSort}
        className={styles.sortSelect}
      > 
        <option value="date">Sort by Date</option>
        <option value="time">Sort by Time</option>
        <option value="name">Sort by Name</option>
      </select>
    </div>
  );
};

export default SortByButton;
