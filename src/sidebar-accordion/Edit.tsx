import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { title } = attributes;
	useEffect( () => {
		setAttributes( { accordionId: `accordion-${ clientId }` } );
	}, [ clientId, setAttributes ] );
	const blockProps = useBlockProps();
	const { innerBlocksProps, children } = useInnerBlocksProps( blockProps, {
		template: [
			[
				'core/list',
				{ attributes: { ordered: false } },
				[
					[
						'core/list-item',
						{
							placeholder: 'List item...',
							attributes: {
								fontFamily: 'var:wp|preset|font-family|body',
							},
						},
					],
				],
			],
		],
	} );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h2"
				value={ title }
				placeholder="Set a title..."
				onChange={ ( value ) => setAttributes( { title: value } ) }
				style={ {
					margin: 0,
					borderBottom: '1px solid white',
					padding: '1rem 1.25rem',
				} }
				onSplit={ () => null }
			/>
			<div
				{ ...innerBlocksProps }
				className="accordion-body"
				style={ { padding: '1rem' } }
			>
				{ children }
			</div>
		</div>
	);
}
