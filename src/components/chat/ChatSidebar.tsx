"use client";

import { useState, useRef, useEffect } from "react";
import {
    X,
    Send,
    Sprout,
    User,
    Info,
    FlaskConical,
    CloudRain,
    Bug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat, Message } from "@/context/ChatContext";
import { useAgri } from "@/context/AgriContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function ChatSidebar() {
    const { messages, isOpen, setIsOpen, addMessage, sessionId, setSessionId } = useChat();
    const { district, crop } = useAgri();
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        addMessage(content, "user");
        setInputValue("");
        setIsTyping(true);
        setError(null);

        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

        try {
            const res = await fetch(`${API_BASE}/chat/conversation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    query: content.trim(),
                    session_id: sessionId || undefined,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                const msg = data.detail || data.message || "Failed to get response";
                addMessage(
                    `Sorry, I couldn't process that. ${typeof msg === "string" ? msg : JSON.stringify(msg)}`,
                    "assistant",
                    "Error"
                );
                setError(typeof msg === "string" ? msg : "Request failed");
                return;
            }

            if (data.session_id) setSessionId(data.session_id);
            addMessage(data.answer || "No response.", "assistant", data.source || "Zarai Radar RAG");
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Network error";
            addMessage(`Sorry, something went wrong. ${msg}`, "assistant", "Error");
            setError(msg);
        } finally {
            setIsTyping(false);
        }
    };

    const handleQuickAction = (action: string) => {
        handleSendMessage(action);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:w-[420px] p-0 flex flex-col bg-background" showCloseButton={false}>
                {/* Header */}
                <SheetHeader className="p-4 bg-primary text-primary-foreground flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Sprout className="w-5 h-5" />
                            </div>
                            <div>
                                <SheetTitle className="text-primary-foreground font-heading">AgriTech Assistant</SheetTitle>
                                <p className="text-xs text-primary-foreground/80">Your farming advisor</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </SheetHeader>

                {/* Context Badge */}
                {district && crop && (
                    <div className="px-4 py-2 bg-muted/50 border-b border-border flex-shrink-0">
                        <p className="text-xs text-muted-foreground">
                            Context: <span className="font-medium text-primary">{district}</span> •{" "}
                            <span className="font-medium text-secondary">{crop}</span>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mx-4 mt-2 py-2 px-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                        {error}
                    </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                            <span className="text-xs">AgriTech is typing...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-3 border-t border-border flex-shrink-0 bg-background">
                    <p className="text-xs text-muted-foreground mb-2">Quick Actions</p>
                    <div className="flex flex-wrap gap-2">
                        <QuickActionChip
                            icon={<FlaskConical className="w-3 h-3" />}
                            label="Show NPK Plan"
                            onClick={() => handleQuickAction("Show NPK Plan")}
                        />
                        <QuickActionChip
                            icon={<CloudRain className="w-3 h-3" />}
                            label="Check Weather Risk"
                            onClick={() => handleQuickAction("Check Weather Risk")}
                        />
                        <QuickActionChip
                            icon={<Bug className="w-3 h-3" />}
                            label="Disease Treatment"
                            onClick={() => handleQuickAction("Disease Treatment")}
                        />
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-background flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                            placeholder="Ask about your farm..."
                            className="flex-1 px-4 py-3 bg-muted/50 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                        />
                        <Button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            className="w-12 h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.sender === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`
          max-w-[85%] rounded-2xl px-4 py-3
          ${isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground border border-border rounded-bl-sm"
                    }
        `}
            >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                <div className={`flex items-center justify-between mt-2 pt-2 border-t ${isUser ? "border-primary-foreground/20" : "border-border"}`}>
                    <span className={`text-xs ${isUser ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>

                    {message.source && !isUser && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                        <Info className="w-3 h-3" />
                                        Source
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-primary text-primary-foreground">
                                    <p className="text-xs">Source: {message.source}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
        </div>
    );
}

function QuickActionChip({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="
        inline-flex items-center gap-1.5 px-3 py-1.5
        bg-primary/10 text-primary text-xs font-medium
        rounded-full border border-primary/20
        hover:bg-primary hover:text-primary-foreground
        transition-all duration-200
      "
        >
            {icon}
            {label}
        </button>
    );
}
