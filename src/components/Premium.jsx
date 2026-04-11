import api from "../utils/api";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import MotionBg from "./MotionBg";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const response = await api.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (response.data.isPremium) {
      setIsUserPremium(true);
      return true;
    }
    return false;
  };

  const refreshUser = async () => {
    const res = await api.get(BASE_URL + "/profile/view", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  };

  const waitForPremiumAndRefresh = async () => {
    // Payment status is updated via Razorpay webhook, which can take a few seconds.
    // Poll verify endpoint briefly, then refresh redux user so navbar updates.
    const attempts = 8;
    for (let i = 0; i < attempts; i++) {
      try {
        const ok = await verifyPremiumUser();
        if (ok) {
          await refreshUser();
          return;
        }
      } catch (e) {
        // ignore transient errors during polling
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
  };

  const buyMembership = async () => {
    try {
      const order = await api.post(
        BASE_URL + "/payment/create",
        { membershipType: "premium" },
        { withCredentials: true }
      );

      const { keyId, notes, orderId, amount } = order.data;

      const options = {
        key: keyId,
        amount,
        currency: "INR",
        name: "DevHub",
        description: "Premium Membership",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          contact: "+919876543210",
        },
        theme: {
          color: "#2563eb",
        },
        handler: async function () {
          await waitForPremiumAndRefresh();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Already premium
  if (isUserPremium) {
    return (
      <div className="relative flex items-center justify-center min-h-[80vh] text-center bg-linear-to-br from-blue-50 to-gray-100 px-4">
        <MotionBg />
        <div className="z-100 bg-white rounded-2xl shadow-md p-8 w-[40%]">
          <h1 className="text-3xl font-semibold text-gray-800">
            You're a Premium User 🎉
          </h1>
          <p className="text-gray-500 mt-2">
            Enjoy all exclusive features 🚀
          </p>
        </div>
      </div>
    );
  }

  // ✅ Upgrade UI
  return (
    <div className="relative min-h-[90vh] bg-linear-to-br from-blue-50 to-blue-100 px-4 py-12">
      <MotionBg />

      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Go Premium 🚀
        </h1>
        <p className="text-gray-500 mt-2">
          Unlock full potential and grow faster as a developer
        </p>
      </div>

      {/* Premium Card */}
      <div className="z-100 relative max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">

        {/* Badge */}
        <div className="inline-block mb-3 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
          Most Popular
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Premium Membership
        </h2>

        {/* Price */}
        <p className="text-3xl font-bold text-blue-600 mb-4">
          ₹199<span className="text-sm text-gray-500"> / month</span>
        </p>

        {/* Features */}
        <ul className="text-gray-600 space-y-3 text-sm text-left mb-6">
          <li>✔️ Blue Verification Badge</li>
          <li>✔️ Unlimited Connection Requests</li>
          <li>✔️ Real-time Chat Access</li>
          <li>✔️ Higher Profile Visibility</li>
          <li>✔️ See Who Viewed Your Profile</li>
          <li>✔️ Early Access to Features</li>
        </ul>

        {/* CTA */}
        <button
          onClick={buyMembership}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium cursor-pointer"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default Premium;