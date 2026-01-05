import { store, getContext } from '@wordpress/interactivity';
const BSBreakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
};

const { actions } = store( 'cno/sidebar-accordion', {
	actions: {
		toggleMenu() {
			const context = getContext();
			context.isMenuOpen = ! context.isMenuOpen;
		},
		closeMenu() {
			const context = getContext();
			context.isMenuOpen = false;
		},
		openMenu() {
			const context = getContext();
			context.isMenuOpen = true;
		},
	},
	callbacks: {
		updateToggleState() {
			if ( window.innerWidth < BSBreakpoints.lg ) {
				actions.closeMenu();
			} else {
				actions.openMenu();
			}
		},
	},
} );
