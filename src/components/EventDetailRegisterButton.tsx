"use client";

import { useState } from "react";
import EventRegistrationModal from "@/components/EventRegistrationModal";

export default function EventDetailRegisterButton({ 
    eventId, 
    eventTitle, 
    isOpen 
}: { 
    eventId: string; 
    eventTitle: string; 
    isOpen: boolean; 
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                disabled={!isOpen}
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 py-2 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
            >
                {isOpen ? "Одоо бүртгүүлэх" : "Бүртгэл хаагдсан"}
            </button>
            <EventRegistrationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                eventId={eventId}
                eventTitle={eventTitle}
            />
        </>
    );
}
