import React from "react";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Form } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const signIn = useSignIn();
  
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let a = await response.json();
    console.log(a);
    if(a.success){
      // signIn({ 
      //   token: a.token,
      //   expiresIn: 3600,
      //   type: "Bearer",
      //   authState: { email: form.email }
      // });
    const success = signIn({
      auth: {
          token: a.token,
          type: 'Bearer',
      },
      userState: {
          email: form.email,
      }
      
    })
    
  
    if (success) {
      localStorage.setItem("email", form.email);
      console.log('Logged in successfully');
      window.location.href = "/";
    } else {
      console.log('Login failed');
    }
    toast("Logged In!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  };
  const handleregister = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5713/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    let a = await response.json();
    toast("Password Saved!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Section - Create New Account */}
        {isRegister ? (
          <div className="w-1/2 bg-pink-300 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Create New Account
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handlechange}
                className="p-3 rounded-lg border border-pink-400"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handlechange}
                className="p-3 rounded-lg border border-pink-400"
              />
              <button
                type="submit"
                onClick={handleregister}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
              >
                Register
              </button>
            </form>
            <p
              className="mt-4 text-white underline cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              Already have an account? Login
            </p>
          </div>
        ) : (
          <div className="w-1/2 bg-pink-200 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-pink-800">Login</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handlechange}
                className="p-3 rounded-lg border border-pink-400"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handlechange}
                className="p-3 rounded-lg border border-pink-400"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                onClick={handlelogin}
              >
                Login
              </button>
            </form>
            <p
              className="mt-4 text-pink-800 underline cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              Don’t have an account? Register
            </p>
          </div>
        )}
        {/* Right Section */}
        <div className="w-1/2 bg-pink-100 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/300x300"
            alt="Login Illustration"
            className="w-2/3"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
