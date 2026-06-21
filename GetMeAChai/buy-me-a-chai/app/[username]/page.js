"use client";
import { use } from "react";
import React from "react";
import { useState, useEffect } from "react";
import {
  fetchuserdata,
  updatepayment,
  fetchpaymentdata,
} from "@/Actions/useractions";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Username = ({ params }) => {
  const [userinfo, setUserinfo] = useState({ username: "..." });
  const [paymentinfos, setPaymentinfos] = useState([]);
  const [paymentdata, setPaymentdata] = useState({
    name: "",
    message: "",
    amount: "",
    to_user: userinfo.username,
  });
  const [payclick, setPayclick] = useState(false);
  const { data: session } = useSession();

  const { username } = use(params);
  useEffect(() => {
    let u = username.replaceAll("%20", " ");
    document.title = `${u} - GetMeaChai`;
  }, []);

  useEffect(() => {
    (async () => {
      const userdata = await fetchuserdata("alikhanak012345@gmail.com");
      setUserinfo(userdata);
      setPaymentdata({ ...paymentdata, to_user: userdata.username });
      const payments = await fetchpaymentdata(userdata.username);
      setPaymentinfos(payments);
      console.log("userinfo", userinfo);
    })();
  }, [payclick]);

  const handleChange = (e) => {
    setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value });
    console.log("paymentdata", paymentdata);
  };
  const pay = () => {
    updatepayment(paymentdata, "alikhanak012345@gmail.com");
    setPayclick(!payclick);
    toast.success("Payment Successfull!", {
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
  };

  const fixedPay = (amount) =>{
    setPaymentdata({ ...paymentdata, amount: amount });
    pay();
  }

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
      {/* images */}
      <div className="images relative ">
        <div className="cover w-[100%] ">
          <img
            src={`${userinfo.coverpic}`}
            className="cover bg-cover "
            alt="cover"
          />
        </div>
        <div className="profile-pic rounded-full overflow-hidden w-fit absolute -bottom-14 left-[45%] size-32 ">
          <img
            src={`${userinfo.profilepic}`}
            width={150}
            alt="profile-pic"
            className="w-[128px] bg-center "
          />
        </div>
      </div>
      {/* description */}
      <div className="desc flex flex-col mt-14 justify-center items-center ">
        <div className="mainname text-2xl font-bold   ">
          {"@" + userinfo.username}
        </div>
        <div className="text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, ipsa?
        </div>
        <div className="text-slate-400">11,692 members . 829 posts </div>
      </div>
      {/* columns */}
      <div className="contaier w-[75%] grid grid-cols-2 mx-auto bg-slate-900  rounded-lg my-16">
        <div className="p-8">
          <h2 className="text-2xl font-bold pb-4">Top 10 Shoutouts</h2>
          <ul className="flex flex-col">
            {paymentinfos.map((paymentinfo) => (
              <li key={paymentinfo._id} className="flex items-center">
                <span>
                  <img src="/avatar.gif" width={30} alt="avatar" />
                </span>
                <span className="pl-1 text-slate-400 text-sm">
                  {`${paymentinfo.name}`} donated {`${paymentinfo.amount}`} with
                  a message "{`${paymentinfo.message}`} "
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8">
          <div className="flex flex-col w-full gap-2 pt-10 pb-4 justify-center">
            {/* inputs of name , message and amount along with button */}
            <input
              type="text"
              placeholder="name"
              name="name"
              value={paymentdata.name}
              onChange={handleChange}
              className=" border border-gray-400 rounded-md bg-gray-600 bg-opacity-50 p-2"
            />

            <input
              placeholder="message"
              name="message"
              className=" border border-gray-400 rounded-md bg-gray-600 bg-opacity-50 p-2"
              value={paymentdata.message}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={paymentdata.amount}
              onChange={handleChange}
              className=" border border-gray-400 rounded-md bg-gray-600 bg-opacity-50 p-2"
            />
            <button
              type="button"
              onClick={pay}
              className="text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Pay
            </button>
          </div>
          {/* <div className="flex items-center justify-around pb-6 gap-3">
            <button className="navbtn" onClick= {() => fixedPay(10) }>pay 10$</button>
            <button className="navbtn">pay 20$</button>
            <button className="navbtn">pay 30$</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Username;
