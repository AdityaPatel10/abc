import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedData = JSON.parse(input);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON input");
      }

      // Call the backend API
      const apiResponse = await axios.post(
        "https://your-backend-url.vercel.app/bfhl", // Replace with your backend URL
        parsedData
      );

      // Set the response data
      setResponse(apiResponse.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input or API error");
      setResponse(null);
    }
  };

  const filters = ["Alphabets", "Numbers", "Highest Alphabet"];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>API Input</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON input, e.g., { "data": ["M", "1", "334", "4", "B"] }'
        style={{ width: "100%", height: "100px", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Submit
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Multi Filter</h2>
          <select
            multiple
            onChange={(e) =>
              setSelectedFilters(
                [...e.target.options]
                  .filter((opt) => opt.selected)
                  .map((opt) => opt.value)
              )
            }
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>

          <h3>Filtered Response</h3>
          {selectedFilters.includes("Numbers") && (
            <p>
              <strong>Numbers:</strong> {response.numbers.join(", ")}
            </p>
          )}
          {selectedFilters.includes("Alphabets") && (
            <p>
              <strong>Alphabets:</strong> {response.alphabets.join(", ")}
            </p>
          )}
          {selectedFilters.includes("Highest Alphabet") && (
            <p>
              <strong>Highest Alphabet:</strong> {response.highest_alphabet.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;