import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ViewRevenue.css";

function ViewRevenue() {
  const [data, setData] = useState({
    total: 0,
    byUser: [],
    byBus: [],
    topCustomers: [],
    refunds: 0,
    graph: [],
  });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const res = await API.get("/admin/revenue", {
        params: { fromDate, toDate },
      });

      // ✅ SAFETY PROTECTION
      setData({
        total: res.data.total || 0,
        byUser: res.data.byUser || [],
        byBus: res.data.byBus || [],
        topCustomers: res.data.topCustomers || [],
        refunds: res.data.refunds || 0,
        graph: res.data.graph || [],
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="revenue-page">
      <h2>Total Revenue</h2>

      {/* FILTER */}
      <div className="filters">
        <input type="date" onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" onChange={(e) => setToDate(e.target.value)} />
        <button onClick={fetchRevenue}>Apply</button>
      </div>

      {/* TOTAL */}
      <div className="revenue-card">
        <h3>Overall Collection</h3>
        <div className="revenue-amount">₹{data.total}</div>
      </div>

      {/* GRAPH */}
      <h3>Revenue Trend</h3>
      <div className="chart">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.graph || []}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* USER WISE */}
      <h3>Revenue by Users</h3>
      <div className="table">
        {(data.byUser || []).length === 0 && (
          <div className="empty">No data available</div>
        )}

        {(data.byUser || []).map((u, i) => (
          <div key={i} className="row">
            <span>{u.userName}</span>
            <span>₹{u.amount}</span>
          </div>
        ))}
      </div>

      {/* BUS WISE */}
      <h3>Bus-wise Income</h3>
      <div className="table">
        {(data.byBus || []).length === 0 && (
          <div className="empty">No data available</div>
        )}

        {(data.byBus || []).map((b, i) => (
          <div key={i} className="row">
            <span>{b.busName}</span>
            <span>₹{b.amount}</span>
          </div>
        ))}
      </div>

      {/* TOP */}
      <h3>Top Customers</h3>
      <div className="table">
        {(data.topCustomers || []).length === 0 && (
          <div className="empty">No data available</div>
        )}

        {(data.topCustomers || []).map((u, i) => (
          <div key={i} className="row">
            <span>{u.userName}</span>
            <span>₹{u.amount}</span>
          </div>
        ))}
      </div>

      {/* REFUND */}
      <h3>Refund Report</h3>
      <div className="refund">₹{data.refunds}</div>
    </div>
  );
}

export default ViewRevenue;
