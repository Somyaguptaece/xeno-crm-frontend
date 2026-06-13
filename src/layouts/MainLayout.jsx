import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

<div className="flex-1 ml-64">

  <Navbar />

  {children}

</div>

    </div>
  );
}

export default MainLayout;