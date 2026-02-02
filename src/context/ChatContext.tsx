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
    sessionId: string | null;
    addMessage: (content: string, sender: "user" | "assistant", source?: string) => void;
    setSessionId: (id: string | null) => void;
    toggleChat: () => void;
    setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatState | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            content: "Hello! I'm your AgriTech assistant. Ask me about crops, weather, diseases, or farming practices. I use our knowledge base to give you accurate answers.",
            sender: "assistant",
            source: "Zarai Radar RAG",
            timestamp: new Date(),
        },
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

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
                sessionId,
                addMessage,
                setSessionId,
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
