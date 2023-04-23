import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TablePage from './modules/table/pages/TablePage'

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<TablePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers