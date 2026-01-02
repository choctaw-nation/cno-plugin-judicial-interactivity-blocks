import { store } from '@wordpress/interactivity';

export type LocalContext = {
	staffEmail: string;
};
// Hook into Contact Form Modal store
store( 'staffContactForm' );
