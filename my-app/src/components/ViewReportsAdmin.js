import React, { useState } from "react";
import '../css/view-reports-admin.css';
import ClubpostedGraph from '../assets/images/contentspostgraph.jpg'
import ClubDetails from '../assets/images/clubdetails.jpg'

const ViewReportsAdmin = () => {
  // google.charts.load('current', { 'packages': ['corechart'] });
  // google.charts.load('current', { 'packages': ['bar'] });


  let buildings = [
    { name: 'B1', occupied: 13, unOccupied: 7, Total: 20 },
    { name: 'B2', occupied: 19, unOccupied: 1, Total: 20 },
    { name: 'B3', occupied: 10, unOccupied: 10, Total: 20 },
    { name: 'B4', occupied: 6, unOccupied: 14, Total: 20 },
    { name: 'B5', occupied: 15, unOccupied: 5, Total: 20 },
    { name: 'B6', occupied: 12, unOccupied: 8, Total: 20 },
    { name: 'B7', occupied: 10, unOccupied: 10, Total: 20 },
    { name: 'B8', occupied: 3, unOccupied: 17, Total: 20 },
  ];
  const [showChart, setShowChart] = useState('');
  let ctmData = [[
    'Building',
    'Total',
    'Occupied',
    'Unoccupied',
  ]];
  buildings.forEach(x => ctmData.push([x.name, x.Total, x.occupied, x.unOccupied]));
  let visitsList = [
    { buildingName: 'B1', visitorsCount: 20 },
    { buildingName: 'B2', visitorsCount: 15 },
    { buildingName: 'B3', visitorsCount: 12 },
    { buildingName: 'B4', visitorsCount: 1 },
    { buildingName: 'B5', visitorsCount: 30 },
    { buildingName: 'B6', visitorsCount: 50 },
    { buildingName: 'B7', visitorsCount: 21 },
    { buildingName: 'B8', visitorsCount: 5 },
  ]

  let ctmVisitorData = [
    ['Buildings', 'Visitor Count']
  ];
  visitsList.forEach(x => ctmVisitorData.push([x.buildingName, x.visitorsCount]))
  function changeChart(e) {
    let option = e.target.value;
    setShowChart(option);
  }
  return (
    <>
      
      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      <div className="main-div">
        <div className="main-title">View Reports</div>
        <div className="vra-content">
          <div className="vra-filters">
            <div>
              <select
                name="filter1"
                id="filter1"
                title="select an option"
                required
                value={showChart}
                onChange={changeChart}
              >
                <option disabled value=''>-- Choose an option --</option>
                <option value="building">Content Posted</option>
                <option value="visits">Club Membership details</option>
              </select>
            </div>
          </div>
          <div className="empty" id="empty" style={showChart === '' ? { display: "flex" } : { display: "none" }}>
            <div>Please select an option to view the reports</div>
          </div>
          <div>
            <div id="building-reports" style={showChart === 'building' ? { display: "block" } : { display: "none" }}>
            <div>
                <img
                  src={ClubpostedGraph}
                  width={500}
                  
                  alt="Manage buildings"
                />
              </div>
            </div>
            <div id="visit-reports" style={showChart === 'visits' ? { display: "block" } : { display: "none" }}>
            <div>
                <img
                  src={ClubDetails}
                  width={500}
                  
                  alt="Manage buildings"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ViewReportsAdmin;