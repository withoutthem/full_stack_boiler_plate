//libs
import { useState } from 'react'
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//assets
import random_logo from '../../assets/images/random_logo.gif'
import ic_search from '../../assets/images/ic_search.svg';



const Searcher = ()=>{

  const [searchInput, setSearchInput] = useState<string>('')
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  
  const navigate = useNavigate();
  
  const searchClickQuery = (e:React.FormEvent)=>{
    e.preventDefault();
    navigate(`/all_products?searchparams=${searchInput}`)
  }

  return (
    <div className="searcher_wrap">
      <Link to="/" className="main_logo_wrap">
        <img className="main_logo" src={random_logo} alt="random logo" />
      </Link>
      <form action="GET" onSubmit={e=>{searchClickQuery(e)}}>
      <label htmlFor="searchInput" className={`searcher ${inputFocus && 'active'}`}>
        <input id="searchInput" className="searchInput" onFocus={()=>{setInputFocus(true)}} onBlur={()=>{setInputFocus(false)}} value={searchInput} onChange={e =>{setSearchInput(e.target.value)}} type="text" />
        <div className="ripple_wrap">
          <Ripples>
          <button type="submit" className="search_button">
            <img src={ic_search} className="search_icon"></img>
          </button>
          </Ripples>
        </div>
      </label>
      </form>
    </div>
  )
}

export default Searcher;