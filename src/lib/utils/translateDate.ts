function translateDate(date: string): string {
	return new Date(date).toLocaleDateString('en-UK', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}

export default translateDate;
