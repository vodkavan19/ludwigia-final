import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import * as Views from '~/views';
import ClientLayout from '~/views/client/Layout';
import AdminLayout from '~/views/admin/Layout';

function App() {
    return (
        <div className='App'>  
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Views.HomePage />} />

                    <Route element={<ClientLayout />}>
                        <Route path='/introduction' element={<Views.IntroPage />} />
                        <Route path='/genus/:id' element={<Views.GenusPage />} />
                        <Route path='/species/:id' element={<Views.SpeciesPage />} />
                    </Route>

                    <Route element={<AdminLayout />}>
                        <Route path='/admin/' element={<Views.Dashboard />} />
                        <Route path='/admin/user' element={<Views.UserManager />} />
                        <Route path='/admin/genus' element={<Views.GenusManager />} />
                        <Route path='/admin/species' element={<Views.SpeciesManager />} />
                        <Route path='/admin/species/:id' element={<Views.AddEditSpecies />} />
                        <Route path='/admin/species/add' element={<Views.AddEditSpecies />} />
                        <Route path='/admin/species/edit/:id' element={<Views.AddEditSpecies />} />
                    </Route>

                    <Route path='/admin/login' element={<Views.Login />} />
                    <Route path='/admin/reset_password/:id/:token' element={<Views.ResetPassword />} />
                    <Route path='/admin/reset_password' element={<Views.ResetPassword />} />

                    <Route path='/internal-server-error' element={<Views.Error500 />} />
                    <Route path='*' element={<Views.NotFound />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
