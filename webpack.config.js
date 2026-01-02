// webpack.config.js
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const extraEntries = {
	'contact-form-modal': path.resolve( __dirname, 'src/contact-form-modal/index.tsx' ),
	'contact-form-trigger': path.resolve( __dirname, 'src/contact-form-trigger/index.tsx' ),
	'sidebar-accordion': path.resolve( __dirname, 'src/sidebar-accordion/index.tsx' ),
	insertStaffModalBlock: path.resolve( __dirname, 'src/insertStaffModalBlock.ts' ),
};

function mergeEntries( originalEntry ) {
	// originalEntry can be: object, string, array, or async function returning one of those
	if ( typeof originalEntry === 'function' ) {
		// keep async functions safe
		return async () => {
			const resolved = await originalEntry();
			return { ...( resolved || {} ), ...extraEntries };
		};
	}

	// If originalEntry is undefined, object, string, or array -> normalize to object
	if ( ! originalEntry ) {
		return { ...extraEntries };
	}

	if ( typeof originalEntry === 'string' || Array.isArray( originalEntry ) ) {
		// single unnamed entry -> convert to object so we can add named entries
		// give the original entry a name so it still compiles (preserve as 'main' if needed)
		return { main: originalEntry, ...extraEntries };
	}

	// object case: merge named entries (override any names intentionally if needed)
	return { ...originalEntry, ...extraEntries };
}

function extendConfig( cfg ) {
	const cfgCopy = { ...cfg };
	const isModuleOutput = cfg.output && cfg.output.module;

	// only add our extra entries to legacy configs (module=false)
	cfgCopy.entry = isModuleOutput
		? cfg.entry // leave module config entries untouched
		: mergeEntries( cfg.entry );

	cfgCopy.output = {
		...cfg.output,
		filename: '[name].js',
		chunkFilename: '[name].[id].js',
	};

	return cfgCopy;
}

module.exports = Array.isArray( defaultConfig )
	? defaultConfig.map( extendConfig )
	: extendConfig( defaultConfig );
