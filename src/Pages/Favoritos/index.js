import React from "react";
import { useEffect,useState } from "react";
import './favoritos.css';
import {Link} from "react-router-dom";

function Favoritos () {
    const[filme,setFilmes] = useState([]);

    useEffect(()=>{
        const pegaFilmes = localStorage.getItem("galoFlix");
        setFilmes(JSON.parse(pegaFilmes) || []);
    },[])

    function excluirFilme (id) {
        let filtroFilme = filme.filter((item)=> {
            return (
                item.id != id
            )
            
        })
        setFilmes(filtroFilme);
        localStorage.setItem("galoFlix",JSON.stringify(filtroFilme))

    }


    return(
        <div className="meus-filmes">
            <h1> Meus filmes favoritos:</h1>
            {filme.length === 0 && <span>VOCÊ NÃO POSSUI NENHUM FILME SALVO</span>}
            <ul>
               {filme.map((filme)=> {
                return(
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filmes/${filme.id}`}> Ver detalhes</Link>
                            <button onClick={()=> excluirFilme(filme.id)}>Excluir</button>

                        </div>
                        

                    </li>
                );
               })}
            </ul>

        </div>
    );
}

export default Favoritos;