import { subscribe, select, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import domReady from '@wordpress/dom-ready';

const STAFF_BLOCK = 'cno/staff-contact-form';
const MODAL_BLOCK = 'cno/staff-contact-modal';

let isHandlingChange = false;
domReady( () => {
	subscribe( () => {
		if ( isHandlingChange ) {
			return;
		}

		const blocks = select( blockEditorStore ).getBlocks();
		const hasStaff = findBlock( blocks, STAFF_BLOCK );
		const hasModal = findBlock( blocks, MODAL_BLOCK );
		if ( hasModal && ! hasStaff ) {
			// If the modal exists but there are no staff blocks, remove the modal
			const modalBlock = findBlock( blocks, MODAL_BLOCK );
			if ( modalBlock ) {
				isHandlingChange = true;
				dispatch( blockEditorStore ).removeBlock( modalBlock );
				isHandlingChange = false;
			}
			return;
		}
		if ( ! hasStaff || hasModal ) {
			return;
		}

		try {
			isHandlingChange = true;
			const superModalBlock = createBlock(
				MODAL_BLOCK,
				{
					gravityFormsId: 2,
					isVisible: false,
				},
				[
					createBlock( 'gravityforms/form', {
						formId: '2',
						title: false,
						description: false,
						ajax: true,
						inputBorderRadius: '0',
						inputPrimaryColor: '#D3BC8D',
						labelFontSize: '16',
						descriptionFontSize: '18',
						buttonPrimaryBackgroundColor: '#D3BC8D',
						buttonPrimaryColor: '#101820',
					} ),
				]
			);
			dispatch( blockEditorStore ).insertBlock(
				superModalBlock,
				1,
				blocks[ 0 ].innerBlocks[ 1 ].clientId
			);
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.error( err );
			return;
		} finally {
			isHandlingChange = false;
		}
	} );
} );

/**
 * Recursively search an array of block objects (and inner blocks) for a block of a given type
 *
 * @param blockList An array of block objects
 * @param blockType the name of the block to find
 * @return the clientId of the found block, or false if not found
 */
function findBlock( blockList: any[], blockType: string ): string | false {
	if ( ! blockList || blockList.length === 0 ) {
		return false;
	}
	for ( const block of blockList ) {
		if ( block.name === blockType ) {
			return block.clientId;
		}
		if ( block.innerBlocks?.length > 0 ) {
			const found = findBlock( block.innerBlocks, blockType );
			if ( found ) {
				return found;
			}
		}
	}
	return false;
}
