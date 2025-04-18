"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import abi from "./utils/abis/attendanceAbi.json";

export default function Home() {
  interface AttendanceList {
    name: string;
    location: string;
    topic: string;
    rating: string;
    feedback: string;
    walletAddress: string;
  }

  const [lists, setLists] = useState<AttendanceList[]>([]);
  const [formData, setFormData] = useState({
    _name: "",
    _location: "",
    _topic: "",
    _rating: "",
    _feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contractAddress = "0xAa4139F58165042cED42C7D8ad0D6d942C6e6A0A";

  const { address, isConnected } = useAccount();

  // Fetch attendance records from the blockchain
  const { data: results, isError: isReadError, error: readError } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "retrieve",
    watch: true, // Automatically refresh data when the blockchain state changes
  });

  // Write contract function
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess, isError: isReceiptError, error: receiptError } = useWaitForTransactionReceipt({
    hash,
  });

  // Check for any blockchain read errors
  useEffect(() => {
    if (isReadError && readError) {
      console.error("Error fetching data from blockchain:", readError);
      toast.error(`Error loading data: ${readError instanceof Error ? readError.message : "Unknown error"}`);
    }
  }, [isReadError, readError]);

  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Improved bytes32 conversion method
  const stringToBytes32 = (str: string): string => {
    // Ensure the string is not too long
    const truncated = str.slice(0, 31);
    
    // Convert string to bytes
    const encoder = new TextEncoder();
    const bytes = encoder.encode(truncated);
    
    // Convert bytes to hex
    let hexString = '0x';
    for (let i = 0; i < bytes.length; i++) {
      hexString += bytes[i].toString(16).padStart(2, '0');
    }
    
    // Pad to bytes32 (64 hex chars + '0x' prefix)
    return hexString.padEnd(66, '0');
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if wallet is connected
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    // Validate form data
    if (!formData._name || !formData._location || !formData._topic || !formData._rating || !formData._feedback) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Prevent multiple submissions
    if (isSubmitting || isPending || isConfirming) {
      toast.info("Transaction is already in progress");
      return;
    }
    
    setIsSubmitting(true);
    toast.info("Preparing transaction...");
    
    try {
      console.log("Submitting form with data:", formData);
      console.log("Contract address:", contractAddress);
      
      // Ensure location and rating are valid uint8 values
      const location = Number(formData._location);
      const rating = Number(formData._rating);
      
      if (isNaN(location) || location < 0 || location > 255) {
        throw new Error("Location must be a number between 0 and 255");
      }
      
      if (isNaN(rating) || rating < 0 || rating > 255) {
        throw new Error("Rating must be a number between 0 and 255");
      }
      
      // Convert feedback to bytes32
      const feedbackBytes32 = stringToBytes32(formData._feedback);
      console.log("Feedback as bytes32:", feedbackBytes32);
      
      // Make the contract call with correct parameter types
      writeContract({
        address: contractAddress,
        abi,
        functionName: "form",
        args: [
          formData._name,        // string
          location,              // uint8
          formData._topic,       // string
          rating,                // uint8
          feedbackBytes32,       // bytes32
        ],
      });
      
      // Alternative approach with hardcoded values for testing
      // Uncomment this and comment out the above writeContract call to test with hardcoded values
      /*
      writeContract({
        address: contractAddress,
        abi,
        functionName: "form",
        args: [
          "Test Name",                   // string
          1,                             // uint8
          "Test Topic",                  // string 
          5,                             // uint8
          "0x5465737400000000000000000000000000000000000000000000000000000000"  // bytes32 for "Test"
        ],
      });
      */
      
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error(`Transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      setIsSubmitting(false);
    }
  };

  // Update the list of attendees when results change
  useEffect(() => {
    if (results) {
      console.log("Received data from blockchain:", results);
      const dataList = results as AttendanceList[];
      setLists(dataList);
    }
  }, [results]);

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      console.error("Write contract error:", writeError);
      toast.error(`Write error: ${writeError instanceof Error ? writeError.message : "Unknown error"}`);
      setIsSubmitting(false);
    }
  }, [writeError]);

  // Handle receipt errors
  useEffect(() => {
    if (isReceiptError && receiptError) {
      console.error("Transaction receipt error:", receiptError);
      toast.error(`Transaction failed: ${receiptError instanceof Error ? receiptError.message : "Unknown error"}`);
      setIsSubmitting(false);
    }
  }, [isReceiptError, receiptError]);

  // Transaction status monitoring and toast notifications
  useEffect(() => {
    if (isPending) {
      console.log("Transaction is pending...");
      toast.info("Transaction is being processed...");
    }
    
    if (hash) {
      console.log("Transaction hash:", hash);
      const shortHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`;
      toast.info(`Transaction submitted! Hash: ${shortHash}`);
    }
    
    if (isConfirming) {
      console.log("Waiting for confirmation...");
      toast.info("Waiting for blockchain confirmation...");
    }
    
    if (isSuccess) {
      console.log("Transaction confirmed successfully!");
      toast.success("Form submitted successfully!");
      setFormData({
        _name: "",
        _location: "",
        _topic: "",
        _rating: "",
        _feedback: "",
      });
      setIsSubmitting(false);
    }
    
  }, [isPending, hash, isConfirming, isSuccess]);

  console.log("Connected address:", address);
  console.log("Is connected:", isConnected);
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Connect wallet button at the top */}
      <div className="flex justify-between w-full items-center mb-4">
        <h1 className="text-xl font-bold">FilBootcampers Attendance Project</h1>
        <ConnectButton />
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" />

      <main className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6">
          <section className="flex-1">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col border-2 border-green-600 p-4 rounded-md gap-4"
            >
              <h2 className="text-lg font-bold">Register New Attendance</h2>
              <input
                className="border-2 p-2"
                name="_name"
                type="text"
                placeholder="Enter Name"
                value={formData._name}
                onChange={handleFormChange}
                required
              />
              <select
                className="border-2 p-2"
                name="_location"
                value={formData._location}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Location</option>
                <option value="1">Online</option>
                <option value="2">Onsite</option>
              </select>
              <input
                className="border-2 p-2"
                name="_topic"
                type="text"
                placeholder="Enter Topic"
                value={formData._topic}
                onChange={handleFormChange}
                required
              />
              <select
                className="border-2 p-2"
                name="_rating"
                value={formData._rating}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">1 - 😡</option>
                <option value="2">2 - ⭐️⭐️</option>
                <option value="3">3 - ⭐️⭐️⭐️</option>
                <option value="4">4 - ⭐️⭐️⭐️⭐️</option>
                <option value="5">5 - ⭐️⭐️⭐️⭐️⭐️</option>
              </select>
              <textarea
                className="border-2 p-2"
                name="_feedback"
                placeholder="Enter Feedback (max 30 characters)"
                value={formData._feedback}
                onChange={handleFormChange}
                maxLength={30}
                required
              />
              <p className="text-xs text-gray-500">
                {30 - (formData._feedback?.length || 0)} characters remaining
              </p>
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
                disabled={isPending || isConfirming || isSubmitting}
              >
                {isPending || isConfirming ? (
                  "Processing..."
                ) : isSubmitting ? (
                  "Submitting..."
                ) : (
                  "Submit Attendance"
                )}
              </button>
              {hash && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                  <p>Transaction hash: {`${hash.slice(0, 6)}...${hash.slice(-4)}`}</p>
                  <a
                    href={`https://goerli.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on Etherscan
                  </a>
                </div>
              )}
            </form>
          </section>

          <section className="flex-1">
            <div className="border-2 border-black rounded-md p-4">
              <h1 className="text-lg font-bold mb-4">List of Attendees</h1>
              <div className="border-2 rounded-md border-blue-200 p-4 max-h-[500px] overflow-y-auto">
                {lists && lists.length > 0 ? (
                  lists.map((list, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 rounded-md p-2 my-2 list-none"
                    >
                      <li>Name: {list.name}</li>
                      <li>Location: {list.location === "1" ? "Online" : "Onsite"}</li>
                      <li>Topic: {list.topic}</li>
                      <li>Rating: {list.rating} {Array(parseInt(list.rating)).fill("⭐️").join("")}</li>
                      <li>Wallet Address: {`${list.walletAddress.slice(0, 6)}...${list.walletAddress.slice(-4)}`}</li>
                      <li>Feedback: {list.feedback}</li>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No attendance records found</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center mt-8">
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
  );
}