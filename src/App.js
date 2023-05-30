import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar,Homepage, Cryptocurrencies,CryptoDetails,News,Exchanges } from "./components";
import './App.css';
const App = () => {
    return (
        <>
            <div className="app">
                <div className="navbar">
                    <Navbar />
                </div>
                <div className="main">
                    <Layout>
                            <div className="routes">
                                <Routes>
                                    <Route exact path="/" element={<Homepage/>}>
                                    </Route>
                                    <Route exact path="/exchanges" element={<Exchanges/>}>
                                        
                                    </Route>
                                    <Route exact path="/cryptocurrencies" element={<Cryptocurrencies/>}>
                                        
                                    </Route>
                                    <Route exact path="/crypto/:cryptoId" element={<CryptoDetails/>}>
                                        
                                    </Route>
                                    <Route exact path="/news" element={ <News/>}>
                                    
                                    </Route>
                                </Routes>
                            </div>
                    </Layout>
                </div>
                <div className="footer" >

                </div>
            </div>
        </>
    );
};

export default App;
