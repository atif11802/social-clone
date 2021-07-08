import { Button, Input, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import firebase from "firebase";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const Login = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();


	

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
			
				dispatch({type:"SUCCESS",payload:authUser})
				setUser(authUser);
			} else {
				dispatch({type:"FAILURE",payload:null})
				setUser(null);
			}
		});
		return () => {
			//perform clean action;
			unsubscribe();
		};
	}, [user, username]);

	const signUp = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));
		setOpen(false);
	};



	
	const login =(e)=>{
		e.preventDefault();
		firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
	}









	var provider = new firebase.auth.FacebookAuthProvider();

	const fbLogin = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				// /** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// The signed-in user info.
				var user = result.user;

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				var accessToken = credential.accessToken;
				// console.log(credential, user, accessToken);

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				console.log(
					errorCode,
					errorMessage,
					email,
					credential
				);

				// ...
			});
	};

	return (
		<div className="login">
			<div className="login__form">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
					alt=""
				/>

				<form>
					<TextField
						onChange={(
							e
						) =>
							setEmail(
								e
									.target
									.value
							)
						}
						id="filled-basic"
						label="Email"
						variant="filled"
					/>
					<TextField
					onChange={(
						e
					) =>
						setPassword(
							e
								.target
								.value
						)
					}
						id="filled-password-input"
						label="Password"
						type="password"
						variant="filled"
					/>
					<Button
						onClick={login}
						type="submit"
						variant="contained"
					>
						Log In
					</Button>
				</form>
				<div className="login__or">
					<h4>OR</h4>
				</div>
				<div onClick={fbLogin} className="login__fb">
					<FacebookIcon />
					<h4>Log In With Facebook</h4>
				</div>
				<div className="login__forgotPassword">
					<p>Forgot Password?</p>
				</div>

				<div className="login__signUp">
					<p>
						Don't Have An Account?
						<span onClick={handleOpen}>
							{" "}
							Sign Up
						</span>
					</p>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<div
								className={
									classes.paper
								}
							>
								<form className="login__signup">
									<center>
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
											className="login__Image"
											alt="Instagram"
										/>
									</center>
									<Input
										placeholder="username"
										type="text"
										value={
											username
										}
										onChange={(
											e
										) =>
											setUsername(
												e
													.target
													.value
											)
										}
									/>
									<Input
										placeholder="email"
										type="text"
										value={
											email
										}
										onChange={(
											e
										) =>
											setEmail(
												e
													.target
													.value
											)
										}
									/>
									<Input
										placeholder="password"
										type="password"
										value={
											password
										}
										onChange={(
											e
										) =>
											setPassword(
												e
													.target
													.value
											)
										}
									/>

									<Button
										type="submit"
										onClick={
											signUp
										}
									>
										Sign
										UP
									</Button>
								</form>
							</div>
						</Fade>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default Login;
