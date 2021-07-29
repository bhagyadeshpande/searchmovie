import React from "react";
import { useState } from "react";

export default function FindMovie(){
  
  const[query,setQuery] = useState('')
  const[movies,setMovies] = useState([])
  const findMovie = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=7bf7d73e0e0bbabb10856bcc1fab39ff&query=${query}`
    try{
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  }
  catch(error){
    console.log(error);
  }
  }
  return(    
    <>
      <form className="form" onSubmit={findMovie}>
      <input className="input" type="text" name="query" placeholder="type the movie name"
      value={query} onChange={(e)=>setQuery(e.target.value)} />
      <button type ="submit" className="searchButton">Search</button>
      </form>   
      <div className="card-list">
      {movies.filter(movie=>movie.poster_path).map(movie=>
        <div className="card" key={movie.id}>
       <img className="card-img" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
       alt = {movie.title + 'poster'} />  
       <div className="card-details">
         <h2 className="card-title">{movie.title}</h2>
         <p>Release Date: {movie.release_date}</p>
         <p>Rating: {movie.vote_average}</p>
         <p className="description">{movie.overview}</p>
         </div>       
        </div> ) }       
      </div> 
      </>
  )
}

