import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-x-hidden flex flex-col min-h-screen">
                <Header showSearch={false}/>
                <div className="py-16 sm:py-6 lg:py-8 max-w-full lg:max-w-7xl mx-auto space-y-8 px-4 ">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
