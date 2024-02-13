import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import {lazy,Suspense} from 'react'
import LayOut from './pages/LayOut';
import Loading from './components/Loading';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectComponent from './components/ProtectComponent.jsx';
import 'react-toastify/dist/ReactToastify.css';
import AdminProtectComponent from './components/AdminProtect.jsx';

function App() {
  const Home = lazy(()=> import('./pages/Home'))
  const About = lazy(()=> import('./pages/About'))
  const Cart = lazy(()=> import('./pages/Cart'))
  const SignIn = lazy(()=> import('./pages/SignIn'))
  const SignUp = lazy(()=> import('./pages/SignUp'))
  const DogProduct = lazy(()=> import('./pages/DogProduct'))
  const CatProduct = lazy(()=> import('./pages/CatProduct'))
  const CowProduct = lazy(()=> import('./pages/CowProduct'))
  const FishProduct = lazy(()=> import('./pages/FishProduct'))
  const BirdsProduct = lazy(()=> import('./pages/BirdsProduct'))
  const ReptileProduct = lazy(()=> import('./pages/ReptileProduct'))
  const AdminPage = lazy(()=> import('./pages/AdminPage'))
  const AddPetAdmin= lazy(()=> import('./components/AddPetAdmin'))
  const ViewPet = lazy(()=>import('./pages/ViewPets.jsx'))
  const UpdatePetAdmin = lazy(()=>import('./components/UpdatePetAdmin.jsx'))
  const OrdersAdmin = lazy(()=>import('./pages/OrdersAdmin.jsx'))
  const MyOrders = lazy(()=>import('./pages/MyOrders.jsx'))
  const ResetPassword = lazy(()=> import('./components/ResetPassword.jsx'))

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayOut/>}>
        <Route path='' element={<Home/>} />
        <Route path='about' element={<About/>}/>
        <Route path='cart' element={<ProtectComponent/>}>
           <Route path='' element={<Cart/>}/>
        </Route>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<ProtectComponent/>}>
         <Route path='' element={<ProfilePage/>}/>
        </Route>
        <Route path='/myorders' element={<ProtectComponent/>}>
         <Route path='' element={<MyOrders/>}/>
        </Route>
       <Route path='/dogpage' element={<ProtectComponent/>}>
          <Route path='' element={<DogProduct/>}/>
       </Route>
       <Route path='/catpage' element={<ProtectComponent/>}>
          <Route path='' element={<CatProduct/>}/>
       </Route>
       <Route path='/cowpage' element={<ProtectComponent/>}>
          <Route path='' element={<CowProduct/>}/>
       </Route>
       <Route path='/fishpage' element={<ProtectComponent/>}>
          <Route path='' element={<FishProduct/>}/>
       </Route>
       <Route path='/birdspage' element={<ProtectComponent/>}>
          <Route path='' element={<BirdsProduct/>}/>
       </Route>
       <Route path='/reptilepage' element={<ProtectComponent/>}>
          <Route path='' element={<ReptileProduct/>}/>
       </Route>
       <Route path='/admin' element={<AdminProtectComponent/>}>
          <Route path='' element={<AdminPage/>}/>
       </Route>
       <Route path='/admin/addpet' element={<AdminProtectComponent/>}>
          <Route path='' element={<AddPetAdmin/>}/>
       </Route>
       <Route path='/admin/viewpets' element={<AdminProtectComponent/>}>
          <Route path='' element={<ViewPet/>}/>
       </Route>
       <Route path='/admin/updatepet/:id' element={<AdminProtectComponent/>}>
          <Route path='' element={<UpdatePetAdmin/>}/>
       </Route>
       <Route path='/admin/orders' element={<AdminProtectComponent/>}>
          <Route path='' element={<OrdersAdmin/>}/>
       </Route>
      </Route>
    )
  )
  return (
    <>
     <Suspense fallback={<Loading/>}>
     <RouterProvider router={router}/>
     </Suspense>
    </>
  );
}

export default App;