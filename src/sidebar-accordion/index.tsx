import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import metadata from './block.json';

import Edit from './Edit';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: ( { attributes: { title, accordionId } } ) => {
		const blockProps = useBlockProps.save( {
			className: 'accordion accordion-flush',
			id: accordionId,
		} );
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save( {
				id: `${ accordionId }-menu`,
				className: 'accordion-collapse collapse',
				'data-wp-class--show': 'context.isMenuOpen',
				'data-wp-aria--expanded': 'context.isMenuOpen',
				'data-wp-bind--hidden': '!context.isMenuOpen',
			} );
		return (
			<div { ...blockProps } data-wp-interactive="cno/sidebar-accordion" data-wp-context={ JSON.stringify( { isMenuOpen: true } ) } data-wp-on-window--resize="callbacks.updateToggleState"
				data-wp-on-document--load="callbacks.updateToggleState">
				<div className="accordion-item text-bg-primary">
					<h2 className="accordion-header">
						<RichText.Content
							className="fs-3 accordion-button text-bg-primary"
							data-wp-bind--aria-expanded="context.isMenuOpen"
							data-wp-on--click="actions.toggleMenu"
							aria-controls={ `${ accordionId }-menu` }
							tagName="button"
							role="button"
							value={ title }
						/>
					</h2>
				</div>
				<div { ...innerBlocksProps }>
					<div className="accordion-body">{ children }</div>
				</div>
			</div>
		);
	},
} );

const blockStyles = [
	{
		name: 'sidebar-accordion',
		label: 'Styled',
		isDefault: true,
	},
	{
		name: 'list-unstyled',
		label: 'Unstyled',
	},
];
blockStyles.forEach( ( { name, label, isDefault = false } ) => {
	registerBlockStyle( metadata.name, {
		name,
		label,
		isDefault,
	} );
} );
