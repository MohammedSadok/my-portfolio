"use client";

import profile from "@/public/profile.jpg";
import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandGit,
  IconBrandMysql,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
} from "@tabler/icons-react";
import Image from "next/image";

const ProfileCard: React.FC = () => {
  const size = 35;

  const icons = [
    { icon: <IconBrandGit className="text-red-600" size={size} /> },
    { icon: <IconBrandAws className="text-[#FF9900]" size={size} /> },
    { icon: <IconBrandDocker className="text-[#2496ED]" size={size} /> },
    { icon: <IconBrandReact className="text-[#61DAFB]" size={size} /> },
    { icon: <IconBrandTailwind className="text-[#38BDF8]" size={size} /> },
    { icon: <IconBrandTypescript className="text-[#3178C6]" size={size} /> },
    { icon: <IconBrandMysql className="text-[#00758F]" size={size} /> },
  ];

  const totalIcons = icons.length;
  const rotationStep = 360 / totalIcons;

  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-full w-[500px] h-[500px] ">
      <div className="absolute w-[800px] h-[800px] rounded-full ">
        <video autoPlay muted loop className="object-cover w-full h-full">
          <source src="/blackhole.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 pointer-events-none video-overlay" />
      </div>

      <div className="profileCard_container relative w-[350px] h-[350px]">
        <div className="absolute inset-0 profile_items">
          {icons.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              rotation={index * rotationStep}
            />
          ))}
        </div>

        <button className="absolute inset-0 m-auto w-[250px] h-[250px] border-2 hover:border-gray-400/50 cursor-pointer z-10 flex justify-center items-center overflow-hidden transition-all duration-500 rounded-full active:scale-95 hover:scale-95 bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]">
          <Image src={profile} alt="profile" />
        </button>
      </div>

      <style jsx>{`
        .profile_items {
          animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

interface ProfileItemProps {
  icon: React.ReactNode;
  rotation: number;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, rotation }) => {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <button className="profile_item absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cover cursor-pointer p-[2px] active:scale-95 hover:scale-95 transition-all duration-500 z-50">
        <span className="w-14 h-14 transition-all duration-500 rounded-full z-[2] flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]">
          {icon}
        </span>
      </button>
    </div>
  );
};

export default ProfileCard;
