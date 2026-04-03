"use client";
import { User } from "@/types";
import { Avatar } from "@/components/common/Avatar";
import { ContentBox } from "./ContentBox";
import { Content } from "./Content";
import { ReactNode } from "react";

interface CommentBoxProps {
  user: User;
  content: string;
  timeAgo: string | ReactNode;
  compact?: boolean;
}

export function CommentBox({
  user,
  content,
  timeAgo,
  compact = false,
}: CommentBoxProps) {
  return (
    <div className={`flex gap-${compact ? "2 sm:gap-2" : "2 sm:gap-3"}`}>
      <Avatar user={user} size="sm" />
      <div className="flex-1 min-w-0">
        <ContentBox variant="muted">
          <div
            className={`flex items-center gap-1 sm:gap-2 mb-${compact ? "0" : "1"} flex-wrap`}
          >
            <span className="font-medium text-xs sm:text-sm">{user.fullName}</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
          {!compact && <Content text={content} />}
        </ContentBox>
        {compact && <Content text={content} className="mt-1 sm:mt-2" />}
      </div>
    </div>
  );
}
