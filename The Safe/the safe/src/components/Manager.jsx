import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const manager = () => {
  const Ref = useRef();
  const passRef = useRef();
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [details, setdetails] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setdetails(JSON.parse(password));
    }
  }, []);

  const showpassword = () => {
    if (Ref.current.src.includes("eye.png")) {
      Ref.current.src = Ref.current.src.replace("eye.png", "eyecross.png");
      passRef.current.type = "password";
    } else {
      Ref.current.src = Ref.current.src.replace("eyecross.png", "eye.png");
      passRef.current.type = "text";
    }
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savepassword = () => {
    setdetails([...details, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "password",
      JSON.stringify([...details, { ...form, id: uuidv4() }])
    );
    toast('Password Saved!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss:false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      setform({ url: "", username: "", password: "" });
    console.log("details", details);
  };
  
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss:false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  };
  
  const deleteitem = (id) => {
    let c = confirm("Are you sure to delete this password?");
    if (c) {
      setdetails(details.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(details.filter((item) => item.id !== id))
      );
      toast('Details Deleted!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss:false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  };
  
  const edit = (id) => {
    setform(details.filter((i) => i.id === id)[0]);
    setdetails(details.filter((item) => item.id !== id));
  };

  return (
    <>
      <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition= "Bounce"
  />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="mycontainer font-poppins items-center justify-center flex-col">
        <div className="logo flex  flex-col justify-center items-center   pt-10 pb-2 ">
          <span className="text-pink-600 flex items-center gap-0 pl-2  text-3xl">
            &lt;
            <span className="text-pink-700 text-3xl">
              <FaLock />
            </span>
            &gt;
          </span>
          <span className="text-2xl font-bold text-black">The Safe</span>
          <span className="text-lg  text-black">The secrets saver</span>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="url"
              value={form.url}
              onChange={handlechange}
              placeholder="Website URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leadiight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handlechange}
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leadiight focus:outline-none focus:shadow-outline"
            />
            <div className="flex w-full relative">
              <input
                ref={passRef}
                type="password"
                name="password"
                value={form.password}
                onChange={handlechange}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leadiight focus:outline-none focus:shadow-outline"
              />
              <button
                className="absolute  right-[2%] top-[12px] cursor-pointer"
                onClick={showpassword}
              >
                <img
                  src="/icons/eyecross.png"
                  ref={Ref}
                  width={20}
                  alt="show"
                />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={savepassword}
          disabled={
            !(
              form.url.length > 3 &&
              form.username.length > 3 &&
              form.password.length > 3
            )
          }
          className=" w-fit bg-pink-400 hover:bg-pink-600 mt-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-1"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            colors="primary:#ffffff"
          ></lord-icon>
          Save Password
        </button>
        <table className=" leadiight shadow min-w-full overflow-hidden rounded-md mt-3 border-separate border-spacing-0">
          <thead>
            <tr className="border border-pink-700">
              <th className="bg-pink-400 px-3 py-2 text-left text-white font-bold text-[0.75rem] sm:text-[clamp(0.75rem,0.6875rem_+_0.3125vw,1.0625rem)] ">
                Site
              </th>
              <th className="bg-pink-400 px-3 py-2 text-left text-white font-bold text-[0.75rem] sm:text-[clamp(0.75rem,0.6875rem_+_0.3125vw,1.0625rem)] ">
                Username
              </th>
              <th className="bg-pink-400 px-3 py-2 text-left text-white font-bold text-[0.75rem] sm:text-[clamp(0.75rem,0.6875rem_+_0.3125vw,1.0625rem)]">
                Password
              </th>
              <th className="bg-pink-400 px-3 py-2 text-left text-white font-bold text-[0.75rem] sm:text-[clamp(0.75rem,0.6875rem_+_0.3125vw,1.0625rem)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {details.length === 0 && (
              <div className="">Your password will be shown here </div>
            )}
            {details.length > 0 &&
              details.map((item, index) => {
                return (
                  <tr key={index} className="border border-pink-700">
                    <td className="p-2 text-gray-600  border-pink-400 border-b-2 text-center max-md:text-[0.6rem] text-[clamp(0.6rem,0.495rem_+_0.525vw,1.125rem)]">
                      <div className="flex items-center justify-between max-sm:flex-col">
                        <a
                          href={item.url}
                          target="_blank"
                          className="cursor-pointer"
                        >
                          {item.url}
                        </a>
                        <span
                          className="cursor-pointer"
                          onClick={() => copy(item.url)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            colors="primary:#000000"
                            style={{ width: "20px", height: "20px" }}

                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="p-2 text-gray-600  border-pink-400 border-b-2 text-center max-md:text-[0.6rem] text-[clamp(0.6rem,0.495rem_+_0.525vw,1.125rem)]">
                      <div className="flex items-center justify-between max-sm:flex-col">
                        {item.username}
                        <span
                          className="cursor-pointer"
                          onClick={() => copy(item.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            colors="primary:#000000"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="p-2 text-gray-600  border-pink-400 border-b-2 max-md:text-[0.6rem] text-[clamp(0.6rem,0.495rem_+_0.525vw,1.125rem)] max-sm:flex-col">
                      <div className="flex items-center justify-between max-sm:flex-col">
                        {item.password.replaceAll("a/`z","*")}
                        <span
                          className="cursor-pointer"
                          onClick={() => copy(item.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            colors="primary:#000000"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className=" border-pink-400 border-b-2">
                      <div className=" flex items-center justify-around">
                        <span
                          className="cursor-pointer"
                          onClick={() => edit(item.id)}
                        >
                          <img
                            className="max-sm:w-[20px]"
                            src="/icons/pencil.gif"
                            width={25}
                            alt="pencil-icon"
                          />
                        </span>
                        <span
                          className="cursor-pointer px-3"
                          onClick={() => deleteitem(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors="primary:#000000"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default manager;

