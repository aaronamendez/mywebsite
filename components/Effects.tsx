"use client";

import { useEffect } from "react";
import { initSite } from "@/lib/site-effects";

// All page interactivity lives in one imperative module that works on the
// server-rendered DOM; this component just starts it once on the client.
export function Effects() {
	useEffect(() => {
		initSite();
	}, []);
	return null;
}
