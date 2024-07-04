import { Navbar } from "@/components/navbar";
import AuthComponent from "./auth-component";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <>
      <Navbar>
        <AuthComponent />
      </Navbar>
      {children}
    </>
  );
};

export default RootLayout;
