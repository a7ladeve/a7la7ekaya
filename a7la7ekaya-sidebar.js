if (typeof jQuery == 'undefined') {
    // إذا لم يتم تحميل jQuery، يمكنك محاولة تحميله ديناميكيًا
    // لكن من الأفضل التأكد من تحميله مسبقًا في overall_header
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
}

// الانتظار قليلاً للتأكد من تحميل jQuery إذا تم تحميله ديناميكيًا
// أو التنفيذ فورًا إذا كان jQuery موجودًا بالفعل
function initCustomTabs() {
    if (typeof jQuery == 'undefined') {
        setTimeout(initCustomTabs, 100); // حاول مرة أخرى بعد 100 مللي ثانية
        return;
    }

    jQuery(document).ready(function($) {
        // إخفاء جميع لوحات المحتوى ما عدا النشطة
        $('.custom-tab-pane:not(.active-pane)').hide();

        $('.custom-tabs-nav a').click(function(event) {
            event.preventDefault();

            var $this = $(this);
            var $parentLi = $this.parent(); // عنصر li الأب
            var $allLinks = $('.custom-tabs-nav a');
            var $allPanes = $('.custom-tab-pane');

            // لا تفعل شيئًا إذا كانت التبويبة الحالية هي النشطة بالفعل
            if ($this.hasClass('active-tab')) {
                return;
            }

            // إزالة الكلاس النشط من جميع روابط التبويبات ولوحات المحتوى
            $allLinks.removeClass('active-tab');
            $allPanes.removeClass('active-pane').hide(); // استخدام .hide() أفضل من .fadeOut() هنا للسرعة

            // إضافة الكلاس النشط للرابط الذي تم النقر عليه
            $this.addClass('active-tab');

            // إظهار لوحة المحتوى الموافقة
            var targetPaneId = $this.attr('href');
            $(targetPaneId).addClass('active-pane').fadeIn(200); // يمكنك تغيير سرعة التأثير
        });
    });
}

// بدء تشغيل وظيفة التبويبات
initCustomTabs();