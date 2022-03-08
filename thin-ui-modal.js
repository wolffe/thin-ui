'use strict';

class SimpleModal {

    constructor(modalTitle, modalText, acceptText, cancelText) {
        this.modalTitle = modalTitle || 'Hello world!';
        this.modalText = modalText || 'Are you sure you want to do this?';
        this.acceptText = acceptText || 'Yes';
        this.cancelText = cancelText || 'No';

        this.parent = document.body;

        this.modal = undefined;
        this.acceptButton = undefined;
        this.cancelButton = undefined;
        this.closeButton = undefined;

        this._createModal();
    }

    question() {
        return new Promise((resolve, reject) => {
            if (!this.modal || !this.acceptButton || !this.cancelButton || !this.closeButton) {
                reject('There was a problem creating the modal window!');
                return;
            }
            this.acceptButton.focus();

            this.acceptButton.addEventListener('click', () => {
                resolve(true);
                this._destroyModal();
            });

            this.cancelButton.addEventListener('click', () => {
                resolve(false);
                this._destroyModal();
            });

            this.closeButton.addEventListener('click', () => {
                resolve(null);
                this._destroyModal();
            })
        })
    }

    _createModal() {
        // Background dialog
        this.modal = document.createElement('dialog');
        this.modal.classList.add('thin-ui-modal-dialog');
        this.modal.show();

        // Message window
        const window = document.createElement('div');
        window.classList.add('thin-ui-modal-window');
        this.modal.appendChild(window);

        // Title
        const title = document.createElement('div');
        title.classList.add('thin-ui-modal-title');
        window.appendChild(title);

        // Title text
        const titleText = document.createElement('div');
        titleText.textContent = this.modalTitle;
        title.appendChild(titleText);

        // Close
        this.closeButton = document.createElement('button');
        this.closeButton.type = 'button';
        this.closeButton.innerHTML = '&times;';
        this.closeButton.classList.add('thin-ui-modal-close');
        title.appendChild(this.closeButton);

        // Main text
        const text = document.createElement('div');
        text.classList.add('thin-ui-modal-text');
        text.textContent = this.modalText;
        window.appendChild(text);

        // Accept and cancel button group
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('thin-ui-modal-button-group');
        window.appendChild(buttonGroup);

        // Cancel button
        this.cancelButton = document.createElement('button');
        this.cancelButton.type = 'button';
        this.cancelButton.classList.add('thin-ui-button');
        this.cancelButton.classList.add('thin-ui-button-secondary');
        this.cancelButton.classList.add('thin-ui-button-regular');
        this.cancelButton.textContent = this.cancelText;
        buttonGroup.appendChild(this.cancelButton);

        // Accept button
        this.acceptButton = document.createElement('button');
        this.acceptButton.type = 'button';
        this.acceptButton.classList.add('thin-ui-button');
        this.acceptButton.classList.add('thin-ui-button-primary');
        this.acceptButton.classList.add('thin-ui-button-regular');
        this.acceptButton.textContent = this.acceptText;
        buttonGroup.appendChild(this.acceptButton);

        // Let's rock
        this.parent.appendChild(this.modal);
    }

    _destroyModal() {
        this.parent.removeChild(this.modal);
        delete this;
    }
}
