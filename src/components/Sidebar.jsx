import {
  LayoutDashboard,
  Users,
  Megaphone,
  Sparkles,
  BarChart3,
  Bot,
} from "lucide-react";

import { Link ,useLocation} from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div
  className="
    fixed
    left-0
    top-0
    h-screen
    w-64
    bg-slate-900
    border-r
    border-slate-800
    p-5
    z-50
  "
>

<div className="mb-10">

  <h1
    className="
      text-3xl
      font-bold
      text-purple-400
    "
  >
    XENO
  </h1>

  <p
    className="
      text-xs
      text-slate-500
      mt-1
    "
  >
    CRM + AI Automation
  </p>

</div>

      <nav className="space-y-4">

        <Link
          to="/"
          className={`

flex
items-center
gap-3
p-3
rounded-lg

${
  location.pathname === "/"

    ? "bg-purple-600"

    : "hover:bg-slate-800"

}

`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/customers"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Users size={20} />
          Customers
        </Link>

        <Link
          to="/campaigns"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Megaphone size={20} />
          Campaigns
        </Link>

        <Link
          to="/audience"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Sparkles size={20} />
          AI Audience
        </Link>

        <Link
          to="/ai-campaign"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Sparkles size={20} />
          AI Campaign
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

        <Link
  to="/agent"
  className="
    flex
    items-center
    gap-3
    p-3
    rounded-lg
    hover:bg-slate-800
  "
>
  <Bot size={20} />
  AI Agent
</Link>

        <Link
  to="/analytics-agent"
  className="
    flex
    items-center
    gap-3
    p-3
    rounded-lg
    hover:bg-slate-800
  "
>
  <Bot size={20} />
  Analytics AI Agent
</Link>

      </nav>

    </div>
  );
}

export default Sidebar;