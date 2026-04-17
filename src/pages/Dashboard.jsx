import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="vm-container">
      {/* SIDEBAR */}
      <aside className="vm-sidebar">
        <div className="vm-title">Vendor Management Admin</div>
        <ul className="vm-menu">
          <li className="active">Dashboard</li>
          <li>All Vendors</li>
          <li>Payments</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="vm-main">
        <div className="vm-top-buttons">
          <button className="btn refresh">Refresh Data</button>
          <button className="btn export">Export Data</button>
          <button className="btn logout">Logout</button>
        </div>

        <h1 className="vm-header">Vendor Management Dashboard</h1>

        {/* CARDS */}
        <div className="vm-cards">
          <div className="vm-card">
            <p>Total Vendors</p>
            <h3>0</h3>
          </div>
          <div className="vm-card">
            <p>Fully Paid</p>
            <h3>0</h3>
          </div>
          <div className="vm-card">
            <p>Pending Payments</p>
            <h3>0</h3>
          </div>
          <div className="vm-card">
            <p>Total Arrears</p>
            <h3>₦0</h3>
          </div>
        </div>

        {/* FILTERS */}
        <div className="vm-filters">
          <input type="text" placeholder="Search vendors..." />
          <select><option>All Status</option></select>
          <select><option>All Zones</option></select>
          <select><option>All Business Types</option></select>
        </div>

        {/* TABLE */}
        <table className="vm-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Business Type</th>
              <th>Zone</th>
              <th>Phone</th>
              <th>Amount Due</th>
              <th>Amount Paid</th>
              <th>Arrears</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="9" className="vm-nodata">
                No vendor registrations found
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
