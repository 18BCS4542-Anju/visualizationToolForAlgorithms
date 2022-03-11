export default {
	mount: {
		public: { url: '/', static: true },
		src: '/dist',
	},
	plugins: [
		'@snowpack/plugin-sass',
		[
			'@snowpack/plugin-run-script',
			{
				cmd: 'eslint src --ext .js,.jsx,.ts,.tsx',
				watch: 'esw -w --clear src --ext .js,.jsx,.ts,.tsx',
			},
		],
	],
};
