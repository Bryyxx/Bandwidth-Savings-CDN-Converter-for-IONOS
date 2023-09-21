// ==UserScript==
// @name         IONOS (FR) CDN Saved Bandwidth Measurement Unit Converter
// @namespace    https://cdn.bryan-marliere.com/Ionos-bandwithsaving-converter/script.js
// @version      1.0
// @description  Converts saved bandwidth values from bytes to megabytes for better readability.
// @author       Bryan MARLIÈRE
// @match        https://my.ionos.fr/hosting-overview
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function convertToMB(bytes) {
        return (bytes / (1024 * 1024)).toFixed(2);
    }

    function updateCDNValues() {
        var cdnValueElements = document.querySelectorAll('.settings-stripe__value');

        if (cdnValueElements.length > 0) {
            cdnValueElements.forEach(function(element) {
                var text = element.textContent.trim();
                var numbers = text.match(/\d+/g);

                if (numbers && numbers.length === 2) {
                    var value1 = parseInt(numbers[0]);
                    var value2 = parseInt(numbers[1]);

                    var newValue = convertToMB(value1) + ' Mo sur ' + convertToMB(value2) + ' Mo';

                    element.textContent = newValue;
                }
            });
        }
    }

    var observer = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'subtreeModified') {
                updateCDNValues();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    updateCDNValues();
})();
