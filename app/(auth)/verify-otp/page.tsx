"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { useRouter } from "next/navigation";

export default function OTPVerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [shake, setShake] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // Focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // ✅ FIXED TIMER (single interval)
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // ✅ ENTER SUBMIT
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  // ✅ FIXED PASTE
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = Array(6).fill("");
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  // ✅ VERIFY API
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return;

    try {
      setStatus("loading");

      // 🔥 Replace with your real API
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp: code }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();

      setStatus("success");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setStatus("error");
      setShake(true);

      setTimeout(() => {
        setShake(false);
        setStatus("idle");
        setOtp(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }, 700);
    }
  };

  // ✅ RESEND API
  const handleResend = async () => {
    try {
      await fetch("/api/auth/resend-otp", {
        method: "POST",
      });

      setTimer(30);
      setCanResend(false);
      setOtp(Array(6).fill(""));
      setStatus("idle");

      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend failed");
    }
  };

  const isFilled = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded border border-white shadow-md text-primary px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-primary mb-4">Enter OTP</h1>

        {/* OTP INPUTS */}
        <div
          className="flex gap-2.5"
          style={shake ? { animation: "shake 0.5s ease" } : {}}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={status === "loading"}
              className="w-11 h-14 text-center text-xl text-primary bg-white border border-primary rounded-xl"
            />
          ))}
        </div>

        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">Invalid OTP</p>
        )}

        {/* VERIFY */}
        <button
          onClick={handleVerify}
          disabled={!isFilled || status === "loading"}
          className="mt-5 w-full py-3 bg-primary text-white rounded-xl"
        >
          {status === "loading" ? "Verifying..." : "Verify"}
        </button>

        {/* RESEND */}
        <div className="mt-4 text-sm text-gray-400">
          {canResend ? (
            <button onClick={handleResend} className="text-indigo-400">
              Resend Code
            </button>
          ) : (
            <>Resend in {timer}s</>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
