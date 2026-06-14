import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  return (
    <div
      className="
        h-16
        border-b
        border-slate-800
        flex
        items-center
        justify-between
        px-8
      "
    >

<div>

  <h2
    className="
      text-2xl
      font-bold
    "
  >
    Xeno CRM
  </h2>

  <p
    className="
      text-sm
      text-slate-400
    "
  >
    Marketing Automation Platform
  </p>

</div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-slate-400">
            {user?.email}
          </p>

        </div>

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-purple-500
            flex
            items-center
            justify-center
            font-bold
          "
        >
          {user?.name?.[0] || "U"}
        </div>

<button
onClick={() => {

  localStorage.removeItem("token");

  window.location.href = "/";

}}
className="
px-5
py-2.5
rounded-xl
bg-gradient-to-r
from-red-500
to-red-600
hover:from-red-600
hover:to-red-700
transition-all
duration-300
shadow-lg
hover:scale-105
font-medium
"
>
Logout
</button>

      </div>

    </div>
  );
}

export default Navbar;