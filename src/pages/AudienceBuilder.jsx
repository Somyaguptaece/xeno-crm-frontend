import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AudienceBuilder() {
  const [prompt, setPrompt] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const generateAudience =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.post(
            "/audience/ai-preview",
            {
              prompt,
            }
          );

        setResult(
          response.data
        );

      } catch (error) {

        console.error(error);

        toast.error(
  "Audience generation failed"
);

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Audience Builder
      </h1>

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
          Describe Your Audience
        </h2>

        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          placeholder="Find Delhi customers who spent more than 5000"
          rows="5"
          className="
            w-full
            bg-slate-800
            rounded-lg
            p-4
            outline-none
          "
        />

        <button
          onClick={
            generateAudience
          }
          className="
            mt-4
            px-6
            py-3
            bg-purple-600
            rounded-lg
            hover:bg-purple-700
          "
        >
          {
            loading
              ? "Generating..."
              : "Generate Audience"
          }
        </button>

      </div>

      {result && (

        <>

          <div
            className="
              bg-slate-900
              rounded-xl
              p-6
              mt-8
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              AI Generated Filters
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div>

                <p className="text-slate-400">
                  City
                </p>

                <h3 className="text-xl font-bold">
                  {
                    result.filters.city ||
                    "Not Specified"
                  }
                </h3>

              </div>

              <div>

                <p className="text-slate-400">
                  Min Spend
                </p>

                <h3 className="text-xl font-bold">
                  ₹
                  {
                    result.filters.minSpend ||
                    0
                  }
                </h3>

              </div>

            </div>

          </div>

          <div
            className="
              bg-slate-900
              rounded-xl
              p-6
              mt-8
            "
          >

            <h2 className="text-2xl font-bold mb-4">
              Audience Size
            </h2>

            <p className="text-5xl font-bold text-purple-400">
              {result.audienceSize}
            </p>

            <p className="text-slate-400 mt-2">
              Matching Customers
            </p>

          </div>

          <div
            className="
              bg-slate-900
              rounded-xl
              p-6
              mt-8
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              Matching Customers
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    City
                  </th>

                  <th className="p-4 text-left">
                    Spend
                  </th>

                </tr>

              </thead>

              <tbody>

                {result.customers.map(
                  (customer) => (

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

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </>

      )}

    </div>
  );
}

export default AudienceBuilder;