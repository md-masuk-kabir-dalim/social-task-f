import OTPVerifyPage from "@/components/verify-otp/verify-otp";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string; token: string }>;
}) => {
  const { token, email } = await searchParams;
  return <OTPVerifyPage email={email as string} token={token} />;
};

export default page;
