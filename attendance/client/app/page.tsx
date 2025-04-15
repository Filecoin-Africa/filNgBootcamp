"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import abi from "./utils/abis/attendanceAbi.json";
// import abi from "./utils/abi";

export default function Home() {
  interface AttendanceList {
    name: string;
    location: string;
    topic: string;
    rating: string;
    feedback: string;
    walletAddress: string;
  }

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [topic, setTopic] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lists, setLists] = useState<AttendanceList[]>([]);
  // function list() {

  const { data: results } = useReadContract({
    address: "0xAa4139F58165042cED42C7D8ad0D6d942C6e6A0A",
    abi,
    functionName: "retrieve",
  });

  useEffect(() => {
    if (results) {
      const dataList = results as AttendanceList[];
      setLists(dataList);
    }
  }, [results]);
  // console.log(lists);
  // }

  // const resultsArray = Object.entries(results).map((i) => results[i]);

  const address = useAccount();

  // console.log(typeof resultsArray);
  // console.log(resultsArray);

  console.log("connected address: ", address);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (location == "") {
      alert("You must choose an option");
      return;
    }
    console.log(name, location, topic, rating, feedback);
  };

  const handleChange = (e: any) => {
    setLocation(e.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConnectButton />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>FilBootcampers Attendance Project</h1>
        <div className="flex gap-6">
          <section>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col border-2 border-blue-600 p-4 rounded-md gap-4"
            >
              <input
                className="border-2 p-2"
                name="name"
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
                required
              />
              <div className="border-2 flex flex-col p-2">
                {/* <label className="text-sm border" htmlFor="loc">
                  Select Value
                </label> */}
                <select onChange={handleChange} value={location} id="loc">
                  <option value={""}>Select Value</option>
                  <option value={"online"}>Online</option>
                  <option value={"onsite"}>OnSite</option>
                </select>
              </div>
              <input
                className="border-2 p-2"
                name="topic"
                type="text"
                id="topic"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                placeholder="Enter the Topic"
                required
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <label htmlFor="one">😡</label>
                  <input
                    name="rating"
                    type="radio"
                    id="one"
                    onChange={(e) => setRating("1")}
                    value={rating}
                    required
                  />
                </div>{" "}
                <div className="flex gap-2">
                  <label htmlFor="two">⭐️⭐️</label>
                  <input
                    name="rating"
                    type="radio"
                    id="two"
                    onChange={(e) => setRating("2")}
                    value={rating}
                    required
                  />
                </div>{" "}
                <div className="flex gap-2">
                  <label htmlFor="three">⭐️⭐️⭐️</label>
                  <input
                    name="rating"
                    type="radio"
                    id="three"
                    onChange={(e) => setRating("3")}
                    value={rating}
                    required
                  />
                </div>{" "}
                <div className="flex gap-2">
                  <label htmlFor="four">⭐️⭐️⭐️⭐️</label>
                  <input
                    name="rating"
                    type="radio"
                    id="four"
                    onChange={(e) => setRating("4")}
                    value={rating}
                    required
                  />
                </div>{" "}
                <div className="flex gap-2">
                  <label htmlFor="five">⭐️⭐️⭐️⭐️⭐️</label>
                  <input
                    name="rating"
                    type="radio"
                    id="five"
                    onChange={(e) => setRating("5")}
                    value={rating}
                    required
                  />
                </div>{" "}
              </div>
              <textarea
                className="border p-2"
                maxLength={30}
                placeholder="Feedbacks/Suggestions"
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </section>
          <section>
            <div id="list border-2 border-black rounded-md p-4">
              <h1>List of Attendees</h1>
              <div className="border-2 rounded-md border-blue-200 p-4">
                {lists.map((list, index) => (
                  <div
                    key={index}
                    className="bg-blue-200 rounded-md p-2 my-2 list-none"
                  >
                    <li>Name: {list.name}</li>
                    <li>Location: {list.location}</li>
                    <li>Topic: {list.topic}</li>
                    <li>Rating: {list.rating}</li>
                    <li>Wallet Address: {list.walletAddress}</li>
                    <li>Feedback: {list.feedback}</li>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/filecoinnigeria"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with ❤️ by FilNGCampers
        </a>
      </footer>
    </div>

    // <div>App</div>
  );
}
