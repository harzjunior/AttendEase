import { redirect } from "next/navigation";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/api/auth/login?post_login_redirect_url=/dashboard",
      permanent: false,
    },
  };
}

export default function Home() {
  return <main className=""></main>;
}
