import axios from "axios";

function Logout(){
    axios.post('http://localhost/dev-diaries/Backend/authentication/logout.php')
    .then((response)=> {
        sessionStorage.clear();
        window.location.href = '/login';
    })
    .catch((error) => { 
        console.error(error);
    });
}

export default Logout;