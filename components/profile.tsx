"use client";
import profile from "@/public/profile.jpg";
import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandGit,
  IconBrandMysql,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
} from "@tabler/icons-react";
import Image from "next/image";
import { FaJava } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";

const ProfileCard: React.FC = () => {
  const size = 35;

  const icons = [
    { icon: <IconBrandGit size={size} />, name: "Git", color: "text-red-600" },
    {
      icon: <SiSpringboot size={size} />,
      name: "Spring Boot",
      color: "text-[#6DB33F]",
    },
    { icon: <FaJava size={size} />, name: "Java", color: "text-[#007396]" },
    {
      icon: <IconBrandNextjs size={size} />,
      name: "Next.js",
      color: "text-white",
    },
    {
      icon: <IconBrandAws size={size} />,
      name: "AWS",
      color: "text-[#FF9900]",
    },
    {
      icon: <IconBrandDocker size={size} />,
      name: "Docker",
      color: "text-[#2496ED]",
    },
    {
      icon: <IconBrandReact size={size} />,
      name: "React",
      color: "text-[#61DAFB]",
    },
    {
      icon: <IconBrandTailwind size={size} />,
      name: "Tailwind CSS",
      color: "text-[#38BDF8]",
    },
    {
      icon: <IconBrandTypescript size={size} />,
      name: "TypeScript",
      color: "text-[#3178C6]",
    },
    {
      icon: <IconBrandMysql size={size} />,
      name: "MySQL",
      color: "text-[#00758F]",
    },
  ];

  const totalIcons = icons.length;
  const rotationStep = 360 / totalIcons;

  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-full w-[600px] h-[600px]">
      <div className="profileCard_container relative w-[400px] h-[400px]">
        <div className="absolute inset-0 profile_items">
          {icons.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              name={item.name}
              color={item.color}
              rotation={index * rotationStep}
            />
          ))}
        </div>
        <button className="absolute inset-0 m-auto w-[280px] h-[280px] border-2 hover:border-gray-400/50 cursor-pointer z-10 flex justify-center items-center overflow-hidden transition-all duration-500 rounded-full active:scale-95 hover:scale-95 bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]">
          <Image src={profile} alt="profile" />
        </button>
      </div>

      <style jsx>{`
        .profile_items {
          animation: rotate 25s linear infinite;
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
  name: string;
  color: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, rotation, color }) => {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 w-14 h-14">
        <button
          className={`w-full h-full rounded-full bg-cover p-[2px] transition-all duration-300  ${color} `}
        >
          <span className="w-full h-full rounded-full z-[2] flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] ">
            {icon}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
