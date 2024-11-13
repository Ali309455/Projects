"use client"
import React from "react";
import { useState, useEffect } from "react";
import { updateformdata, fetchuserdata } from "@/Actions/useractions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({username:"",razorpayid:"",razorpaysecret:""});
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        const u = await fetchuserdata(session.user.email);
        setForm(u); // Pre-fill the form if needed
      };
      fetchUserData();
    }
    else{
      router.push("/Login")
    }
  }, [session]);

  const handleSubmit = () => {
    if (
      form.username <= 0 ||
      form.razorpayid.length <= 0 ||
      form.razorpaysecret <= 0
    ) {
      toast.warn("Please fill all the required fields!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      updateformdata(form, session.user.name, session.user.email);
      console.log('form', form)
      toast.success("Profile Updated!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container mx-auto py-5 px-6 ">
        <h1 className="text-center my-5 text-3xl font-bold">
          Welcome to the Dashboard
        </h1>

        <form className="max-w-2xl mx-auto" action={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              value={form.username ? form.username : ""}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input for email */}
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              value={form.email ? form.email : ""}
              readOnly
              type="email"
              name="email"
              id="email"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input forusername */}
          <div className="my-2">
            <label
              htmlFor="uniquename"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Unique Name
            </label>
            <input
              value={form.uniquename ? form.uniquename : ""}
              readOnly
              type="text"
              name="uniquename"
              id="uniquename"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input for profile picture of input type text */}
          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              type="text"
              name="profilepic"
              id="profilepic"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* input for cover pic  */}
          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cover Picture
            </label>
            <input
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              type="text"
              name="coverpic"
              id="coverpic"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input razorpay id */}
          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Razorpay Id
            </label>
            <input
              value={form.razorpayid ? form.razorpayid : ""}
              onChange={handleChange}
              type="text"
              name="razorpayid"
              id="razorpayid"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input razorpay secret */}
          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Razorpay Secret
            </label>
            <input
              value={form.razorpaysecret ? form.razorpaysecret : ""}
              onChange={handleChange}
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Submit Button  */}
          <div className="my-6">
            <button
              type="submit"
              disabled={
                form.name?.length < 0 ||
                form.username?.length < 0 ||
                form.razorpayid?.length < 0 ||
                form.razorpaysecret?.length < 0
              }
              className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none disabled:bg-blue-300 disabled:hover:bg-blue-300  dark:focus:ring-blue-800 font-medium text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;



