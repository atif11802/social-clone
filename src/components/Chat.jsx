import React, { useState, useEffect } from "react";
import "../styles/Chat.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";
import Back from "./Back";
import firebase from "firebase";
import { useSelector } from "react-redux";

const Chat = () => {

	const [message, setMessage] = useState();
	const [incomings, setIncomings] = useState([]);

	const state = useSelector((state) => state);

   
	const Messaging = (e) => {
		e.preventDefault();
		console.log("hello");

		if (message) {
			db.collection("messages").add({
				message: message,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				userid: state.user.uid,
			});
            setMessage("")
			document.getElementById("create-course-form").reset();
		}
	};

	useEffect(() => {
		const cleanUp = db
			.collection("messages")
            .orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setIncomings(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return () => {
			cleanUp();
		};
	}, []);

	console.log(incomings);
    

	return (
		<div className="chat">
			<div className="chat_field">
				{incomings
					? incomings.map((incoming) => (
							<Back
								incoming={
									incoming
								}
							/>
					  ))
					: ""}
			</div>
			<form id="create-course-form" className="chat__form">
				<input
					value={message}
					onChange={(e) =>
						setMessage(e.target.value)
					}
					className="chat__input"
					type="text"
					placeholder="message"
				/>
				<button onClick={Messaging} type="submit">
					send
				</button>
			</form>
		</div>
	);
};

export default Chat;
