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
      const { key, notes, orderId, amount } = order.data
      // It should open the Razorpay Dialog Box
      const options = {
        key, // Enter the Key ID generated from the Dashboard
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
        handler: verifyPremiumUser
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
        console.log(err)
    }
  };

  return  isUserPremium ? <h1> " You're already a premium user. " </h1> : 
    <div className="flex  flex-col lg:flex-row m-auto p-10">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-10">
        <h1 className="font-bold text-4xl"> Silver Membership</h1>
        <ul>
          <li>Blue Tick</li>
          <li>Real-time Chatting</li>
          <li>100 Connection Requests per day</li>
          <li>3 months</li>
        </ul>
        <button
          className="btn btn-secondary"
          onClick={() => buyMembership("silver")}
        >
          {" "}
          Buy Silver Membership
        </button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-10">
        <h1 className="font-bold text-4xl"> Gold Membership</h1>
        <ul>
          <li>Blue Tick</li>
          <li>Real-time Chatting</li>
          <li>Infinite Connection Requests per day</li>
          <li>6 months</li>
        </ul>
        <button
          className="btn btn-primary"
          onClick={() => buyMembership("gold")}
        >
          {" "}
          Buy Gold Membership
        </button>
      </div>
    </div>
  
  ; 
};

export default Premium;
