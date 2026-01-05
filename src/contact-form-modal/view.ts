import { store, getContext, withScope } from '@wordpress/interactivity';
import type { LocalContext as TriggerContext } from '../contact-form-trigger/view';

type LocalContext = {
	closeWithBackdropClick: boolean;
	allowBodyScrollWhileOpen: boolean;
};

const { state, actions, callbacks } = store( 'staffContactForm', {
	state: {
		isModalOpen: false,
		staffEmail: '',
		formSubmitted: false,
		modal: null as HTMLDialogElement | null,
	},
	actions: {
		openModal() {
			if ( ! state.modal ) {
				return;
			}
			state.isModalOpen = true;
			state.modal.showModal();
			const context = getContext< LocalContext & TriggerContext >();
			callbacks.toggleBodyScroll();
			if ( context.staffEmail ) {
				state.staffEmail = context.staffEmail;
				const staffInputField = state.modal.querySelector(
					'#input_2_4'
				) as HTMLInputElement;
				if ( staffInputField ) {
					staffInputField.value = state.staffEmail;
				}
			}
		},

		closeModal() {
			if ( ! state.modal ) {
				return;
			}
			state.isModalOpen = false;
			state.modal.close();
			callbacks.toggleBodyScroll();
			const form = state.modal.querySelector(
				'#gform_2'
			) as HTMLFormElement;
			if ( form ) {
				form.reset();
			}
		},
	},
	callbacks: {
		/**
		 * Add modal to state when elements are ready
		 */
		initModal() {
			const dialog = document.getElementById(
				'contactFormModal'
			) as HTMLDialogElement;
			if ( dialog ) {
				state.modal = dialog;
				callbacks.configCloseOnBackdropClick();
				const closeButton = dialog.querySelector(
					'.btn-close'
				) as HTMLButtonElement;
				if ( closeButton ) {
					closeButton.addEventListener(
						'click',
						withScope( actions.closeModal )
					);
				}
			}
		},

		/**
		 * Sync dialog to state on load/state change
		 */
		syncDialog() {
			if ( ! state.modal ) {
				return;
			}
			if ( state.isModalOpen ) {
				actions.openModal();
			} else {
				actions.closeModal();
			}
		},

		toggleBodyScroll() {
			const { allowBodyScrollWhileOpen } = getContext<
				LocalContext & TriggerContext
			>();
			if ( false === allowBodyScrollWhileOpen ) {
				document.body.style.overflow = state.isModalOpen
					? 'hidden'
					: '';
			}
		},

		configCloseOnBackdropClick() {
			const { closeWithBackdropClick } = getContext<
				LocalContext & TriggerContext
			>();
			if ( state.modal && closeWithBackdropClick ) {
				state.modal.addEventListener(
					'click',
					withScope( ( event ) => {
						if (
							state.modal &&
							state.modal.open &&
							state.modal === event.target
						) {
							actions.closeModal();
						}
					} )
				);
			}
		},
	},
} );
