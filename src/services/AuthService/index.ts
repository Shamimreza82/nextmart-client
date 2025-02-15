"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {
    console.log("Sending Data:", JSON.stringify(userData));

    try {
        const res = await fetch("http://localhost:3001/api/v1/user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        console.log("Response Status:", res.status);

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            console.error("API Error Response:", errorData);
            throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
        }


        return await res.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
};





/* eslint-disable @typescript-eslint/no-explicit-any */

export const loginUser = async (userData: FieldValues) => {
    console.log("Sending Data:", JSON.stringify(userData));

    try {
        const res = await fetch("http://localhost:3001/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        console.log("Response Status:", res.status);

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            console.error("API Error Response:", errorData);
            throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
        }

        const result = await res.json()

        if (result.success) {
            const cookieStore = await cookies()
            cookieStore.set("accessToken", result?.data?.accessToken)
        }
        return result
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
};










export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value


    if (!accessToken) {
        console.error("No token found");
        return null
    }

    try {
        const decodedData = jwtDecode(accessToken);
        return decodedData;
    } catch (error) {
        console.error("Token decoding failed:", error);
    }
};


export const recaptchaTokenVerification = async (token: string) => {
    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: process.env.NEXT_PUBLIC_RECAPCHA_SERVER_KEY!, // Use correct env variable
                response: token,
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to verify reCAPTCHA: ${res.statusText}`);
        }

        return await res.json();
    } catch (err) {
        console.error("reCAPTCHA Verification Error:", err);
        return { success: false, message: err instanceof Error ? err.message : "Unknown error occurred" };
    }
};


export const logout = async() => {
    (await cookies()).delete("accessToken")
}
