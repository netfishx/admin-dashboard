"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function ErrorToast({ error }: { error: boolean }) {
    const { toast } = useToast();
    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
            });
        }
    }, [error, toast]);
    return null;
}
