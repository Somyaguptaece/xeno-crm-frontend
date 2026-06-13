import { useState } from "react";
import api from "../services/api";

function AnalyticsAgent() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {

    try {

      setLoading(true);

      const response =
        await api.post(
          "/analytics-agent/ask",
          {
            question
          }
        );

        console.log(
  "Response Data:",
  response.data
);

console.log(
  "Type:",
  typeof response.data
);

      setAnswer(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  console.log("Analytics Agent Rendered");

  return (

    

    <div className="p-8">

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Analytics AI Agent
      </h1>

      <div
        className="
          bg-slate-900
          p-6
          rounded-xl
        "
      >

        <textarea

          value={question}

          onChange={(e)=>
            setQuestion(
              e.target.value
            )
          }

          placeholder="
Ask things like:

Why did my last campaign fail?

Which channel performs best?

How can I improve open rates?
"

          className="
            w-full
            h-40
            bg-slate-800
            rounded-lg
            p-4
          "
        />

        <button

          onClick={askAI}

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
              ? "Thinking..."
              : "Ask AI"
          }

        </button>

      </div>

      {answer && (

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
              text-xl
              font-bold
              mb-4
            "
          >
            AI Analysis
          </h2>

<div className="space-y-4">

  <div>
    <span className="font-bold text-purple-400">
      Best Channel:
    </span>
    <p>{answer.bestChannel}</p>
  </div>

  <div>
    <span className="font-bold text-purple-400">
      Recommended Audience:
    </span>
    <p>{answer.recommendedAudience}</p>
  </div>

  <div>
    <span className="font-bold text-purple-400">
      Expected Open Rate:
    </span>
    <p>{answer.expectedOpenRate}</p>
  </div>

  <div>
    <span className="font-bold text-purple-400">
      Reason:
    </span>
    <p>{answer.reason}</p>
  </div>

</div>

        </div>

      )}

    </div>

  );

}

export default AnalyticsAgent;