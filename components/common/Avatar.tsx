import { User } from "@/types";

interface AvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function Avatar({ user, size = "md", className = "" }: AvatarProps) {
  return (
    <img
      src={user.image}
      alt={user.fullName}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      title={user.fullName}
    />
  );
}
