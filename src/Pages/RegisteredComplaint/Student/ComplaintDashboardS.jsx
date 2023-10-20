import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ComplaintDashboardS.module.scss';
import Data from './ComplaintRegister.json';
// import ComplaintCardS from '../../../Components/RegisteredComplaint/Student/ComplaintCardS';
import SortByButton from '../../../Components/RegisteredComplaint/Student/SortByButton';

const ComplaintDashboardS = () => {
  const [jsonData, setJsonData] = useState(Data);
  const [sortBy, setSortBy] = useState('date');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const sortData = (e) => {
    setSortBy(e.target.value);
    const sortedData = [...jsonData];
    switch (e.target.value) {
      case 'date':
        sortedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        break;
      case 'time':
        sortedData.sort((a, b) => new Date(b.Time) - new Date(a.Time));
        break;
      case 'name':
        sortedData.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      default:
        break;
    }
    setJsonData(sortedData);
  };

  const filterComplaints = (data, search) => {
    setIsSearching(search.trim() !== ''); 
      return data.filter((item) => {
      const searchLowerCase = search.toLowerCase();
      const title = item.title.toLowerCase();
      const description = item.Description.toLowerCase();
      const name = item.Name.toLowerCase();
      const scholarID = item.ScholarID.toLowerCase();
      const roomNo = item.RoomNo.toLowerCase();
      const phoneNo = item.PhoneNo.toLowerCase();
      const date = item.Date.toLowerCase();
      const time = item.Time.toLowerCase(); 

      return (
        title.includes(searchLowerCase) ||
        description.includes(searchLowerCase) ||
        name.includes(searchLowerCase) ||
        scholarID.includes(searchLowerCase) ||
        roomNo.includes(searchLowerCase) ||
        phoneNo.includes(searchLowerCase) ||
        date.includes(searchLowerCase) ||
        time.includes(searchLowerCase)    
      );
    });
  };
  
  

  useEffect(() => {
    const filteredData = filterComplaints(Data, searchInput);
    setJsonData(filteredData);
  }, [searchInput]);

  return (
    <div className={styles.container}>
      <div className={styles.SearchBar}>
        <input
          type="text"
          placeholder="Search Complaint"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SortByButton sortBy={sortBy} handleSort={sortData} />
      </div>
      <div className={styles.ComplaintCard}>
        <div className={styles.ComplaintCardInner}>
            {jsonData.map((complaint) => (
                // <ComplaintCardS key={item.key} complaint={item} />
                <div className={styles.CardContainer}>
                    <div className={styles.Heading}>
                        <div>
                            <Link to={complaint.key}>
                                <h2>{complaint.title}</h2>
                            </Link>
                        </div>
                        <img src={complaint.StatusImg} alt="icon"></img>
                        {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
                    </div>
                    <div className={styles.DateAndTime}>
                        {complaint.Date}, {complaint.Time}
                    </div>
                    <div className={styles.Description}>
                        <p>{complaint.Description}</p>
                        <button>Close</button>
                    </div>
                    <div className={styles.SelectBar}>
                        <div className={styles.Registered}>Registered</div>
                        <div className={styles.Supervisor}>Supervisor</div>
                        <div className={styles.Warden}>Warden</div>
                        <div className={styles.Dean}>Dean</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDashboardS;
