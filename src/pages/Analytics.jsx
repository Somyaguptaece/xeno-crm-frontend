import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";
import { io } from "socket.io-client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [customers, setCustomers] =
    useState([]);

  const [campaigns, setCampaigns] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [recommendation,setRecommendation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

  const socket =
    io(
      "https://YOUR-BACKEND-URL.onrender.com"
    );

  socket.on(
    "campaign-update",
    () => {

      fetchData();

    }
  );

  return () => {

    socket.disconnect();

  };

}, []);

 const fetchData = async () => {
  try {

    const customerResponse =
      await api.get("/customers");

    const campaignResponse =
      await api.get("/campaigns");

      console.log(
  "CAMPAIGNS DATA:",
  campaignResponse.data
);

    const statsResponse =
      await api.get(
        "/dashboard/stats"
      );

  //     const recommendationResponse =
  // await api.get(
  //   "/dashboard/recommendation"
  // );

    setCustomers(
      customerResponse.data
    );

    setCampaigns(
      campaignResponse.data
    );

    setStats(
      statsResponse.data
    );

//     setRecommendation(
//   recommendationResponse.data
// );

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  if (loading || !stats ) {
    return (
      <div className="p-8">
        Loading Analytics...
      </div>
    );
  }

  const totalCustomers =
    customers.length;

  const totalCampaigns =
    campaigns.length;

  const totalRevenue =
    customers.reduce(
      (sum, customer) =>
        sum + customer.totalSpend,
      0
    );

  const averageSpend =
    totalCustomers === 0
      ? 0
      : (
          totalRevenue /
          totalCustomers
        ).toFixed(0);

  const cityRevenue = {};

  customers.forEach((customer) => {

    if (!cityRevenue[customer.city]) {
      cityRevenue[customer.city] = 0;
    }

    cityRevenue[customer.city] +=
      customer.totalSpend;
  });

  const revenueData =
    Object.keys(cityRevenue).map(
      (city) => ({
        city,
        revenue:
          cityRevenue[city],
      })
    );

  let vip = 0;
  let premium = 0;
  let regular = 0;

  customers.forEach((customer) => {

    if (
      customer.totalSpend >= 10000
    ) {
      vip++;
    } else if (
      customer.totalSpend >= 5000
    ) {
      premium++;
    } else {
      regular++;
    }
  });

  const segmentData = [
    {
      name: "VIP",
      value: vip,
    },
    {
      name: "Premium",
      value: premium,
    },
    {
      name: "Regular",
      value: regular,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#10b981",
    "#64748b",
  ];

  const exportPDF = () => {

  const doc =
    new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "Xeno CRM Analytics Report",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Customers: ${stats.totalCustomers}`,
    20,
    40
  );

  doc.text(
    `Campaigns: ${stats.totalCampaigns}`,
    20,
    50
  );

  doc.text(
    `Delivered: ${stats.delivered}`,
    20,
    60
  );

  doc.text(
    `Opened: ${stats.opened}`,
    20,
    70
  );

  doc.text(
    `Clicked: ${stats.clicked}`,
    20,
    80
  );

  doc.text(
    `Failed: ${stats.failed}`,
    20,
    90
  );

  doc.text(
    `Open Rate: ${stats.openRate}%`,
    20,
    100
  );

  doc.text(
    `CTR: ${stats.ctr}%`,
    20,
    110
  );

  doc.save(
    "CRM_Report.pdf"
  );

};

  const campaignPerformance = [

  {
    name: "Delivered",
    value: stats.delivered,
  },

  {
    name: "Opened",
    value: stats.opened,
  },

  {
    name: "Clicked",
    value: stats.clicked,
  },

  {
    name: "Failed",
    value: stats.failed,
  },

];

  return (
    <div className="p-8">

<div
className="
bg-gradient-to-r
from-purple-900/40
to-blue-900/40
border
border-slate-800
rounded-3xl
p-8
mb-8
flex
justify-between
items-center
"
>

<div>

  

<h1
className="
text-5xl
font-bold
"
>
Analytics Dashboard
</h1>

<p
className="
text-slate-400
mt-3
"
>
Customer insights, campaign performance and revenue intelligence.
</p>

</div>

<button
onClick={exportPDF}
className="
bg-gradient-to-r
from-purple-600
to-pink-600
hover:scale-105
transition
px-6
py-3
rounded-xl
font-semibold
"
>
Export PDF
</button>

</div>

  <div
className="
bg-gradient-to-r
from-purple-900/20
to-blue-900/20
border
border-slate-800
rounded-3xl
p-8
mb-8
"
>

<div className="grid grid-cols-4 gap-8">

<div>
<p className="text-slate-400">
Customers
</p>

<h2 className="text-5xl font-bold mt-2">
{totalCustomers}
</h2>
</div>

<div>
<p className="text-slate-400">
Revenue
</p>

<h2 className="text-5xl font-bold mt-2">
₹{totalRevenue}
</h2>
</div>

<div>
<p className="text-slate-400">
Open Rate
</p>

<h2 className="text-5xl font-bold mt-2 text-cyan-400">
{stats.openRate}%
</h2>
</div>

<div>
<p className="text-slate-400">
CTR
</p>

<h2 className="text-5xl font-bold mt-2 text-purple-400">
{stats.ctr}%
</h2>
</div>

</div>

</div>

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-6
hover:border-purple-500
transition-all
duration-300
shadow-xl">

          <h2 className="text-xl font-bold mb-4">
            Revenue By City
          </h2>

<ResponsiveContainer
  width="100%"
  height={300}
>

  <BarChart
    layout="vertical"
    data={revenueData}
  >

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis type="number" />

    <YAxis
      dataKey="city"
      type="category"
      width={100}
    />

    <Tooltip />

    <Bar
      dataKey="revenue"
      fill="#9333ea"
      radius={[0, 8, 8, 0]}
    />

  </BarChart>

</ResponsiveContainer>

        </div>

        <div className="bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-6
hover:border-purple-500
transition-all
duration-300
shadow-xl">

          <h2 className="text-xl font-bold mb-4">
            Customer Segments
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

 <Pie
  data={segmentData}
  dataKey="value"
  innerRadius={60}
  outerRadius={110}
  paddingAngle={5}
>

                {segmentData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-6
hover:border-purple-500
transition-all
duration-300
shadow-xl">

  {recommendation && (

        <div className="bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-6
hover:border-purple-500
transition-all
duration-300
shadow-xl mb-8">

  

  <h2 className="text-2xl font-bold mb-6">
    🤖 AI Recommendation
  </h2>

  <div className="grid grid-cols-2 gap-6">

    <div>

      <p className="text-slate-400">
        Best Channel
      </p>

      <h3 className="text-xl font-bold mt-2">
        {
          recommendation.bestChannel
        }
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Recommended Audience
      </p>

      <h3 className="text-xl font-bold mt-2">
        {
          recommendation.recommendedAudience
        }
      </h3>

    </div>

    <div>


      <p className="text-slate-400">
        Expected Open Rate
      </p>

      <h3 className="text-xl font-bold mt-2">
        {
          
          recommendation.expectedOpenRate
        }
      </h3>

    </div>

    <div>

      <p className="text-slate-400">
        Reason
      </p>

      <h3 className="text-lg mt-2">
        {
          recommendation.reason
        }
      </h3>

    </div>

  </div>

</div>

      )}

        <div className="bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-6
hover:border-purple-500
transition-all
duration-300
shadow-xl mb-8">

  <h2 className="text-2xl font-bold mb-6">
    Campaign Performance Funnel
  </h2>

<ResponsiveContainer
  width="100%"
  height={350}
>

  <BarChart
    data={campaignPerformance}
  >

    <CartesianGrid
      strokeDasharray="3 3"
    />

    <XAxis
      dataKey="name"
    />

    <YAxis />

    <Tooltip />

    <Bar
      dataKey="value"
      fill="#9333ea"
      radius={[8,8,0,0]}
    />

  </BarChart>

</ResponsiveContainer>

</div>

        <h2 className="text-2xl font-bold mb-6">
          Campaign History
        </h2>

        <div className="overflow-x-auto">
<table className="w-full">

          <thead>
<tr
className="
bg-slate-800
text-slate-300
"
>

  <th className="p-4 text-left">
    Campaign
  </th>

  <th className="p-4 text-left">
    Channel
  </th>

  <th className="p-4 text-left">
    Delivered
  </th>

  <th className="p-4 text-left">
    Opened
  </th>

  <th className="p-4 text-left">
    Clicked
  </th>

  <th className="p-4 text-left">
    Failed
  </th>

  <th className="p-4 text-left">
    Open Rate
  </th>

  <th className="p-4 text-left">
    CTR
  </th>

</tr>

          </thead>

          <tbody>

            {campaigns.map(
              (campaign) => (

                <tr
                  key={campaign.id}
                  className="
                    border-b
                    border-slate-800
                  "
                >

<td className="p-4 font-semibold">
{campaign.name}
</td>

<td className="p-4">

<span
className="
bg-purple-500/20
text-purple-400
px-3
py-1
rounded-full
text-xs
"
>
{campaign.channel}
</span>

</td>

<td className="p-4">
  {campaign.delivered}
</td>

<td className="p-4">
  {campaign.opened}
</td>

<td className="p-4">
  {campaign.clicked}
</td>

<td className="p-4">
  {campaign.failed}
</td>

<td
className="
p-4
text-cyan-400
font-semibold
"
>
{campaign.openRate}%
</td>

<td
className="
p-4
text-purple-400
font-semibold
"
>
{campaign.ctr}%
</td>

                </tr>

              )
            )}

          </tbody>

        </table>
</div>
      </div>

    </div>
  );
}

export default Analytics;