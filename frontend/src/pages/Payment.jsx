import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import scannerImg from "../assets/scanner.png"; //

const Payment = () => {
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate for redirect

  const handleScan = () => {
    // Simulate a payment scan
    setScanned(true);

    // Redirect to Home after 2 seconds
    setTimeout(() => {
      navigate("/"); // Redirect to Home page
    }, 2000);
  }

  return (
    <div>
      <Title />
      <div className="flex flex-col items-center justify-center mt-5">
         <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 flex flex-col items-center h-[600px] w-[300px]">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2 mt-6">
            Dummy Payment
          </h1>
          <p className="text-xl text-gray-600 mb-6 text-center">
            Scan the QR code below to simulate your payment.
          </p>

          <div className="flex flex-col items-center justify-center space-y-4">
            {!scanned ? (
              <>
                 <div className="relative w-40 h-40 border-4 border-blue-500 rounded-xl flex items-center justify-center shadow-md">
        <img
          src={scannerImg}
          alt="QR Code"
          className="w-28 h-28 object-contain"
        />

        {/* Fake scanning line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
      </div>
                <button
                  onClick={handleScan}
                  className="w-full p-2.5 bg-black text-white font-bold rounded-lg shadow-md transition-all transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
                >
                  Simulate Scan
                </button>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Payment Successful!
                </h2>
                <p className="text-gray-700">
                  Redirecting to Home...
                </p>
              </div>
            )}
          </div>

          <div className="w-full text-center mt-8">
            <p className="text-sm text-gray-500">
              Dummy Payment Simulator – Not real money
            </p>
          </div>
        </div>
      </div>

      <div className="max-padd-container bg-[#a5fc48d0] py-6 mt-12 rounded-lg text-center">
        <p className="text-gray-600">
          © 2024 GlamLumina. All rights reserved. Designed by Nandita Nilajagi.
        </p>
      </div>
    </div>
  );
};

export default Payment;
