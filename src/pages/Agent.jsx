import { useState } from "react";
import api from "../services/api";

function Agent() {

  const [goal, setGoal] =
    useState("");



  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const executeAgent =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.post(
            "/agents/execute",
            {
              goal
            }
          );

        setResult(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Marketing Agent
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl">

        <textarea

          value={goal}

          onChange={(e)=>
            setGoal(
              e.target.value
            )
          }

          placeholder="Example:
Bring back inactive Pune customers with a special discount offer"

          className="
            w-full
            h-40
            bg-slate-800
            rounded-lg
            p-4
          "
        />

        <button

          onClick={
            executeAgent
          }

          className="
            mt-4
            bg-purple-600
            hover:bg-purple-700
            px-6
            py-3
            rounded-lg
          "
        >

          {
            loading
            ? "Executing Agent..."
            : "Execute Agent"
          }

        </button>

      </div>

      {result && (

        <div
          className="
            bg-slate-900
            p-6
            rounded-xl
            mt-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-6
            "
          >
            Agent Execution Result
          </h2>

          <div className="space-y-4">

            <div>
              <span className="font-bold text-purple-400">
                Audience:
              </span>
<div className="space-y-2">

  <p>

    <span className="font-semibold">
      City:
    </span>{" "}

    {
      result.audience?.city
        || "All Cities"
    }

  </p>

  <p>

    <span className="font-semibold">
      Minimum Spend:
    </span>{" "}

    {
      result.audience?.minSpend
        ? `₹${result.audience.minSpend}`
        : "No Spend Filter"
    }

  </p>

</div>
            </div>

            <div>
              <span className="font-bold text-purple-400">
                Campaign:
              </span>
              <p>
                {
                  result.campaign
                    ?.name
                }
              </p>
            </div>

            <div>
              <span className="font-bold text-purple-400">
                Message:
              </span>
              <p>
                {
                  result.campaign
                    ?.message
                }
              </p>
            </div>

            <div>
              <span className="font-bold text-purple-400">
                Channel:
              </span>
              <p>
                {
                  result.recommendation
                    ?.bestChannel
                }
              </p>
            </div>

<div>
  <span className="font-bold text-green-400">
    Campaign Created And Sent Through Queue
  </span>
</div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Agent;