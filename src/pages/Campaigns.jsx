import { useEffect, useState , useRef ,} from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Campaigns() {

  const [campaigns, setCampaigns] =
    useState([]);

  const [name, setName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [channel, setChannel] =
   useState("EMAIL");

  const [loading, setLoading] =
    useState(true);

  const [logs, setLogs] =
    useState([]);

  const [scheduledAt,setScheduledAt] = useState("");

  const [selectedCampaign,
    setSelectedCampaign] =
    useState(null);

    const [campaignStats,
  setCampaignStats] =
  useState(null);

const [showStats,
  setShowStats] =
  useState(false);

  const logsRef =
    useRef(null);

    

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns =
    async () => {

      try {

        const response =
          await api.get(
            "/campaigns"
          );

        setCampaigns(
          response.data
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }

    };

  const createCampaign =
    async () => {

      try {

await api.post(
  "/campaigns",
  {
    name,
    message,
    channel,

    scheduledAt:
      scheduledAt || null,
  }
);

        toast.success(
          "Campaign Created"
        );

        setName("");
        setMessage("");
        setChannel("EMAIL");
        setScheduledAt("");
        fetchCampaigns();

      } catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed To Create Campaign"
        );

      }

    };


  const sendCampaign =
    async (campaignId) => {

      try {

        await api.post(
          `/campaigns/${campaignId}/send`,
          {}
        );

        toast.success(
          "Campaign Sent Successfully"
        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed To Send Campaign"
        );

      }

    };

    const deleteCampaign =
  async (campaignId) => {

    try {

      await api.delete(
        `/campaigns/${campaignId}`
      );

      toast.success(
        "Campaign Deleted"
      );

      fetchCampaigns();

    } catch (error) {

      toast.error(
        "Delete Failed"
      );

    }

};

const viewStats =
  async (campaignId) => {

    try {

      const response =
        await api.get(
          `/campaigns/${campaignId}/stats`
        );

      setCampaignStats(
        response.data
      );

      setShowStats(true);

    } catch (error) {

      console.error(error);

    }

};

const viewLogs =
  async (campaignId) => {

    try {

      const response =
        await api.get(
          `/campaigns/${campaignId}/logs`
        );

      setLogs(
        response.data
      );

      setSelectedCampaign(
        campaignId
      );

      setTimeout(() => {

        logsRef.current
          ?.scrollIntoView({

            behavior:
              "smooth",

            block:
              "start",

          });

      }, 100);

    } catch (error) {

      console.error(
        error
      );

    }

};

  return (

    <div className="p-8">

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Campaigns
      </h1>

<div
className="
bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-8
mb-10
shadow-xl
"
>

<div className="mb-8">

<h2
className="
text-3xl
font-bold
"
>
Create Campaign
</h2>

<p
className="
text-slate-400
mt-2
"
>
Create and schedule customer engagement campaigns.
</p>

</div>

        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
className="
w-full
bg-slate-800/70
border
border-slate-700
focus:border-purple-500
outline-none
p-4
rounded-xl
mb-4
"
        />

<textarea
  placeholder="Campaign Message"
  value={message}
  onChange={(e) =>
    setMessage(
      e.target.value
    )
  }
className="
  w-full
  bg-slate-800/70
  border
  border-slate-700
  focus:border-purple-500
  outline-none
  p-4
  rounded-xl
  mb-4
  h-32
"
/>

<div className="mb-4">

  <label
    className="
      block
      mb-2
      text-slate-300
    "
  >
    Channel
  </label>

  <select
    value={channel}
    onChange={(e) =>
      setChannel(
        e.target.value
      )
    }
className="
w-full
bg-slate-800/70
border
border-slate-700
focus:border-purple-500
outline-none
p-4
rounded-xl
"
  >

    <option value="EMAIL">
      EMAIL
    </option>

    <option value="SMS">
      SMS
    </option>

    <option value="WHATSAPP">
      WHATSAPP
    </option>

  </select>

</div>

<div className="mb-4">

  <label
    className="
      block
      mb-2
      text-slate-300
    "
  >
    Schedule Time
  </label>

  <input
    type="datetime-local"
    value={scheduledAt}
    onChange={(e) =>
      setScheduledAt(
        e.target.value
      )
    }
    className="
w-full
bg-slate-800/70
border
border-slate-700
focus:border-purple-500
outline-none
p-4
rounded-xl
"
  />

</div>  

<button
  onClick={
    createCampaign
  }
className="
bg-gradient-to-r
from-purple-600
to-pink-600
hover:scale-105
transition
duration-300
px-8
py-3
rounded-xl
font-semibold
shadow-lg
"
>
  Create Campaign
</button>

      </div>

<div className="flex justify-between items-center mb-6">

<h2
className="
text-3xl
font-bold
"
>
Existing Campaigns
</h2>

<span
className="
bg-purple-500/20
text-purple-400
px-4
py-2
rounded-full
text-sm
"
>
{campaigns.length} Campaigns
</span>

</div>

      {loading ? (

        <p>
          Loading Campaigns...
        </p>

      ) : (

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
"
>

          {campaigns.map(
            (campaign) => (

<div
key={campaign.id}
className="
bg-slate-900/80
backdrop-blur-md
border
border-slate-800
rounded-2xl
p-6
hover:border-purple-500
hover:shadow-purple-500/20
hover:shadow-2xl
transition-all
duration-300
"
>

<div className="flex justify-between items-start">

  <div>

    <h3 className="text-xl font-semibold">
      {campaign.name}
    </h3>

    <p className="text-slate-500 text-sm mt-1">
      ID #{campaign.id}
•
{campaign.channel}
    </p>

  </div>

  <span
    className={`
      px-4
      py-2
      rounded-full
      text-xs
      font-bold

      ${
        campaign.status === "SENT"
          ? "bg-green-500/20 text-green-400"
          : campaign.status === "SCHEDULED"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-blue-500/20 text-blue-400"
      }
    `}
  >
    {campaign.status}
  </span>

</div>

<p
className="
text-slate-400
mt-4
leading-6
line-clamp-2
"
>
{campaign.message}
</p>

<div
  className="
    flex
    justify-between
    mt-5
  "
>

  <div>

    <p className="text-slate-500">
      Channel
    </p>

    <p className="text-purple-400 mt-1">
      {campaign.channel}
    </p>

  </div>

  <div>

    <p className="text-slate-500">
      Schedule
    </p>

    <p className="text-cyan-400 mt-1">
      {
        campaign.scheduledAt
          ? new Date(
              campaign.scheduledAt
            ).toLocaleString()
          : "Instant"
      }
    </p>

  </div>

</div>

<div
  className="
    flex
    items-center
    gap-4
    mt-8
    flex-wrap
  "
>

{campaign.status === "DRAFT" && (

  <button
    onClick={() =>
      sendCampaign(campaign.id)
    }
    className="
      bg-emerald-600
      hover:bg-emerald-700
      px-4
      py-2
      rounded-lg
      shadow-lg
      transition-all
      duration-300
      hover:scale-105
    "
  >
    Send Campaign
  </button>

)}

{campaign.status === "SCHEDULED" && (

  <span
    className="
      bg-yellow-600
      px-4
      py-2
      rounded-lg
      text-white
    "
  >
    Scheduled
  </span>

)}

{campaign.status === "SENT" && (

  <span
    className="
      bg-green-600
      px-4
      py-2
      rounded-lg
      text-white
    "
  >
    Sent
  </span>

)}

<button
  onClick={() =>
    viewStats(campaign.id)
  }
  className="
    bg-blue-600
    hover:bg-blue-700
    px-4
    py-2
    rounded-lg
    shadow-lg
    transition-all
    duration-300
    hover:scale-105
  "
>
  View Stats
</button>

<button
  onClick={() =>
    viewLogs(campaign.id)
  }
  className="
    bg-purple-600
    hover:bg-purple-700
    px-4
    py-2
    rounded-lg
    shadow-lg
    transition-all
    duration-300
    hover:scale-105
  "
>
  View Logs
</button>

<button
  onClick={() =>
    deleteCampaign(campaign.id)
  }
  className="
    bg-red-600
    hover:bg-red-700
    px-4
    py-2
    rounded-lg
    shadow-lg
    transition-all
    duration-300
    hover:scale-105
  "
>
  Delete
</button>

</div>
</div>

          ))}

        </div>

      )}

      {showStats && campaignStats && (

<div
className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
z-50
"
>

<div
className="
bg-slate-900
w-[700px]
rounded-2xl
p-8
border
border-slate-700
"
>

<div
className="
flex
justify-between
items-center
mb-8
"
>

<h2
className="
text-3xl
font-bold
"
>
Campaign Analytics
</h2>

<button
onClick={() =>
setShowStats(false)
}
className="
text-red-400
text-xl
"
>
✕
</button>

</div>

<div
className="
grid
grid-cols-3
gap-5
"
>

<div className="bg-slate-800 p-4 rounded-xl">
<p className="text-slate-400">
Audience
</p>
<h3 className="text-3xl font-bold mt-2">
{campaignStats.totalAudience}
</h3>
</div>

<div className="bg-green-900 p-4 rounded-xl">
<p>Delivered</p>
<h3 className="text-3xl font-bold mt-2">
{campaignStats.delivered}
</h3>
</div>

<div className="bg-blue-900 p-4 rounded-xl">
<p>Opened</p>
<h3 className="text-3xl font-bold mt-2">
{campaignStats.opened}
</h3>
</div>

<div className="bg-purple-900 p-4 rounded-xl">
<p>Clicked</p>
<h3 className="text-3xl font-bold mt-2">
{campaignStats.clicked}
</h3>
</div>

<div className="bg-red-900 p-4 rounded-xl">
<p>Failed</p>
<h3 className="text-3xl font-bold mt-2">
{campaignStats.failed}
</h3>
</div>

<div className="bg-cyan-900 p-4 rounded-xl">
<p>Pending</p>
<h3 className="text-3xl font-bold mt-2">
{campaignStats.pending}
</h3>
</div>

</div>

<div
className="
grid
grid-cols-2
gap-5
mt-6
"
>

<div className="bg-slate-800 p-5 rounded-xl">
<p className="text-slate-400">
Open Rate
</p>

<h3 className="text-4xl font-bold mt-2">
{campaignStats.openRate}
</h3>
</div>

<div className="bg-slate-800 p-5 rounded-xl">
<p className="text-slate-400">
CTR
</p>

<h3 className="text-4xl font-bold mt-2">
{campaignStats.ctr}
</h3>
</div>

</div>

</div>

</div>

)}

      {selectedCampaign && (

        <div
        ref={logsRef}
className="
mt-10
bg-gradient-to-br
from-slate-900
to-slate-950
border
border-slate-800
rounded-3xl
p-8
shadow-xl
"
        >

          <h2
className="
text-3xl
font-bold
mb-8
"
          >
            Campaign Logs
          </h2>

<table
className="
w-full
overflow-hidden
rounded-2xl
"
>

            <thead>

<tr
className="
text-left
bg-slate-800
"
>

                <th className="p-4">
                  Customer
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.map(
                (log) => (

                <tr
                  key={log.id}
                  className="
                    border-b
                    border-slate-800
                  "
                >

                  <td
                    className="
                      py-3
                    "
                  >
                    {
                      log.customer
                        ?.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      log.customer
                        ?.email
                    }
                  </td>

                  <td className="p-4">

                    <span
className={
  log.status === "DELIVERED"
    ? "text-green-400"

    : log.status === "OPENED"
    ? "text-blue-400"

    : log.status === "CLICKED"
    ? "text-purple-400"

    : log.status === "PENDING"
    ? "text-yellow-400"

    : "text-red-400"
}
                    >

                      {log.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

export default Campaigns;