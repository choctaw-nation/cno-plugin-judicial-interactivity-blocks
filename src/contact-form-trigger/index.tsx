import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { button } from '@wordpress/icons';
import metadata from './block.json';

import Edit from './Edit';
import './style.scss';

registerBlockType( metadata.name, {
	icon: button,
	edit: Edit,
	save: ( { attributes } ) => (
		<RichText.Content
			{ ...useBlockProps.save() }
			tagName="button"
			type="button"
			data-wp-bind--disabled="state.isModalOpen"
			data-wp-interactive="staffContactForm"
			data-wp-on--click="actions.openModal"
			data-wp-context={ JSON.stringify( {
				staffEmail: attributes.emailAddress,
			} ) }
			value={ attributes.buttonText || 'Contact Form' }
		/>
	),
} );
