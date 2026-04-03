"use client";
import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCreateResourceMutation,
  useUpdateResourceMutation,
} from "@/redux/api/commonApi";
import { authRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { getOtpTimingFromToken } from "@/lib/helpers/otpTimerHelper";

export default function OTPVerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [timer, setTimer] = useState(0); // cooldown
  const [expiryTime, setExpiryTime] = useState(0); // expiry
  const [shake, setShake] = useState(false);
  const [sendOtp] = useCreateResourceMutation();
  const [verifyOtp] = useUpdateResourceMutation();

  // SEND OTP
  const handleSendOtp = async () => {
    if (!email) return;

    try {
      const payload = { email, type: "EMAIL_VERIFICATION" };

      const res = await sendOtp({
        url: authRoutes.sendOtp,
        payload,
        tags: [tagTypes.auth],
      }).unwrap();

      const { cooldownAt, expiresAt, otpToken } = res?.data?.data;

      // cooldown
      const cooldownSeconds = Math.ceil(
        (new Date(cooldownAt).getTime() - Date.now()) / 1000,
      );

      // expiry
      const expirySeconds = Math.ceil(
        (new Date(expiresAt).getTime() - Date.now()) / 1000,
      );

      setTimer(cooldownSeconds);
      setExpiryTime(expirySeconds);

      //  update URL token
      const params = new URLSearchParams(window.location.search);
      params.set("token", otpToken);
      router.replace(`/verify-otp?${params.toString()}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      const timing = getOtpTimingFromToken(token);

      if (timing) {
        setExpiryTime(timing.expiryTime);
        setTimer(timing.cooldownTime);
      }
    }
  }, [token]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // EXPIRY TIMER
  useEffect(() => {
    if (expiryTime <= 0) return;

    const interval = setInterval(() => {
      setExpiryTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  // OTP INPUT HANDLER
  const handleChange = (i: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[i] = value.slice(-1);
    setOtp(newOtp);

    if (value && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }

    if (e.key === "Enter") handleVerify();
  };

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

  // VERIFY OTP
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6 || !email) return;

    // expiry check
    if (expiryTime <= 0) {
      setStatus("error");
      alert("OTP expired. Please resend.");
      return;
    }

    try {
      setStatus("loading");

      await verifyOtp({
        url: authRoutes.verifyOtp,
        payload: {
          email,
          otp: code,
        },
      }).unwrap();

      setStatus("success");
      router.push("/feed");
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

  // RESEND
  const handleResend = () => {
    if (timer !== 0) return;

    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    handleSendOtp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded border shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">Enter OTP</h1>

        {/* OTP INPUT */}
        <div
          className="flex gap-2.5"
          style={shake ? { animation: "shake 0.5s ease" } : {}}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={status === "loading"}
              className="w-11 h-14 text-center text-xl border rounded-xl"
            />
          ))}
        </div>

        {/* ERROR */}
        {status === "error" && (
          <p className="text-red-500 text-xs mt-2">Invalid or expired OTP</p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={otp.some((d) => !d) || status === "loading"}
          className="mt-5 w-full py-3 bg-primary text-white rounded-xl"
        >
          {status === "loading" ? "Verifying..." : "Verify"}
        </button>

        {/* EXPIRY */}
        <div className="mt-2 text-xs text-gray-400">
          OTP expires in {Math.max(expiryTime, 0)}s
        </div>

        {/* RESEND */}
        <div className="mt-4 text-sm text-gray-400">
          {timer === 0 ? (
            <button onClick={handleResend} className="text-indigo-500">
              Resend Code
            </button>
          ) : (
            <>Resend in {Math.max(Math.ceil(timer), 0)}s</>
          )}
        </div>
      </div>

      {/* SHAKE ANIMATION */}
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
