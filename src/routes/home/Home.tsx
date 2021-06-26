import wink from "assets/wink.png";
import { useStoreActions } from "easy-peasy";

const Home = () => {
	const clearAuthToken = useStoreActions(
		(actions: any) => actions.auth.clearAuthToken
	);

	return (
		<div className="home-container">
			<div className="header d-flex align-items-center">
				<h6 className="title6">
					2FA by <span className="color-pink">TeamX</span>
				</h6>
				<div className="ml-auto">
					<ul className="d-flex align-items-center">
						<li onClick={() => clearAuthToken()}>
							<button className="btn btn--secondary btn--logout">Logout</button>
						</li>
					</ul>
				</div>
			</div>
			<div className="section-container d-flex align-items-center justify-content-center">
				<p className="color-white main-content">
					<span className="color-pink">Hello World!</span>
					<br />
					Logged in successfully
					<br />
					<img src={wink} alt="" />
				</p>
			</div>
		</div>
	);
};

export default Home;
