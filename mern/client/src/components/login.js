import {useState, useEffect} from 'react'
import {  useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useAuth } from '../AuthContext';
import ToastComponent from './Toasts';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const navigate = useNavigate();
    const { updateLoginStatus } = useAuth();

    useEffect(() => {
        return () => {
          setShowToast(false);
        };
     }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/login',{email, password})
            console.log(response);
            if (response.data.success){
                setToastMessage('Successful Login.');
                setToastType('success');
                setShowToast(true);
                updateLoginStatus(true);
                navigate('/')
            }else {
                setToastMessage('Login Failed.');
                setToastType('danger');
                setShowToast(true);
                updateLoginStatus(false);
                navigate('/unauthorized');
            }
        } catch (error) {
            setToastMessage('Login Failed.');
            setToastType('danger');
            setShowToast(true);
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
            <ToastComponent show={showToast} message={toastMessage} variant={toastType} />
        </div>
    )
}

export default Login