import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
// import { categories } from "../utils/constants";
import { Context } from "../contexts/contextApi";





import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categories = [
    { name: "New", icon: <AiFillHome/>, type: "home" },
    { name: "Trending", icon: <MdLocalFireDepartment />, type: "category" },
    { name: "Music", icon: <CgMusicNote/>, type: "category" },
    { name: "Films", icon: <FiFilm/>, type: "category" },
    { name: "Live", icon: <MdLiveTv/>, type: "category" },
    { name: "Gaming", icon: <IoGameControllerSharp/>, type: "category" },
    { name: "News", icon: <ImNewspaper/>, type: "category" },
    { name: "Sports", icon: <GiDiamondTrophy/>, type: "category" },
    { name: "Learning", icon: <RiLightbulbLine/>, type: "category" },
    {
        name: "Fashion & beauty",
        icon: <GiEclipse/>,
        type: "category",
        divider: true,
    },
    // { name: "Settings", icon: <FiSettings/>, type: "menu" },
    // { name: "Report History", icon: <AiOutlineFlag/>, type: "menu" },
    // { name: "Help", icon: <FiHelpCircle/>, type: "menu" },
    // { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];
const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu } =
        useContext(Context);

    const navigate = useNavigate();

    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                return setSelectedCategory(`${name} className="bg-orange-400"`);
            case "home":
                return setSelectedCategory(`${name} className="bg-orange-400"`);
            case "menu":
                return false;
            default:
                break;
        }
    };

    return (
        <div
            className={` md:block w-[240px] overflow-y-auto h-full  py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
                mobileMenu ? "translate-x-0" : ""
            }`}
        >
            <div className="flex px-5 flex-col">
                {categories.map((item) => {
                    return (
                        <React.Fragment key={item.name}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickHandler(item.name, item.type);
                                    navigate("/");
                                }}
                                className={`${
                                    selectedCategory === item.name
                                        ? "bg-orange-400"
                                        : ""
                                }`}
                            />
                            {item.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>
                    );
                })}
                <hr className="my-5 border-white/[0.2]" />
                
            </div>
        </div>
    );
};

export default LeftNav;