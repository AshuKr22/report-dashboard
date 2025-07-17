"use client";

import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
          <UserIcon className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-foreground text-sm">
            {user.name}
          </span>
          <Badge
            variant={user.role === "reviewer" ? "default" : "secondary"}
            className="text-xs h-5"
          >
            {user.role}
          </Badge>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onLogout} className="h-8 px-2">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
