"use client";
import { User } from "@/types";
import { Avatar } from "@/components/common/Avatar";

interface UserHeaderProps {
  user: User;
  timestamp?: React.ReactNode;
  action?: React.ReactNode;
}

export function UserHeader({ user, timestamp, action }: UserHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <Avatar user={user} size="md" />
        <div className="min-w-0">
          <p className="font-medium text-sm sm:text-base truncate">
            {user.fullName}
          </p>
          {timestamp && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {timestamp}
            </p>
          )}
        </div>
      </div>
      {action && <div className="ml-2">{action}</div>}
    </div>
  );
}
