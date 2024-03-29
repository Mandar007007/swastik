import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function AboutUs(params) {

    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Navbar />
            <Footer />
        </>
    );
}

export default AboutUs;