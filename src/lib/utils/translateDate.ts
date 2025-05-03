function translateDate(date: string | Date): string {
	return new Date(date).toLocaleDateString('no-nb', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}

export default translateDate;
