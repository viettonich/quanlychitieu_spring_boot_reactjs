import React, { Component } from 'react';
import {Link } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-consumption">Thêm mới</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Tìm kiếm</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/report">Thống kê</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Menu;