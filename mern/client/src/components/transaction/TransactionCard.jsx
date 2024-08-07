import { useNavigate } from "react-router-dom";


function TransactionCard({userData,userId}){
    const navigate = useNavigate();
    const handleClick = () => navigate('./TransactionManagement')
    return(
        <div className='Cards'>
            <h2>Transaction Page</h2>
            <p>Manage your transactions</p>
            <button type="button" onClick={handleClick}>Manage Transactions</button>
        </div>
    );
}

export default TransactionCard