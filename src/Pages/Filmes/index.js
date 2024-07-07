import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme-info.css';
function Filmes() {

        const {id} = useParams();
        const navigate = useNavigate();
        const[filme,setFilme] = useState({}); 
        const [loading,setLoading] = useState(true);
      
        useEffect(()=> {
            async function loadFilmes() {
                await api.get(`/movie/${id}`,{
                    params:{
                        api_key: "3212ec50f0529c5037094883c8539660",
                        language: "pt-br"
                        
                    }
                })
                .then((response)=> {
                    setFilme(response.data);
                    console.log(response.data)
                    setLoading(false);

            }) 
            .catch(()=> {
                console.log("filme não encontrado")
                navigate("/",{replace: true})
                return;
               
            })

            }
            loadFilmes();
        },[]);

        function salvarFilme() {    
            const minhaLista = localStorage.getItem("galoFlix");

            let filmesSalvos = JSON.parse(minhaLista) || [];

            const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

            if (hasFilme) {
                alert("esse filme ja está na lista");
                return
            }

            filmesSalvos.push(filme);
            localStorage.setItem("galoFlix",JSON.stringify(filmesSalvos));
            alert("filme salvo com sucesso");
            }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} />
           <h3>Sinopse</h3>
           <span>{filme.overview}</span>
           

           <div className="area-buttom">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>

           </div>

        </div>
    );
}

export default Filmes;