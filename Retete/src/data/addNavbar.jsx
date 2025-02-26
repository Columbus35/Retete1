import React, { useState } from 'react';
import { GiFruitBowl, GiKnifeFork } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import "./addNavbar.css";

const NavBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActiveLink = (index) => {
        setActiveIndex(index);
    };

const handleMouseMove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty('--x', x + 'px');
        e.target.style.setProperty('--y', y + 'px');
    };
    return (
        <div className='addBodyNav'>
        <nav className="addnavigation">
            <ul>
                {[
                    { name: 'Adauga Categorie ', icon: <FaBowlFood size="20"/>, path: '/add-reteta/categorie', color:" rgb(54, 134, 227)"},
                    { name: 'Adauga Ingredient ', icon: <GiFruitBowl size="20"/>, path: '/add-reteta/ingredient', color:" rgb(58, 223, 168)"},
                    { name: 'Adauga Reteta ', icon: <GiKnifeFork size="20"/>, path: '/add-reteta/reteta', color:" rgb(240, 252, 16)"},
                ].map((item, index) => (
                    <li
                        key={index}
                        className={`list ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => handleActiveLink(index)}
                    >   
                        <Link 
                                to={item.path} 
                                onMouseMove={handleMouseMove}
                                style={{ '--clr': item.color }}
                            >
                                <span className="addNavText">
                                    {item.name}
                                </span>
                                <span className="addNavText">{item.icon}</span>
                        </Link>
                    </li>
                ))}
                
            </ul>
        </nav>
        </div>
    );
};

export default NavBar;
