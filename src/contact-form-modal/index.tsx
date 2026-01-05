import { registerBlockType } from '@wordpress/blocks';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

import Edit from './Edit';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: ( { attributes } ) => (
		<>
			<span
				hidden
				data-wp-interactive="staffContactForm"
				data-wp-watch="callbacks.syncDialog"
				data-wp-init="callbacks.initModal"
				data-wp-context={ JSON.stringify( {
					closeWithBackdropClick: attributes.closeWithBackdropClick,
					allowBodyScrollWhileOpen:
						attributes.allowBodyScrollWhileOpen,
				} ) }
			/>
			<dialog
				{ ...useBlockProps.save( {
					id: 'contactFormModal',
				} ) }
			>
				<div className="wp-block-cno-staff-contact-modal__header">
					<h1
						className="wp-block-cno-staff-contact-modal__title fs-5"
						id="contactFormModalLabel"
					>
						Contact Us
					</h1>
					<button
						type="button"
						className="btn-close"
						aria-label="Close"
					/>
				</div>
				<div
					className="wp-block-cno-staff-contact-modal__body"
					{ ...useInnerBlocksProps.save() }
				/>
			</dialog>
		</>
	),
} );
