import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Tip } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const { isVisible, closeWithBackdropClick, allowBodyScrollWhileOpen } =
		attributes;
	const blockProps = useBlockProps();

	return (
		<Fragment>
			<InspectorControls>
				<Tip>
					This block (and the related staff contact form block) are
					directly tied to this gravity form. Do not switch it!
				</Tip>
				<PanelBody title="Meta Settings">
					<ToggleControl
						__nextHasNoMarginBottom
						label="Show Internals"
						checked={ isVisible }
						onChange={ ( value ) =>
							setAttributes( { isVisible: value } )
						}
						help="Toggle the visibility of the modal's Inner Blocks in the editor."
					/>
				</PanelBody>
				<PanelBody title="Modal Settings">
					<ToggleControl
						__nextHasNoMarginBottom
						label="Close Modal on Backdrop Click"
						checked={ closeWithBackdropClick }
						onChange={ ( value ) =>
							setAttributes( { closeWithBackdropClick: value } )
						}
						help="Allow users to close a modal by clicking on the backdrop."
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label="Allow Body Scroll While Modal is Open"
						checked={ allowBodyScrollWhileOpen }
						onChange={ ( value ) =>
							setAttributes( { allowBodyScrollWhileOpen: value } )
						}
						help="Allow users to scroll the body content while the modal is open."
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ isVisible ? (
					<InnerBlocks allowedBlocks={ [ 'gravityforms/form' ] } />
				) : (
					<Fragment>
						<h3
							style={ {
								fontSize: 'var(--wp--preset--font-size--sm)',
							} }
						>
							Staff Contact Form Modal
						</h3>
						<Tip>
							This block (and the related staff contact form
							block) are directly tied to this gravity form. Do
							not switch it!
						</Tip>
					</Fragment>
				) }
			</div>
		</Fragment>
	);
}
