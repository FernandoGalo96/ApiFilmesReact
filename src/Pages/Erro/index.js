import { Link } from "react-router-dom";
import './erro.css';
function Erro() {
    return (
        <div className="not-found">
            <h1>404 Ops! A página não foi encontrada!</h1>
            <Link to="/"> Veja TODOS os filmes!</Link>

        </div>
    );
}

export default Erro;