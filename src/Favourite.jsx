export const Favourite = ({ count, showOnly, onToggleShowOnly }) => {
	return (
		<section className="favourite-panel">
			<p>
				Favourites: <strong>{count}</strong>
			</p>
			<button type="button" className="toggle-btn" onClick={onToggleShowOnly}>
				{showOnly ? "Show All" : "Show Favourites"}
			</button>
		</section>
	);
};
