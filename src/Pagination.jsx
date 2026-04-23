export const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="pagination-wrap">
			<button type="button" onClick={onPrev} disabled={currentPage === 1}>
				Previous
			</button>
			<p>
				Page {currentPage} of {totalPages}
			</p>
			<button type="button" onClick={onNext} disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	);
};
