import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ComplaintDashboardS.module.scss";
import Data from "../../../../Data/ComplaintRegister.json";
// import ComplaintCardS from '../../../Components/RegisteredComplaint/Student/ComplaintCardS';
import SortByButton from "../../../../Components/RegisteredComplaint/Student/SortByButton";

const AllComplaintStudent = () => {
  useEffect(() => {
    document.title = "All Complaints | Vyatha";
  }, []);

  const { role } = useParams();
  // console.log(role)
  const [jsonData, setJsonData] = useState(Data);
  const [sortBy, setSortBy] = useState("date");
  const [searchInput, setSearchInput] = useState("");

  const imgBack =
    "https://res.cloudinary.com/dy55sllug/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1703085199/chevron_left_s4usnm.jpg?_s=public-apps";

  const sortData = (e) => {
    setSortBy(e.target.value);
    const sortedData = [...jsonData];
    switch (e.target.value) {
      case "date":
        sortedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        break;
      case "time":
        sortedData.sort((a, b) => new Date(b.Time) - new Date(a.Time));
        break;
      case "name":
        sortedData.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      default:
        break;
    }
    setJsonData(sortedData);
  };

  const filterComplaints = (data, search) => {
    return data.filter((item) => {
      // Searching keyword
      const searchLowerCase = search.toLowerCase();

      const title = item.title.toLowerCase();
      const description = item.Description.toLowerCase();
      const date = item.Date.toLowerCase();
      const time = item.Time.toLowerCase();

      return (
        title.includes(searchLowerCase) ||
        description.includes(searchLowerCase) ||
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
        <Link to="/">
          <img src={imgBack} alt="Back" />
        </Link>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Search Complaint"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <SortByButton sortBy={sortBy} handleSort={sortData} />
      </div>
      <div className={styles.ComplaintCard}>
        <div className={styles.ComplaintCardInner}>
          {jsonData.map((complaint) => (
            // <ComplaintCardS key={item.key} complaint={item} />
            <div className={styles.CardContainer} key={complaint.key}>
              <div className={styles.Heading}>
                <div className={styles.compliantTitle}>
                  <Link to={`/${role}/complaint/${complaint.key}`}>
                    <h2>{complaint.title}</h2>
                  </Link>
                </div>
                <div className={styles.StatusImg}>
                  <img src={complaint.StatusImg} alt="icon" />
                </div>

                {/* link for the complaint status has to be fetched from the json file corresponding to the complaint status */}
              </div>
              <div className={styles.DateAndTime}>
                {complaint.Date}, {complaint.Time}
              </div>
              <div className={styles.Description}>
                <p>{complaint.Description}</p>
                <button className={styles.closebtn}>Close</button>
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

export default AllComplaintStudent;
