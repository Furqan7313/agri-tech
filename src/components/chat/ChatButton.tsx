"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/context/ChatContext";

export function ChatButton() {
    const { isOpen, toggleChat, messages } = useChat();

    // Count unread messages (simplified - in real app would track read state)
    const unreadCount = messages.length > 1 ? 1 : 0;

    if (isOpen) return null;

    return (
        <Button
            onClick={toggleChat}
            className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-[#1B4332] hover:bg-[#2D6A4F]
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-110
      "
            size="icon"
        >
            <MessageCircle className="w-6 h-6 text-white" />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E63946] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                </span>
            )}
        </Button>
    );
}
