import { useAuth } from "@/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (Component: React.FC) => {
  return (props: any) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!currentUser) {
        router.push("/login");
      }
    }, [currentUser, router]);

    if (!currentUser) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};
