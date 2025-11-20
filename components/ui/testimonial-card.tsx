import React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

export interface TestimonialAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author,
  text,
  className
}) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-slate-800",
        "bg-slate-900/50 backdrop-blur-sm p-6",
        "hover:border-amber-500/30 hover:bg-slate-900/80 transition-all duration-300",
        "w-[350px] shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 border border-slate-700">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold text-slate-100 leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-amber-500 mt-1 font-medium">
            {author.role}
          </p>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed italic">
        "{text}"
      </p>
    </div>
  );
};
