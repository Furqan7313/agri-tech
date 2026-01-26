"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
    id: string;
    content: string;
    sender: "user" | "assistant";
    source?: string;
    timestamp: Date;
}

interface ChatState {
    messages: Message[];
    isOpen: boolean;
    addMessage: (content: string, sender: "user" | "assistant", source?: string) => void;
    toggleChat: () => void;
    setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatState | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            content: "Hello! I'm your AgriTech assistant. How can I help you today with your farming decisions?",
            sender: "assistant",
            source: "System",
            timestamp: new Date(),
        },
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const addMessage = (content: string, sender: "user" | "assistant", source?: string) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            content,
            sender,
            source,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const toggleChat = () => setIsOpen((prev) => !prev);

    return (
        <ChatContext.Provider
            value={{
                messages,
                isOpen,
                addMessage,
                toggleChat,
                setIsOpen,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
