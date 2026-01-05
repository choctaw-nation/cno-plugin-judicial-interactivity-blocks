import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

const lockNamespace = 'choctaw-judicial/contact-form-email';

export default function useEmailValidation( emailAddress?: string ) {
	const [ helpText, setHelpText ] = useState( '' );
	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	function isValidEmail( email?: string ) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
			String( email ?? '' ).trim()
		);
	}

	useEffect( () => {
		if ( ! emailAddress ) {
			lockPostSaving( lockNamespace );
			setHelpText( 'Email is required before saving.' );
		} else if ( ! isValidEmail( emailAddress ) ) {
			lockPostSaving( lockNamespace );
			setHelpText( 'Please enter a valid email address.' );
		} else {
			unlockPostSaving( lockNamespace );
			setHelpText( '' );
		}
		return () => {
			unlockPostSaving( lockNamespace );
		};
	}, [ emailAddress, lockPostSaving, unlockPostSaving ] );

	return { helpText, isValidEmail };
}
