function slugify(name: string) {
	return name
		.toLowerCase()
		.replaceAll(' ', '-')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

export default slugify;
