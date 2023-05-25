//libs
import { useState } from 'react'
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom';

//assets
import random_logo from '../../assets/images/random_logo.gif'
import ic_search from '../../assets/images/ic_search.svg';



const Searcher = ()=>{

  const [searchInput, setSearchInput] = useState<string>('')
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  
  return (
    <div className="searcher_wrap">
      <Link to="/" className="main_logo_wrap">
        <img className="main_logo" src={random_logo} alt="random logo" />
      </Link>
      <label htmlFor="searchInput" className={`searcher ${inputFocus && 'active'}`}>
        <input id="searchInput" className="searchInput" onFocus={()=>{setInputFocus(true)}} onBlur={()=>{setInputFocus(false)}} value={searchInput} onChange={e =>{setSearchInput(e.target.value)}} type="text" />
        <div className="ripple_wrap">
          <Ripples>
          <button type="button" className="search_button">
            <img src={ic_search} className="search_icon"></img>
          </button>
          </Ripples>
        </div>
      </label>
    </div>
  )
}

export default Searcher;