import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function AgentCard({userData,userId}){
    const navigate = useNavigate();
    const handleClick = () => navigate('./AgentManagement')
    return(
   
                <Card className="Cards" >
                    <h2>Agent Management</h2>
                    <p>Manage your agents list</p>
                    <button type="button" onClick={handleClick}>Manage Agents</button>
                   
                </Card>
 
    );
}

export default AgentCard