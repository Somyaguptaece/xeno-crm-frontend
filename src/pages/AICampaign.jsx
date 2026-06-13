import { useState } from "react";
import api from "../services/api";

function AICampaign() {

  const [goal, setGoal] =
    useState("");

  const [campaign, setCampaign] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const generateCampaign =
    async () => {

      try {

        setLoading(true);

        const response =
          await api.post(
            "/campaigns/ai-generate",
            {
              goal,
            }
          );

        setCampaign(
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

      <h1 className="text-3xl font-bold mb-8">
        AI Campaign Generator
      </h1>

      <div
        className="
          bg-slate-900
          p-6
          rounded-xl
        "
      >

        <h2 className="text-xl mb-4">
          Describe Campaign Goal
        </h2>

        <textarea
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
          placeholder="Example: Bring back inactive customers"
          className="
            w-full
            h-40
            bg-slate-800
            rounded-lg
            p-4
            mb-4
          "
        />

        <button
          onClick={generateCampaign}
          className="
            bg-purple-600
            hover:bg-purple-700
            px-6
            py-3
            rounded-lg
          "
        >
          {
            loading
              ? "Generating..."
              : "Generate Campaign"
          }
        </button>

      </div>

      {campaign && (

        <div
          className="
            bg-slate-900
            p-6
            rounded-xl
            mt-8
          "
        >

          <h2 className="text-2xl font-bold mb-4">
            AI Generated Campaign
          </h2>

          <div className="mb-4">

            <p className="text-slate-400">
              Campaign Name
            </p>

            <p className="text-xl font-semibold">
              {campaign.name}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Campaign Message
            </p>

            <p className="mt-2">
              {campaign.message}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default AICampaign;