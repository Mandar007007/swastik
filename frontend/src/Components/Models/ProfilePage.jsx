import Navbar from "../Navbar/Navbar";


function ProfilePage(params) {
    
    return(
        <>
            <Navbar />
            
            <div className=" py-5  px-12 bg-gray-50 h-[100vh] ">
                <div className=" grid grid-cols-2 gap-7">
                    <div className=" col-span-1 bg-white rounded-md h-[200px] shadow-lg ">hello</div>
                    <div className=" col-span-1 bg-white rounded-md h-[200px] shadow-lg ">hello</div>
                </div>
                <div className="">

                </div>
            </div>
        </>
    );

}

export default ProfilePage;