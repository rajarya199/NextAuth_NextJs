"use client"
import React from 'react'
import { useSession} from "next-auth/react";

const ProfilePage = () => {
      const { data: session, status } = useSession();
  if (status === "loading") return <p className="p-6">Loading profile...</p>;
  if (!session) return <p className="p-6">You are not logged in.</p>;
  const user = session.user;

  return (
    
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold">Welcome, {user.username} 👋</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
            <p>Role: {user.role}</p>
          <p>Name: {user.name}</p> 
         <p> UserName:{user.username}</p>  


      </div>
</div>

  )
}

export default ProfilePage