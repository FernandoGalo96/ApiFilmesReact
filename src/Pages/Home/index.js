import { useEffect,useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

function Home() {

    const [filmes,setFilmes] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(()=> {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "3212ec50f0529c5037094883c8539660",
                    language: "pt-br",
                    page: 1,
                }
            })
            //console.log(response.data.results.slice(0,10))    

                setFilmes(response.data.results.slice(0,10));
                setLoading(false);
        }
        loadFilmes();

    },[ ])

    if(loading) {
        return (
            <div>
                <h2 className="loading">Carregando Filmes...</h2>
            </div>
        );
    }

    return (
        <div className="container"> 
            <div className="lista-filmes">
                    {filmes.map((filmes)=>{
                        return (
                            <article key={filmes.id}>
                                <strong>{filmes.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`} alt={filmes.title}/>
                                <Link to={`/filmes/${filmes.id}`}>Acessar</Link>
                            </article>
                        );
                    })}

            </div>
        </div>
    );
}

export default Home;