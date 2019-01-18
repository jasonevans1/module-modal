/**
 * Copyright © Fisheye Media Ltd. All rights reserved.
 * See LICENCE.txt for licence details.
 */
define([
    'jquery',
    'Magento_Ui/js/modal/modal'
], function($) {
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
                    attr: {
                        'id': config.buttonId,
                    },
                    click: function() {
                        if (!config.useForm) {
                            this.closeModal();
                        }
                    }
                }];
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
                target.modal('openModal');

                if (config.useForm) {
                    let buttonID = '#' + config.buttonId;
                    $(buttonID).attr({
                        "form": config.formId,
                        "data-action": "submit-form",
                        "type": "submit"
                    });
                }
            });
        }
    };

    return {
        'fisheye/modal': fisheyeModal.initModal
    };
});
