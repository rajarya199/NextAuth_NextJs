"use client"
import React,{useState} from 'react'
import SocialButton from "@/components/SocialButton";
import { useRouter } from "next/navigation";
import axios from 'axios';

import {
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  MailIcon,
  LockIcon,
} from 'lucide-react'
const RegisterPage = () => {
    const router = useRouter();
     const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false)
        const [showCpassword, setShowCpassword] = useState(false)


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit=async(e:React.FormEvent)=>{
e.preventDefault()
setLoading(true)
setErrorMsg("")
  const { username, email, password, confirmPassword } = formData;
// Password match check
  if (password !== confirmPassword) {
    setErrorMsg("Passwords do not match");
    setLoading(false);
    return;
  }
try{
const res=await axios.post("/api/auth/register",{username,email,password})
  if (res.status === 201) {
      router.push("/login");
      console.log("registration done")
      // console.log("signup sucessfully",res.data)
    }
}catch(error:any){
               console.error("Error during signup:", error)
const message =
      error.response?.data?.error || "Something went wrong. Please try again.";
    setErrorMsg(message);

}finally{
setLoading(false)
}
  }
  return (
    <div className=' flex  flex-1 justify-center items-center p-4'> 
        <div className="w-full max-w-md p-4 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300">
             <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sign up to get started
        </p>
      </div>
   {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}
      <form onSubmit={handleSubmit}
      className="mt-4 space-y-4"
>
 <div className="space-y-4">
          {/* Username field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border  border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                placeholder="your name"
                required

              />
            </div>
           
          </div>
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border  border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm`}

                placeholder="youremail@example.com"
              />
            </div>
           
          </div>
          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border  border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm`}

                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
           
          </div>
           <div>
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
             Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="cpassword"
                name="confirmPassword"
                type={showCpassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
               className={`block w-full pl-10 pr-3 py-2 border  border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm`}

                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowCpassword(!showCpassword)}
              >
                {showCpassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
           
          </div>
             <button
          type="submit"
          disabled={loading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"

        >
          {loading ? "Registering..." : "Register"}
        </button>

        </div>
      </form>
         <div className="mt-6 text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </a>
        </p>
      </div>
            <div className="my-8 w-full max-w-md">
                <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <SocialButton actionText="Sign up with" />
      </div>

</div>
    </div>

  )
}

export default RegisterPage