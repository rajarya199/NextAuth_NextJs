"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
} from 'lucide-react'
import SocialButton from '@/components/SocialButton';
import Link from 'next/link';

const LoginPage = () => {
      const router=useRouter()

       const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
      const [loading, setLoading] = useState(false);
      const [errorMsg, setErrorMsg] = useState("");
        const [showPassword, setShowPassword] = useState(false)
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };


const handleSubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try{
       const res=await signIn("credentials",{
            email:formData.email,
            password:formData.password,
            redirect:false
        })
        
      if (res?.error) {
          setErrorMsg(res.error || "Invalid email or password");
      } else {
        router.push("/");
      }
    }
    catch(error){
      setErrorMsg("Login failed. Please try again.");
       console.error("Error during signin:", error)


    } finally{
      setLoading(false)
    }
}

  return (
    <div>
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form   onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6" >
            {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
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
                          className={`block w-full pl-10 pr-3 py-2.5 border  border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="youremail@example.com"
                          />
                        </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                            className={`block w-full pl-10 pr-3 py-2.5 border  border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
            
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
 <div className="text-right text-sm">
             <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={loading || !formData.email || !formData.password}

            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
             {loading ? "Signing..." : " Sign in"}
           
          </button>
        
        </form>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </p>

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
        <SocialButton actionText="Sign in with" />
      </div>
      </div>
    </div>
  </div>
</section>

        
    </div>
  )
}

export default LoginPage