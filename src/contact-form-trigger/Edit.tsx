import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	ExternalLink,
	Tip,
	PanelBody,
	TextControl,
	Flex,
	FlexBlock,
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import useEmailValidation from './hooks/useEmailValidation';

export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, emailAddress } = attributes;
	const [ email, setEmail ] = useState( emailAddress || '' );
	const { helpText, isValidEmail } = useEmailValidation( email );

	const blockProps = useBlockProps();

	function handleChange( newEmail: string ) {
		if ( isValidEmail( newEmail ) || '' === newEmail ) {
			setAttributes( { emailAddress: newEmail } );
		}
		setEmail( newEmail );
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<Flex direction="column" gap={ 4 }>
						<FlexBlock>
							<Tip>
								This form appears as a modal and is powered by
								Gravity Forms. If you need to make changes to
								the form fields or settings,{ ' ' }
								<ExternalLink href="/wp-admin/admin.php?page=gf_edit_forms&id=2">
									use this form.
								</ExternalLink>
							</Tip>
						</FlexBlock>
						<FlexBlock>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label="Staff Email Address"
								value={ email }
								onChange={ handleChange }
								help={ helpText }
								type="email"
							/>
						</FlexBlock>
					</Flex>
				</PanelBody>
			</InspectorControls>
			<RichText
				{ ...blockProps }
				allowedFormats={ [] }
				value={ buttonText }
				onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
				tagName="button"
				type="button"
				placeholder="Contact Form"
			/>
		</Fragment>
	);
}
