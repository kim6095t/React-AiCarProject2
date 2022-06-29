import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Loading from "../routers/Loading";
import Machinelearning from "../routers/Machinelearning"


function Routers() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Loading />} />
                <Route exact path="/machinelearning" element={<Machinelearning />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;