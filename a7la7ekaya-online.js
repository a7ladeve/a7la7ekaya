document.addEventListener('DOMContentLoaded', function() {

    /**
     * يتحقق من وجود روابط مرئية (مع الأخذ في الاعتبار display و font-size)
     * داخل widget معين ويقوم بإظهاره أو إخفائه.
     * @param {string} widgetId - معرف الـ div الخاص بالـ widget.
     */
    function checkAndToggleWidgetVisibility(widgetId) {
        var widgetContainer = document.getElementById(widgetId);

        if (widgetContainer) {
            var linksArea = widgetContainer.querySelector('.widget-content div[align="center"]');

            if (linksArea) {
                var links = linksArea.getElementsByTagName('a');
                var hasVisibleLink = false;

                if (links.length > 0) {
                    for (var i = 0; i < links.length; i++) {
                        var currentLink = links[i];
                        var linkStyle = window.getComputedStyle(currentLink);

                        // التحقق من أن الرابط مرئي
                        // 1. ليس display: none
                        // 2. ليس visibility: hidden
                        // 3. الشفافية opacity ليست 0
                        // 4. حجم الخط font-size ليس 0
                        var isDisplayed = linkStyle.display !== 'none';
                        var isVisible = linkStyle.visibility !== 'hidden';
                        var isOpaque = parseFloat(linkStyle.opacity) > 0;
                        var hasPositiveFontSize = parseFloat(linkStyle.fontSize) > 0; // التحقق من حجم الخط

                        // للرابط أن يكون مرئيًا، يجب أن تكون كل هذه الشروط صحيحة
                        // وأيضًا، يمكن إضافة التحقق من أبعاد العنصر إذا أردنا دقة أكبر
                        // var hasDimensions = currentLink.offsetWidth > 0 && currentLink.offsetHeight > 0;
                        // if (isDisplayed && isVisible && isOpaque && hasPositiveFontSize && hasDimensions) {

                        if (isDisplayed && isVisible && isOpaque && hasPositiveFontSize) {
                            hasVisibleLink = true;
                            break; // وجدنا رابطًا واحدًا مرئيًا على الأقل، لا داعي لإكمال البحث
                        }
                    }
                }

                if (hasVisibleLink) {
                    widgetContainer.style.display = 'block'; // أو 'flex' أو غيره حسب تصميمك
                } else {
                    widgetContainer.style.display = 'none'; // تأكيد الإخفاء إذا لم توجد روابط مرئية
                }
            } else {
                widgetContainer.style.display = 'none';
                // console.warn("Links area not found in widget: " + widgetId + ". Hiding widget.");
            }
        } else {
            // console.warn("Widget with ID '" + widgetId + "' not found.");
        }
    }

    // قائمة بمعرفات الـ Widgets التي تريد تطبيق هذا السلوك عليها
    var targetWidgetIds = [
        'Admin-ONLINE',
        'Moderators-ONLINE',
        'Members-ONLINE',
        'HTML13',
        'HTML14',
        'HTML15'
        // أضف أي IDs أخرى هنا
    ];

    // تطبيق الدالة على كل widget في القائمة
    targetWidgetIds.forEach(function(id) {
        checkAndToggleWidgetVisibility(id);
    });

});