import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticateAtom, cartAtom } from '../Atom'
import { TextField } from '@mui/material'

const Navbar = () => {
  const[authenticate, setAuthenticate] = useRecoilState(authenticateAtom)
  const[cart] = useRecoilState(cartAtom)

  const menuList = [
    '여성',
    'Divided',
    '남성', 
    '신생아/유아',
    '아동', 
    'Hmm Home', 
    'Sale', 
    '지속가능성'
  ]
  const navigte = useNavigate()
  const goToLogin = () => {
    if(!authenticate) {
      navigte('/login')
    }
    else {
      setAuthenticate(!authenticate)
    }
  }
  const search = (event) => {
    if(event.key === 'Enter') {
      // 입력한 검색어를 읽어와서
      let keyword = event.target.value
      // url을 바꿔준다 (url을 경유한다)
      navigte(`/?q=${keyword}`)
    }
  }
  const {pathname} = useLocation()
  return (
    <div className={pathname === "/" ? "nav-bar nav-bar-padding" : "nav-bar-auth"}>
      <div>
        <div className="login-button" onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <div>{authenticate ? "로그아웃" :"로그인"}</div>
          {authenticate && 
            <Link to="/cart" className="link-style cart-link-style"> 
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              <span className="cart-span">장바구니</span> 
              <div className="cart-count">{cart.length}</div> 
            </Link>
          }
        </div>
      </div>
      <div className="nav-section">
        <img width={100} src="/PIC/로고2.png" onClick={() => navigte("/")} />
      </div>
      <div className="menu-area">
        <ul className="menu-list hide">
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </ul>
        <div className="search-input-space hide"></div>
        <div className="search-input-div">
          <div>
            <TextField
              id="standard-search"
              label="제품검색 (Enter)"
              type="search"
              variant="standard"
              onKeyPress={(event) => search(event)}
              className="search-input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar