export const SearchHistory = ({ history, onSelectTerm, onClearHistory }) => {
	if (!history.length) {
		return null;
	}

	return (
		<section className="search-history">
			<div className="section-head">
				<h2>Recent Searches</h2>
				<button type="button" className="text-btn" onClick={onClearHistory}>
					Clear
				</button>
			</div>
			<div className="chip-wrap">
				{history.map((term) => (
					<button
						key={term}
						type="button"
						className="history-chip"
						onClick={() => onSelectTerm(term)}
					>
						{term}
					</button>
				))}
			</div>
		</section>
	);
};
