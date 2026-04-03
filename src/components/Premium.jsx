import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false)
    useEffect(()=>{
        verifyPremiumUser()
    },[])
    const verifyPremiumUser = async ()=>{
        const response = await axios.get(BASE_URL + '/premium/verify',{
            withCredentials: true
        })
        console.log(response)
        if(response.data.isPremium){
            setIsUserPremium(true)
        }
    }
  const buyMembership = async (membershipType) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType },
        { withCredentials: true },
      );
      const { keyId, notes, orderId, amount } = order.data
      // It should open the Razorpay Dialog Box
      const options = {
        key: keyId, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits.
        currency: "INR",
        name: "Dev Tinder", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: notes.firstName + " " + notes.lastName, //your customer's name
          email: notes.email,
          contact: "+919876543210", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "DevTinder Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function () {
            setTimeout(() => {
                verifyPremiumUser();
            }, 3000);
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
        console.log(err)
    }
  };

  return isUserPremium ? (
  <div className="flex items-center justify-center h-[70vh] text-center">
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">
        You're already a Premium User 🎉
      </h1>
      <p className="text-gray-500 mt-2">
        Enjoy all the exclusive features 🚀
      </p>
    </div>
  </div>
) : (
  <div className="min-h-[90vh] bg-linear-to-br from-blue-50 to-gray-100 px-4 py-10">

    <div className="max-w-5xl mx-auto text-center mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
        Upgrade to Premium
      </h1>
      <p className="text-gray-500 mt-2">
        Unlock powerful features and boost your networking 🚀
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

      {/* SILVER */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between">
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Silver
          </h2>
          <p className="text-gray-500 mb-4">For growing users</p>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>✔️ Blue Verification Badge</li>
            <li>✔️ Real-time Chat Access</li>
            <li>✔️ 100 Connection Requests / day</li>
            <li>✔️ Priority Profile Visibility</li>
            <li>✔️ Basic Profile Insights</li>
            <li>✔️ 3 Months Access</li>
          </ul>
        </div>

        <button
          onClick={() => buyMembership("silver")}
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
        >
          Get Silver
        </button>
      </div>

      {/* GOLD (Highlighted) */}
      <div className="relative bg-white border-2 border-blue-600 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
        
        {/* Badge */}
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Gold
          </h2>
          <p className="text-gray-500 mb-4">For power users</p>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>✔️ Everything in Silver</li>
            <li>✔️ Unlimited Connection Requests</li>
            <li>✔️ Boosted Profile Visibility</li>
            <li>✔️ See Who Viewed Your Profile</li>
            <li>✔️ Advanced Profile Insights</li>
            <li>✔️ Priority Chat Responses</li>
            <li>✔️ 6 Months Access</li>
          </ul>
        </div>

        <button
          onClick={() => buyMembership("gold")}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Gold
        </button>
      </div>

    </div>
  </div>
);
  
  ; 
};

export default Premium;
