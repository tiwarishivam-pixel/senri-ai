'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserRound, Grid, Settings, Wand2, X, Search,FileUser,MessagesSquare,Mail  } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";

const sidebarItems = [
  {
    title: "Profile",
    icon: <UserRound className="h-4 w-4" />,
    url: "/dashboard/onboarding",
  },
  {
    title: "Mock Interview Quiz",
    icon: <Grid className="h-4 w-4" />,
    url: "/dashboard/interview/mock",
  },
  {
    title: " Practice Quiz",
    icon: <Wand2 className="h-4 w-4" />,
    url: "https://quiz-performance-analyser.streamlit.app",
  },
  {
    title:"Coverletter",
    icon:<FileUser />,
    url:"/dashboard/ai-cover-letter"
  },
   {
    title:"Resume",
    icon:<Wand2/>,
    url:"/dashboard/resume"
  },
   {
    title:"interview",
    icon:<MessagesSquare />,
    url:"/dashboard/interview"
  },
  {
    title:"Virtual-interview",
    icon:<Grid/>,
    url:"http://localhost:8501/"
  },
  {
    title:"Cold Mail Generator",
    icon:<Mail />,
    url:"https://coldmaill--generatorr.streamlit.app"
  },
  
];

export function Sidebar({ isOpen, onClose, isMobile = false }) {
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <Wand2 className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold">Senri</h2>
            <p className="text-xs text-muted-foreground">Learn and Build</p>
          </div>
        </div>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2"
          />
        </div>
      </div>

      {/* Sidebar navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary transition-colors"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <div className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>User</span>
            </div>
            <Badge variant="outline">Pro</Badge>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onClose}
          />
        )}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden border-r",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block">
      {sidebarContent}
    </div>
  );
}
