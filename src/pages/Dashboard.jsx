import { useEffect, useState } from "react";
import api from "../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Dashboard() {

  const [stats, setStats] =
    useState(null);

    const [analytics, setAnalytics] =
  useState([]);

  const [loading, setLoading] =
    useState(true);

useEffect(() => {

  fetchStats();

  const interval =
    setInterval(() => {

      fetchStats();

    },10000);

  return () =>
    clearInterval(
      interval
    );

}, []);

const fetchStats =
  async () => {

    console.log(
      "FETCHING DASHBOARD"
    );

    try {

      const [
        statsResponse,
        analyticsResponse
      ] = await Promise.all([

        api.get("/dashboard/stats"),

        api.get("/dashboard/analytics")

      ]);

      setStats(
        statsResponse.data
      );

      console.log(
  "STATS:",
  statsResponse.data
);

console.log(
  "ANALYTICS:",
  analyticsResponse.data
);
      

      setAnalytics(
        analyticsResponse.data
      );

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

      if (
        error.response?.status === 401
      ) {

        console.log("401 ignored");

      }

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="p-8">

        <h1 className="text-2xl">
          Loading Dashboard...
        </h1>

      </div>

    );

  }

  if (!stats) {

  return (

    <div className="p-8">

      <h1 className="text-2xl">
        Loading Dashboard...
      </h1>

    </div>

  );

}

const successRate =
  stats.totalMessages === 0
    ? 0
    : (
        (
          stats.delivered /
          stats.totalMessages
        ) * 100
      ).toFixed(1);

return (

  <div className="p-8">

<div
className="
mb-10
bg-gradient-to-r
from-purple-900/40
to-blue-900/40
border
border-slate-800
rounded-3xl
p-8
"
>

<h1
className="
text-5xl
font-bold
"
>
Welcome Back 👋
</h1>

<p
className="
text-slate-400
mt-3
text-lg
"
>
Monitor campaigns, customers and engagement in real time.
</p>

<div
className="
flex
gap-8
mt-6
"
>

<div>
<p className="text-slate-500">
Customers
</p>

<p className="text-2xl font-bold">
{stats.totalCustomers}
</p>
</div>

<div>
<p className="text-slate-500">
Campaigns
</p>

<p className="text-2xl font-bold">
{stats.totalCampaigns}
</p>
</div>

<div>
<p className="text-slate-500">
Messages
</p>

<p className="text-2xl font-bold">
{stats.totalMessages}
</p>
</div>

</div>

</div>

    {/* TOP KPI */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <div className="bg-slate-900
rounded-3xl
p-6
border
border-slate-800
hover:border-purple-500
hover:-translate-y-1
transition-all
duration-300
shadow-xl">

        <p className="text-slate-400">
          Total Customers
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.totalCustomers}
        </h2>

      </div>

      <div className="bg-slate-900
rounded-3xl
p-6
border
border-slate-800
hover:border-purple-500
hover:-translate-y-1
transition-all
duration-300
shadow-xl">

        <p className="text-slate-400">
          Campaigns
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.totalCampaigns}
        </h2>

      </div>

      <div className="bg-slate-900
rounded-3xl
p-6
border
border-slate-800
hover:border-purple-500
hover:-translate-y-1
transition-all
duration-300
shadow-xl">

        <p className="text-slate-400">
          Messages
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.totalMessages}
        </h2>

      </div>

      <div className="bg-blue-950 rounded-3xl p-6 border border-blue-800">

        <p className="text-blue-300">
          Open Rate
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.openRate}%
        </h2>

      </div>

    </div>

    {/* DELIVERY KPI */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <div className="bg-green-950 rounded-3xl p-6">

        <p className="text-green-300">
          Delivered
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.delivered}
        </h2>

      </div>

      <div className="bg-blue-950 rounded-3xl p-6">

        <p className="text-blue-300">
          Opened
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.opened}
        </h2>

      </div>

      <div className="bg-purple-950 rounded-3xl p-6">

        <p className="text-purple-300">
          Clicked
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.clicked}
        </h2>

      </div>

      <div className="bg-red-950 rounded-3xl p-6">

        <p className="text-red-300">
          Failed
        </p>

        <h2 className="text-5xl font-bold mt-4">
          {stats.failed}
        </h2>

      </div>

    </div>

    {/* GRAPH */}

    <div className="bg-gradient-to-br
from-slate-900
to-slate-950
rounded-3xl
p-8
border
border-slate-800
shadow-xl mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Campaign Performance
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart
          data={analytics}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="delivered"
            stroke="#22c55e"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="opened"
            stroke="#3b82f6"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="clicked"
            stroke="#a855f7"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="failed"
            stroke="#ef4444"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

    {/* INSIGHTS */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-slate-900 rounded-3xl p-6">

        <p className="text-slate-400">
          CTR
        </p>

        <h2 className="text-4xl font-bold mt-4">
          {stats.ctr}%
        </h2>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6">

        <p className="text-slate-400">
          Pending
        </p>

        <h2 className="text-4xl font-bold mt-4">
          {stats.pending}
        </h2>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6">

        <p className="text-slate-400">
          Open Rate
        </p>

        <h2 className="text-4xl font-bold mt-4">
          {stats.openRate}%
        </h2>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6">

        <p className="text-slate-400">
          Success Rate
        </p>

        <h2 className="text-4xl font-bold mt-4">
          {successRate}%
        </h2>

      </div>

    </div>

  </div>

);

}

export default Dashboard;