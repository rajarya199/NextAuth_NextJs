"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

type ProviderId = "google" | "github" | "linkedin";

const providers: { id: ProviderId; name: string; color: string; Icon: React.ElementType }[] = [
  { id: "google", name: "Google", color: "bg-red-600 hover:bg-red-700", Icon: FaGoogle },
  { id: "github", name: "GitHub", color: "bg-gray-800 hover:bg-gray-900", Icon: FaGithub },
  { id: "linkedin", name: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800", Icon: FaLinkedin },
];

interface SocialButtonsProps {
  actionText?: string; // e.g. "Sign in with", "Sign up with"
}

const SocialButton: React.FC<SocialButtonsProps> = ({ actionText = "Sign in with" }) => {
  return (
    <div className="flex flex-col gap-3 mt-2">
      {providers.map(({ id, name, color, Icon }) => (
        <button
          key={id}
          onClick={() => signIn(id)}
          className={`${color} text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2`}
          aria-label={`${actionText} ${name}`}
          type="button"
        >
          <Icon size={20} />
          {actionText} {name}
        </button>
      ))}
    </div>
  );
};

export default SocialButton;
