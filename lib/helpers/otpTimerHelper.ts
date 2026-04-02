import { OtpTokenPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

export type OtpTimingResult = {
  expiryTime: number;
  cooldownTime: number;
};

/**
 * Decode OTP JWT token and calculate remaining expiry & cooldown
 */
export const getOtpTimingFromToken = (
  otpToken: string,
): OtpTimingResult | null => {
  try {
    const decoded = jwtDecode<OtpTokenPayload>(otpToken);

    const now = Date.now();

    const expiryTime = Math.max(
      Math.ceil((new Date(decoded.expiresAt).getTime() - now) / 1000),
      0,
    );

    const cooldownTime = Math.max(
      Math.ceil((new Date(decoded.cooldownAt).getTime() - now) / 1000),
      0,
    );

    return {
      expiryTime,
      cooldownTime,
    };
  } catch (err) {
    return null;
  }
};
