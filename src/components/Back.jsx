import React from "react";
import { useSelector } from "react-redux";

const Back = ({ incoming }) => {
	const state = useSelector((state) => state);
	console.log(state.user.uid);
	console.log(incoming.data.userid);
    
	return (
		<div>
			{/* <p className="chat-receive">{incoming.data.message}</p> */}
			{state.user.uid === incoming.data.userid ? (
				<p className="chat__sent">
					{incoming.data.message}
				</p>
			) : (
				<p className="chat-receive">
					{incoming.data.message}
				</p>
			)}
		</div>
	);
};

export default Back;
