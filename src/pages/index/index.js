const layoutsStyles = require.context('../../layouts', true, /\.scss$/);
layoutsStyles.keys().forEach(layoutsStyles);

const pagesStyles = require.context('../../pages', true, /\.scss$/);
pagesStyles.keys().forEach(pagesStyles);

const modules = require.context('../../pages', true, /(.[^\/]+)\/(.[^\/]+)(\.js$)/); // <= chooses only in pages folder // /\.js$/);
modules.keys().forEach(modules);
