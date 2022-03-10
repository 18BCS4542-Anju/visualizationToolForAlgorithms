export default {
    mount: {
        public: { url: '/', static: true },
        src: '/dist',
    },
    plugins: ['@snowpack/plugin-sass'],
};
