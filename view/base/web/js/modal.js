/**
 * Copyright © Fisheye Media Ltd. All rights reserved.
 * See LICENCE.txt for licence details.
 */
define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'Magento_Customer/js/model/authentication-popup',
    'Magento_Customer/js/customer-data',
    'mage/url'
], function($, modal, authenticationPopup, customerData, urlBuilder) {
    'use strict';

    var fisheyeModal = {

        initModal: function(config, element) {

            var target = $(element).find('[data-role="target"]'),
                trigger = $(element).find('[data-role="trigger"]'),
                button = [];

            if (config.displayButton) {
                button = [{
                    text: config.buttonText,
                    class: config.buttonClass,
                    click: function() {
                        if (!config.useForm) {
                            this.closeModal();
                        }
                    }
                }];
            }

            if (config.displayButton && config.useForm) {
                button['0'].attr = {
                    'id': config.buttonId,
                    "form": config.formId,
                    "data-action": "submit-form",
                    "type": "submit"
                };
            }

            target.modal({
                autoOpen: config.autoOpen,
                buttons: button,
                clickableOverlay: config.clickableOverlay,
                focus: config.focus,
                innerScroll: config.innerScroll,
                modalClass: config.modalClass,
                modalLeftMargin: config.modalLeftMargin,
                responsive: config.responsive,
                title: config.title,
                type: config.type
            });

            $(trigger).click(function(event) {
                event.preventDefault();

                if (config.requireLogin) {
                    let customer = customerData.get('customer');
                    if (!customer().firstname) {
                        if (config.loginRedirectUrl) {
                            let url = urlBuilder.build(config.loginRedirectUrl);
                            $.cookie('login_redirect', url);
                        }
                        authenticationPopup.showModal();

                        return false;
                    }
                }

                target.modal('openModal');
            });
        }
    };

    return {
        'fisheye/modal': fisheyeModal.initModal
    };
});
