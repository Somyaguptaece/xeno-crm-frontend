import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails,setCustomerDetails] = useState(null);

  const [showAddModal, setShowAddModal] =
  useState(false);

const [newCustomer, setNewCustomer] =
  useState({

    name: "",

    email: "",

    phone: "",

    city: "",

    totalSpend: ""

  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Customer Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewCustomer =
  async (customerId) => {

    try {

      const response =
        await api.get(
          `/customers/${customerId}`
        );

      setCustomerDetails(
        response.data
      );

      setSelectedCustomer(
        response.data
      );

    } catch (error) {

      console.error(error);

    }

};

const createCustomer =
  async () => {

    try {

      await api.post(
        "/customers",
        newCustomer
      );

      setShowAddModal(
        false
      );

      setNewCustomer({

        name: "",

        email: "",

        phone: "",

        city: "",

        totalSpend: ""

      });

      fetchCustomers();

    } catch (error) {

      console.error(error);

    }

};

  const getSegment = (spend) => {
    if (spend >= 10000)
      return {
        label: "VIP",
        color: "bg-amber-400 text-black",
      };

    if (spend >= 5000)
      return {
        label: "Premium",
        color: "bg-emerald-400 text-black",
      };

    return {
      label: "Regular",
      color: "bg-slate-600 text-white",
    };
  };

  const deleteCustomer =
  async (customerId) => {

    try {

      await api.delete(
        `/customers/${customerId}`
      );

      toast.success(
        "Customer Deleted"
      );

      fetchCustomers();

    } catch (error) {

      toast.error(
        "Delete Failed"
      );

    }

};

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.city.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading Customers...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">

        <button

  onClick={() =>
    setShowAddModal(
      true
    )
  }

  className="
    bg-green-600
    hover:bg-green-700
    px-4
    py-2
    rounded-lg
    mr-4
  "
>

  + Add Customer

</button>
        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-slate-400 mt-2">
            {filteredCustomers.length} Customers Found
          </p>
        </div>

        <input
          type="text"
          placeholder="Search name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            bg-slate-900
            border
            border-slate-700
            rounded-lg
            px-4
            py-2
            outline-none
          "
        />
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Spend</th>
              <th className="p-4 text-left">Segment</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="
                  border-b
                  border-slate-800
                  hover:bg-slate-800
                "
              >
                <td className="p-4">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.email}
                </td>

                <td className="p-4">
                  {customer.city}
                </td>

                <td className="p-4">
                  ₹{customer.totalSpend}
                </td>

                <td className="p-4">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${getSegment(customer.totalSpend).color}
                    `}
                  >
                    {getSegment(customer.totalSpend).label}
                  </span>
                </td>


<td className="p-4">

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    <button
      onClick={() =>
        viewCustomer(
          customer.id
        )
      }
      className="
        bg-blue-600
        hover:bg-blue-700
        px-5
        py-2
        rounded-lg
        shadow-lg
        transition-all
        duration-300
      "
    >
      View
    </button>

    <button
      onClick={() =>
        deleteCustomer(
          customer.id
        )
      }
      className="
        bg-red-600
        hover:bg-red-700
        px-5
        py-2
        rounded-lg
        shadow-lg
        transition-all
        duration-300
      "
    >
      Delete
    </button>

  </div>

</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-end
          "
        >
          <div
            className="
              w-[400px]
              h-full
              bg-slate-900
              p-6
              border-l
              border-slate-800
            "
          >
<div className="flex justify-between items-center mb-6">

  <div>

    <h2 className="text-3xl font-bold">
      Customer Profile
    </h2>

    <p className="text-slate-400">
      Detailed customer insights
    </p>

  </div>

  <button
    onClick={() => {
      setSelectedCustomer(null);
      setCustomerDetails(null);
    }}
    className="
      bg-slate-800
      hover:bg-red-600
      w-10
      h-10
      rounded-full
    "
  >
    ✕
  </button>

</div>

<div
className="
bg-gradient-to-r
from-purple-600/20
to-blue-600/20
border
border-slate-800
rounded-2xl
p-5
mb-6
"
>

  <div className="flex items-center gap-4">

    <div
      className="
      w-16
      h-16
      rounded-full
      bg-purple-600
      flex
      items-center
      justify-center
      text-2xl
      font-bold
      "
    >
      {selectedCustomer.name?.charAt(0)}
    </div>

    <div>

      <h3 className="text-xl font-bold">
        {selectedCustomer.name}
      </h3>

      <p className="text-slate-400">
        {selectedCustomer.email}
      </p>

    </div>

  </div>

</div>

           <div className="grid grid-cols-2 gap-4 mb-8">

<div className="bg-slate-800 rounded-xl p-4">
  <p className="text-slate-400 text-sm">
    City
  </p>

  <p className="font-semibold mt-2">
    {selectedCustomer.city}
  </p>
</div>
<div className="bg-slate-800 rounded-xl p-4">
  <p className="text-slate-400 text-sm">
    Total Spend
  </p>

  <p className="font-bold text-green-400 mt-2">
    ₹{selectedCustomer.totalSpend}
  </p>
</div>

<div className="bg-slate-800 rounded-xl p-4">
  <p className="text-slate-400 text-sm">
    Segment
  </p>

  <div className="mt-2">
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        ${
          getSegment(
            selectedCustomer.totalSpend
          ).color
        }
      `}
    >
      {
        getSegment(
          selectedCustomer.totalSpend
        ).label
      }
    </span>
  </div>
</div>
            </div>

            <div>

<h3 className="text-xl font-bold mb-4">
🛒 Orders
</h3>

  <div
    className="
      max-h-40
      overflow-y-auto
      space-y-2
    "
  >

    {customerDetails?.orders?.map(
      (order) => (

<div
  key={order.id}
  className="
    bg-slate-900
    p-4
    rounded-xl
    border
    border-slate-700
  "
>
  <p className="text-green-400 font-semibold">
    ₹{order.amount}
  </p>
</div>

      )
    )}

  </div>

</div>

<div>

<h3 className="text-xl font-bold mb-4">
📨 Communication History
</h3>

  <div
    className="
      max-h-52
      overflow-y-auto
      space-y-2
    "
  >

    {customerDetails?.communicationLogs?.map(
      (log) => (

<div
  key={log.id}
  className="
    bg-slate-800
    p-4
    rounded-xl
    border
    border-slate-700
  "
>

  <p className="font-semibold">
    {log.campaign?.name}
  </p>

  <div
    className="
      flex
      justify-between
      mt-3
      items-center
    "
  >

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        ${
          log.status === "OPENED"
            ? "bg-green-500/20 text-green-400"
            : log.status === "FAILED"
            ? "bg-red-500/20 text-red-400"
            : "bg-blue-500/20 text-blue-400"
        }
      `}
    >
      {log.status}
    </span>

    <span className="text-slate-500 text-xs">
      {
        new Date(
          log.createdAt
        ).toLocaleDateString()
      }
    </span>

  </div>

</div>

      )
    )}

  </div>

</div>
          </div>
        </div>
      )}

      {showAddModal && (

  <div
    className="
      fixed
      inset-0
      bg-black/60
      flex
      justify-center
      items-center
      z-50
    "
  >

    <div
      className="
        bg-slate-900
        p-6
        rounded-xl
        w-[500px]
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Add Customer
      </h2>

      <div className="space-y-4">

        <input
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e)=>
            setNewCustomer({
              ...newCustomer,
              name:e.target.value
            })
          }
          className="
            w-full
            p-3
            bg-slate-800
            rounded-lg
          "
        />

        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e)=>
            setNewCustomer({
              ...newCustomer,
              email:e.target.value
            })
          }
          className="
            w-full
            p-3
            bg-slate-800
            rounded-lg
          "
        />

        <input
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e)=>
            setNewCustomer({
              ...newCustomer,
              phone:e.target.value
            })
          }
          className="
            w-full
            p-3
            bg-slate-800
            rounded-lg
          "
        />

        <input
          placeholder="City"
          value={newCustomer.city}
          onChange={(e)=>
            setNewCustomer({
              ...newCustomer,
              city:e.target.value
            })
          }
          className="
            w-full
            p-3
            bg-slate-800
            rounded-lg
          "
        />

        <input
          type="number"
          placeholder="Total Spend"
          value={newCustomer.totalSpend}
          onChange={(e)=>
            setNewCustomer({
              ...newCustomer,
              totalSpend:e.target.value
            })
          }
          className="
            w-full
            p-3
            bg-slate-800
            rounded-lg
          "
        />

      </div>

      <div
        className="
          flex
          gap-4
          mt-6
        "
      >

        <button

          onClick={createCustomer}

          className="
            bg-green-600
            hover:bg-green-700
            px-5
            py-2
            rounded-lg
          "
        >

          Save Customer

        </button>

        <button

          onClick={()=>
            setShowAddModal(false)
          }

          className="
            bg-red-600
            hover:bg-red-700
            px-5
            py-2
            rounded-lg
          "
        >

          Cancel

        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}

export default Customers;