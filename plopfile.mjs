export default function (plop) {
	// Component generator
	plop.setGenerator('component', {
		description: 'Component scaffolding',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'Name of the new component',
			},
		], // array of inquirer prompts
		actions: [
			{
				type: 'addMany',
				destination: 'src/components/{{ properCase componentName }}/',
				base: '__generators__/component/',
				templateFiles: '__generators__/component/*.*',
			},
		], // array of actions
	});

	//
	plop.setHelper(
		'capitalizeFirst',
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1),
	);
}
