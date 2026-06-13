import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function CampaignGenerator() {

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

        console.error(
          error
        );

        alert(
          "Failed To Generate Campaign"
        );

      } finally {

        setLoading(false);

      }
    };

  const saveCampaign =
    async () => {

      try {

        await api.post(
          "/campaigns",
          {
            name:
              campaign.name,
            message:
              campaign.message,
          }
        );

        toast.success(
  "Campaign Saved Successfully"
);

      } catch (error) {

        console.error(
          error
        );

        toast.error(
  "Failed To Save Campaign"
);

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
          rounded-xl
          p-6
        "
      >

        <h2 className="text-xl font-semibold mb-4">
          Campaign Goal
        </h2>

        <textarea
          value={goal}
          onChange={(e) =>
            setGoal(
              e.target.value
            )
          }
          placeholder="
Example:
Bring back inactive customers

OR

Offer 20% discount to high spending customers

OR

Target Delhi customers with festive offer
"
          className="
            w-full
            h-40
            bg-slate-800
            rounded-lg
            p-4
            mb-4
            outline-none
          "
        />

        <button
          onClick={
            generateCampaign
          }
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
            rounded-xl
            p-6
            mt-8
          "
        >

          <h2 className="text-2xl font-bold mb-6">
            AI Generated Result
          </h2>

          <div className="mb-6">

            <p className="text-slate-400">
              Campaign Name
            </p>

            <p className="text-xl font-semibold mt-2">
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

          <button
            onClick={
              saveCampaign
            }
            className="
              mt-6
              bg-emerald-600
              hover:bg-emerald-700
              px-6
              py-3
              rounded-lg
            "
          >
            Save Campaign
          </button>

        </div>

      )}

    </div>
  );
}

export default CampaignGenerator;