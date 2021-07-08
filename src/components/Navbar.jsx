import React from 'react'
import "../styles/Navbar.css"
import Button from '@material-ui/core/Button'
import {auth } from "../firebase"
import firebase from "firebase"
import { useDispatch } from 'react-redux'

const Navbar = () => {


    const dispatch = useDispatch()

    const logOut  =()=>{
        firebase.auth().signOut().then(() => {
            dispatch({type:"FAILURE"})
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }


    return (
        <div className="navbar">
            <div className="navbar__left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png" alt="" />
            </div>
            <div className="navbar__middle">
                <input type="text" placeholder="Search" />
            </div>
            <div className="navbar__right">
                <Button onClick={logOut} variant="contained" color="secondary">
                  Logout
                </Button>
            </div>
        </div>
    )
}

export default Navbar
