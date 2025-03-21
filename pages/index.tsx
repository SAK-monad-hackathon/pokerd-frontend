import { useLogin } from "@privy-io/react-auth";
import { PrivyClient } from "@privy-io/server-auth";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@mui/material";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieAuthToken = req.cookies["privy-token"];

  // If no cookie is found, skip any further checks
  if (!cookieAuthToken) return { props: {} };

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
  const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

  try {
    const claims = await client.verifyAuthToken(cookieAuthToken);
    // Use this result to pass props to a page for server rendering or to drive redirects!
    // ref https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
    console.log({ claims });

    return {
      props: {},
      redirect: { destination: "/dashboard", permanent: false },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push("/dashboard"),
  });

  return (
    <>
      <Head>
        <title>Login · Privy</title>
      </Head>

      <div className="flex flex-1 p-6 justify-center items-center">
        <div>
          <div>
            <Image
              src="/images/cover1.jpeg"
              alt="Cover Image"
              style={{ maxWidth: "100%", height: "auto" }}
              width={500}
              height={300}
              priority
            />
          </div>
          <div className="mt-6 flex justify-center text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={login}
              className="bg-violet-600 text-black py-3 px-6 rounded-lg"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
