import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryBar.css';

const CategoryBar = () => {
    return (
        <nav className="category-bar">
            <Link to="/concert">콘서트</Link>
            <Link to="/musical">뮤지컬</Link>
            <Link to="/playacting">연극</Link>
            <Link to="/festival">페스티벌</Link>
            <Link to="/display">전시</Link>
        </nav>
    );
};

export default CategoryBar;