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

// Quick action responses
const quickActionResponses: Record<string, { content: string; source: string }> = {
    "Show NPK Plan": {
        content:
            "Based on your crop selection, here's the recommended NPK ratio:\n\n🌿 Nitrogen (N): 120 kg/acre\n🏔️ Phosphorus (P): 60 kg/acre\n💧 Potassium (K): 40 kg/acre\n\nApply nitrogen in split doses - 50% at sowing and 50% at tillering stage for optimal absorption.",
        source: "Soil Atlas 2023",
    },
    "Check Weather Risk": {
        content:
            "Current weather assessment for your area:\n\n🌡️ Temperature: 28°C (Favorable)\n💧 Humidity: 65% (Moderate)\n💨 Wind: 12 km/h (Light)\n\n⚠️ Risk Level: Low-Moderate\n\nNo immediate weather threats detected. Continue normal irrigation schedule. Monitor for temperature changes in the next 48 hours.",
        source: "PMD Forecast 2026",
    },
    "Disease Treatment": {
        content:
            "Active disease alert: Yellow Rust\n\n🔍 Symptoms to watch:\n• Yellow-orange pustules on leaves\n• Striped pattern along veins\n\n💊 Treatment Protocol:\n1. Apply Propiconazole fungicide (0.1%) within 48 hours\n2. Ensure proper drainage to reduce humidity\n3. Scout fields every 3 days for spread\n\nPrevention: Consider resistant varieties for next season.",
        source: "FAO Plant Health Guide",
    },
};

export function ChatSidebar() {
    const { messages, isOpen, setIsOpen, addMessage } = useChat();
    const { district, crop } = useAgri();
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        // Add user message
        addMessage(content, "user");
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Check if it's a quick action
        const quickResponse = quickActionResponses[content];
        if (quickResponse) {
            addMessage(quickResponse.content, "assistant", quickResponse.source);
        } else {
            // Generic response
            addMessage(
                `Thank you for your question about "${content}". Based on your context (${district}, ${crop}), I recommend checking the dashboard for detailed insights. Is there anything specific you'd like to know about weather, fertilizers, or disease management?`,
                "assistant",
                "AgriTech AI"
            );
        }
        setIsTyping(false);
    };

    const handleQuickAction = (action: string) => {
        handleSendMessage(action);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:w-[420px] p-0 flex flex-col bg-[#F8F9F1]">
                {/* Header */}
                <SheetHeader className="p-4 bg-[#1B4332] text-white flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Sprout className="w-5 h-5" />
                            </div>
                            <div>
                                <SheetTitle className="text-white font-heading">AgriTech Assistant</SheetTitle>
                                <p className="text-xs text-white/70">Your farming advisor</p>
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
                    <div className="px-4 py-2 bg-[#1B4332]/5 border-b border-[#E5E7EB] flex-shrink-0">
                        <p className="text-xs text-[#6B7280]">
                            Context: <span className="font-medium text-[#1B4332]">{district}</span> •{" "}
                            <span className="font-medium text-[#D4A373]">{crop}</span>
                        </p>
                    </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && (
                        <div className="flex items-center gap-2 text-[#6B7280]">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                <div className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                            <span className="text-xs">AgriTech is typing...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-3 border-t border-[#E5E7EB] flex-shrink-0 bg-white">
                    <p className="text-xs text-[#6B7280] mb-2">Quick Actions</p>
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
                <div className="p-4 border-t border-[#E5E7EB] bg-white flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                            placeholder="Ask about your farm..."
                            className="flex-1 px-4 py-3 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
                        />
                        <Button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            className="w-12 h-12 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-50"
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
                        ? "bg-[#1B4332] text-white rounded-br-sm"
                        : "bg-white border border-[#E5E7EB] text-[#1F2937] rounded-bl-sm shadow-sm"
                    }
        `}
            >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                <div className={`flex items-center justify-between mt-2 pt-2 border-t ${isUser ? "border-white/20" : "border-[#E5E7EB]"}`}>
                    <span className={`text-xs ${isUser ? "text-white/60" : "text-[#6B7280]"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>

                    {message.source && !isUser && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#1B4332] transition-colors">
                                        <Info className="w-3 h-3" />
                                        Source
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-[#1B4332] text-white">
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
        bg-[#1B4332]/5 text-[#1B4332] text-xs font-medium
        rounded-full border border-[#1B4332]/20
        hover:bg-[#1B4332] hover:text-white
        transition-all duration-200
      "
        >
            {icon}
            {label}
        </button>
    );
}
