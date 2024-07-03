import {useState, useEffect} from 'react'
import {  useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useAuth } from '../AuthContext';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { updateLoginStatus } = useAuth();
    const [cookies, setCookie] = useCookies(['users']);

    const NotifySuccess = () => toast.success("Successfully logged in!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    const NotifyFail = () => toast.error("Login Failed",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/login',{email, password})
            console.log(response);
            if (response.data.success){
                const TOKEN = await axios.post(`http://localhost:5000/session/${response.data.id}`)
                const token = TOKEN.data.data.token;
                setCookie('user', token, {path: '/'});
                //console.log('This is the BIG',TOKEN)
                //console.log('This is the small',token)
                updateLoginStatus(true);
                NotifySuccess();
                navigate('/AdminHomePage')
                
            }else {
                NotifyFail();
                updateLoginStatus(false);
                navigate('/unauthorized');
            }
        } catch (error) {
            console.log(error);
            updateLoginStatus(false);
            navigate('/unauthorized');
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email'  
                        name='email' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' name='password' 
                        className='form-control rounded-0'  onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                    <p></p>
                    <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</button>
                </form>
                
            </div>
        </div>
    )
}

export default Login