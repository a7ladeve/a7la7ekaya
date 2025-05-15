// --- بداية الكود المدمج ---

// ================================================================================================
// ابدأ: محتوى من ملف "القائمه الجانبيه للمنتدي.txt"
// ================================================================================================
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
// ================================================================================================
// انتهى: محتوى من ملف "القائمه الجانبيه للمنتدي.txt"
// ================================================================================================


// ================================================================================================
// ابدأ: محتوى من ملف "صور المجله.txt"
// ملاحظة: تم الحفاظ على $(this).find('').insertBefore($(this)); كما هي في الأصل.
// وكذلك استخدام .attr('class', '...') كما هو في الأصل.
// ================================================================================================
// ننتظر تحميل jQuery إذا لم يكن محملاً بعد (هذا افتراض عام، الكود الأصلي لم يتضمن هذا الانتظار الصريح هنا)
// إذا كان jQuery يُحمّل ديناميكيًا بواسطة الكود أعلاه، قد تحتاج هذه الأكواد أيضًا لآلية انتظار مشابهة
// أو ضمان أن هذا الكود يُنفذ فقط بعد اكتمال تحميل jQuery.
// للتبسيط الحالي، سأفترض أن jQuery سيكون متاحًا عندما يتم الوصول لهذه النقطة
// إما لأنه محمل مسبقًا أو أن التأخير في initCustomTabs كان كافيًا.
// للحصول على أفضل النتائج، يجب أن يتم تحميل jQuery بشكل أساسي في <head>.

(function($) { // استخدام دالة مغلفة لتجنب تلويث النطاق العام وضمان $ تشير إلى jQuery
    $(function() { // Shorthand for $(document).ready()
        $('div.thumcont a.imgAsBg ').each(function() {
            var link = $(this).attr('href');
            var title = $(this).text();
            $(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
            $(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
                $(this).children('img').attr('class','a7la7ekaya-div');
            });
            $(this).find('').insertBefore($(this));
        });
    });

    $(function() {
        $('div.popular-post-item span#topic-img a ').each(function() {
            var link = $(this).attr('href');
            var title = $(this).text();
            $(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
            $(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
                $(this).children('img').attr('class','popular-post-thumbnail');
            });
            $(this).find('').insertBefore($(this));
        });
    });

    $(function() {
        $('div.tab-pane-inner-content .comment-item span.comment-avatar a ').each(function() {
            var link = $(this).attr('href');
            var title = $(this).text();
            $(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
            $(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
                $(this).children('img').attr('class','popular-post-thumbnail');
            });
            $(this).find('').insertBefore($(this));
        });
    });

    $(function() {
        $('article#topics-list-box-img div#box-img a ').each(function() {
            var link = $(this).attr('href');
            var title = $(this).text();
            $(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
            $(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
                $(this).children('img').attr('class','.movie-card-image-ahla img'); // كما في الأصل
            });
            $(this).find('').insertBefore($(this));
        });
    });

    // الكود المكرر من الملف الأصلي تم تضمينه كما هو
    $(function() {
        $('article#topics-list-box-img div#box-img a ').each(function() {
            var link = $(this).attr('href');
            var title = $(this).text();
            $(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
            $(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
                $(this).children('img').attr('class','.movie-card-image-ahla img'); // كما في الأصل
            });
            $(this).find('').insertBefore($(this));
        });
    });

    $(function() {
        $('form#ucp .block .block-content label a ').each(function() {
            var link = $(this).attr('href');
            var title = $(this).text();
            $(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
            $(this).children('a').load(link +'span#quickreply-img img:eq(0)', function() {
                $(this).children('img').attr('class','.contentRow-figure span#js-XFUniqueId3 img'); // كما في الأصل
            });
            $(this).find('').insertBefore($(this));
        });
    });
})(jQuery); // تمرير jQuery للدالة المغلفة
// ================================================================================================
// انتهى: محتوى من ملف "صور المجله.txt"
// ================================================================================================


// ================================================================================================
// ابدأ: محتوى من ملف "كود تغيير الالوان و الخطوط للمنتدي.txt"
// ================================================================================================
jQuery(document).ready(function($) { // Use jQuery alias for safety

    // --- 1. إغلاق القائمة المنسدلة للموبايل عند الضغط خارجها ---
    $(document).on('click', function(event) {
        if ($('.custom-menublabel').is(':visible')) {
            var $menuContainer = $('#custom-main-menu');
            var $menuCheckbox = $('#custom-menubtn');
            if (!$menuContainer.is(event.target) && $menuContainer.has(event.target).length === 0) {
                if ($menuCheckbox.is(':checked')) {
                    $menuCheckbox.prop('checked', false);
                }
            }
        }
    });

    // --- 2. منع القائمة المنسدلة للقائمة الرئيسية من الإغلاق عند الضغط بداخلها (للموبايل) ---
    $('.custom-t-menu').on('click', function(event) {
        if ($('.custom-menublabel').is(':visible') && $('#custom-menubtn').is(':checked')) {
             if (!$(event.target).closest('li#sub').length || $(event.target).closest('.custom-drop').length) {
             } else {
                 event.stopPropagation();
             }
        }
    });

    // --- 3. تبديل البحث المضمن ---
    var $searchTrigger = $('#custom-search-trigger');
    var $searchInline = $('#custom-search-inline');
    var $searchInput = $('#custom-search-text-inline');
    var $closeSearchButton = $('#close-inline-search');

    $searchTrigger.on('click', 'a', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $searchInline.addClass('active');
        setTimeout(function(){ $searchInput.focus(); }, 50);
    });

    $closeSearchButton.on('click', function(e) {
        e.stopPropagation();
        $searchInline.removeClass('active');
    });

    $(document).on('click keyup', function(event) {
        if ( $searchInline.hasClass('active') ) {
             if (event.type === 'keyup' && event.keyCode === 27) { // ESC key
                $closeSearchButton.click();
             } else if (event.type === 'click' &&
                 !$searchInline.is(event.target) &&
                 $searchInline.has(event.target).length === 0 &&
                 !$searchTrigger.is(event.target) &&
                 $searchTrigger.has(event.target).length === 0
             ){
                 $closeSearchButton.click();
             }
        }
    });


    // --- 4. القائمة المنسدلة للمستخدم (مع تأخير بسيط للإغلاق عند الخروج) ---
    var userMenuTimeout;
    var $userMenuContainer = $("#user-menu-container");
    var $userDropdown = $("#user-dropdown");

    $userMenuContainer.add($userDropdown).on("mouseenter", function() {
        clearTimeout(userMenuTimeout);
        $userDropdown.show();
        $userMenuContainer.addClass('dropdown-active');
    });

    $userMenuContainer.add($userDropdown).on("mouseleave", function() {
        userMenuTimeout = setTimeout(function() {
            $userDropdown.hide();
            $userMenuContainer.removeClass('dropdown-active');
        }, 300);
    });

     $('#user-dropdown-trigger').on('click', function(e){
         e.stopPropagation();
         var isActive = $userMenuContainer.hasClass('dropdown-active');
         if (isActive) {
             $userDropdown.hide();
             $userMenuContainer.removeClass('dropdown-active');
         } else {
            clearTimeout(userMenuTimeout);
            $userDropdown.show();
            $userMenuContainer.addClass('dropdown-active');
         }
     });

     $(document).on('click', function(event) {
         if ($userMenuContainer.hasClass('dropdown-active') &&
             !$userMenuContainer.is(event.target) &&
             $userMenuContainer.has(event.target).length === 0)
         {
             $userDropdown.hide();
             $userMenuContainer.removeClass('dropdown-active');
         }
     });


    // --- 5. لوحة تخصيص الاستايل ---
    const stylePanelContainer = $('#style-options-container');
    const stylePanel = $('#style-options-panel');
    const styleTrigger = $('#style-options-trigger');
    const body = $('body');
    const htmlEl = $('html');
    const defaultFontSize = 14;
    const fontSizeStep = 1;

    const colorOptions = [
        { name: 'Default Blue', color: '#446FAB' }, { name: 'Tomato Red', color: '#ff6347' },
        { name: 'Forest Green', color: '#228b22' }, { name: 'Royal Purple', color: '#8a2be2' },
        { name: 'Orange Peel', color: '#ff9f43' }, { name: 'Slate Gray', color: '#708090' }
    ];
    const fontOptions = [
        { name: 'Droid Kufi', value: '"Droid Arabic Kufi", Tahoma, Verdana, Arial, sans-serif' },
        { name: 'Tahoma', value: 'Tahoma, Verdana, Arial, sans-serif' }, { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
        { name: 'Times New Roman', value: '"Times New Roman", Times, serif' }, { name: 'Default', value: '' }
    ];

    styleTrigger.on('click', function(e) {
        e.stopPropagation();
        stylePanelContainer.toggleClass('open');
    });

    $(document).on('click', function(event) {
        if (stylePanelContainer.hasClass('open') &&
            !stylePanel.is(event.target) && stylePanel.has(event.target).length === 0 &&
            !styleTrigger.is(event.target) && styleTrigger.has(event.target).length === 0) {
            stylePanelContainer.removeClass('open');
        }
    });

    $('.options-tabs-nav li').on('click', function() {
        const tabId = $(this).data('tab');
        $('.options-tabs-nav li').removeClass('active');
        $(this).addClass('active');
        $('.options-tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    const colorSwatchesContainer = $('#color-swatches');
    colorOptions.forEach(opt => {
        const swatch = $('<button>').addClass('color-swatch').attr('data-color', opt.color).css('background-color', opt.color).attr('title', opt.name);
        colorSwatchesContainer.append(swatch);
    });

    const fontFamilySelect = $('#font-family-select');
    fontOptions.forEach(opt => {
        const option = $('<option>').val(opt.value).text(opt.name);
        fontFamilySelect.append(option);
    });

    function applySavedSettings() {
        const savedColor = localStorage.getItem('themeColor');
        const defaultColor = colorOptions[0].color;
        const applyColor = savedColor || defaultColor;
        updateThemeColor(applyColor);
        $('.color-swatch').removeClass('active');
        $(`.color-swatch[data-color="${applyColor}"]`).addClass('active');

        const darkMode = localStorage.getItem('darkMode') === 'true';
        updateDarkMode(darkMode);
        updateToggleButton('#dark-mode-toggle', darkMode); // الدالة الأصلية

        const showSidebar = localStorage.getItem('showSidebar') !== 'false';
        updateSidebar(showSidebar); 
        updateToggleButton('#sidebar-toggle', showSidebar); // الدالة الأصلية

        const savedFontSize = localStorage.getItem('fontSize');
        const currentFontSize = savedFontSize ? parseInt(savedFontSize, 10) : defaultFontSize;
        updateFontSize(currentFontSize);

        const savedFontFamily = localStorage.getItem('fontFamily');
        const applyFont = savedFontFamily || fontOptions.find(f => f.name === 'Default').value;
        updateFontFamily(applyFont);
        fontFamilySelect.val(applyFont);
    }

    function updateThemeColor(color) {
        htmlEl.css('--primary-color', color);
        htmlEl.css('--menu-hover-bg', color);
        htmlEl.css('--link-color', color);
        localStorage.setItem('themeColor', color);
        styleTrigger.css('background-color', color);
    }

    function updateDarkMode(isDark) {
        body.toggleClass('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
    }
    
    // =====================================================
    // الكود الأصلي لدالة updateSidebar
    // =====================================================
    function updateSidebar(show) {
        const $sidebarWrapper = $('#sidebar-wrapper'); 
        if (show) {
            $sidebarWrapper.show(); 
        } else {
            $sidebarWrapper.hide(); 
        }
        body.toggleClass('sidebar-hidden', !show); 
        localStorage.setItem('showSidebar', show);
    }
    // =====================================================

    function updateFontSize(size) {
        const newSize = Math.max(10, Math.min(20, size));
        htmlEl.css('--body-font-size', newSize + 'px');
        $('#current-font-size').text(newSize + 'px');
        localStorage.setItem('fontSize', newSize);
    }

    function updateFontFamily(fontValue) {
        const defaultFontFamily = getComputedStyle(document.documentElement).getPropertyValue('--body-font-family').trim();
        const finalFontValue = (fontValue && fontValue !== '') ? fontValue : defaultFontFamily;
        htmlEl.css('--body-font-family', finalFontValue);
        if (fontValue && fontValue !== '') {
            localStorage.setItem('fontFamily', fontValue);
        } else {
            localStorage.removeItem('fontFamily');
        }
    }

    function updateToggleButton(selector, isOn) { // الدالة الأصلية
        const button = $(selector);
        const state = isOn ? 'on' : 'off';
        button.attr('data-state', state);
    }

    $('#color-swatches').on('click', '.color-swatch', function() {
        const color = $(this).data('color');
        updateThemeColor(color);
        $('.color-swatch').removeClass('active');
        $(this).addClass('active');
    });

    $('#dark-mode-toggle').on('click', function() {
        const newState = $(this).attr('data-state') === 'off';
        updateDarkMode(newState);
        updateToggleButton(this, newState);
    });

    $('#sidebar-toggle').on('click', function() {
        const newState = $(this).attr('data-state') === 'off';
        updateSidebar(newState);
        updateToggleButton(this, newState);
    });

    $('#increase-font').on('click', function() {
        const currentSize = parseInt(htmlEl.css('--body-font-size'), 10) || defaultFontSize;
        updateFontSize(currentSize + fontSizeStep);
    });
    $('#decrease-font').on('click', function() {
        const currentSize = parseInt(htmlEl.css('--body-font-size'), 10) || defaultFontSize;
        updateFontSize(currentSize - fontSizeStep);
    });
    $('#reset-font-settings').on('click', function() {
        const defaultFontValue = fontOptions.find(f => f.name === 'Default').value;
        updateFontSize(defaultFontSize);
        updateFontFamily(defaultFontValue);
        fontFamilySelect.val(defaultFontValue);
    });

    $('#font-family-select').on('change', function() {
        updateFontFamily($(this).val());
    });

    $('#reset-all-options').on('click', function() {
        localStorage.removeItem('themeColor');
        localStorage.removeItem('darkMode');
        localStorage.removeItem('showSidebar');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('fontFamily');
        applySavedSettings();
        fontFamilySelect.val(fontOptions.find(f => f.name === 'Default').value);
    });

    applySavedSettings();

}); // نهاية jQuery(document).ready
// ================================================================================================
// انتهى: محتوى من ملف "كود تغيير الالوان و الخطوط للمنتدي.txt"
// ================================================================================================


// ================================================================================================
// ابدأ: محتوى من ملف "الصوره الشخصيه بصندوق الرد.txt"
// ================================================================================================
jQuery(document).ready(function(){ // الكود الأصلي يستخدم jQuery وليس $ هنا
          jQuery.get('/profile?mode=editprofile&page_profil=avatars', function(data) {
              var link = jQuery('#ucp .block .block-content img', data).attr('src'); // استخدام jQuery كما في الأصل
              if(link){
                jQuery('#quickreply-img').html('<img src="'+link+'" alt="">');
              }else{
                jQuery('#quickreply-img').html('');
              }
          });
        });
// ================================================================================================
// انتهى: محتوى من ملف "الصوره الشخصيه بصندوق الرد.txt"
// ================================================================================================


// ================================================================================================
// ابدأ: محتوى من ملف "المتواجدين الان.txt" (Vanilla JS)
// ================================================================================================
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

                        var isDisplayed = linkStyle.display !== 'none';
                        var isVisible = linkStyle.visibility !== 'hidden';
                        var isOpaque = parseFloat(linkStyle.opacity) > 0;
                        var hasPositiveFontSize = parseFloat(linkStyle.fontSize) > 0;

                        if (isDisplayed && isVisible && isOpaque && hasPositiveFontSize) {
                            hasVisibleLink = true;
                            break;
                        }
                    }
                }

                if (hasVisibleLink) {
                    widgetContainer.style.display = 'block';
                } else {
                    widgetContainer.style.display = 'none';
                }
            } else {
                widgetContainer.style.display = 'none';
                // console.warn("Links area not found in widget: " + widgetId + ". Hiding widget.");
            }
        } else {
            // console.warn("Widget with ID '" + widgetId + "' not found.");
        }
    }

    var targetWidgetIds = [
        'Admin-ONLINE',
        'Moderators-ONLINE',
        'Members-ONLINE',
        'HTML13',
        'HTML14',
        'HTML15'
    ];

    targetWidgetIds.forEach(function(id) {
        checkAndToggleWidgetVisibility(id);
    });

});
// ================================================================================================
// انتهى: محتوى من ملف "المتواجدين الان.txt"
// ================================================================================================


// ================================================================================================
// ابدأ: محتوى من ملف "تاثيرات بيانات الاعضاء فى التعليقات.txt" (Vanilla JS)
// ================================================================================================
document.addEventListener('DOMContentLoaded', function() {
    const userCells = document.querySelectorAll('.message-cell--user');
    const transitionDuration = 300; // مدة الانتقال بالمللي ثانية (0.3 ثانية)

    userCells.forEach(cell => {
        const userExtras = cell.querySelector('.message-userExtras');

        if (userExtras) {
            userExtras.style.opacity = '0';
            userExtras.style.maxHeight = '0px';
            userExtras.style.overflow = 'hidden';
            userExtras.style.display = 'none';
            userExtras.style.transition = `opacity ${transitionDuration}ms ease-in-out, max-height ${transitionDuration}ms ease-in-out, padding-top ${transitionDuration}ms ease-in-out, padding-bottom ${transitionDuration}ms ease-in-out`;

            const basePaddingTopBottom = '8px';

            userExtras.style.paddingTop = '0px';
            userExtras.style.paddingBottom = '0px';

            cell.addEventListener('mouseenter', function() {
                if (userExtras.dataset.isAnimating === 'true') return;
                userExtras.dataset.isAnimating = 'true';
                userExtras.style.display = 'block';

                requestAnimationFrame(() => {
                    const requiredHeight = userExtras.scrollHeight;
                    userExtras.style.opacity = '1';
                    userExtras.style.maxHeight = requiredHeight + 'px';
                    userExtras.style.paddingTop = basePaddingTopBottom;
                    userExtras.style.paddingBottom = basePaddingTopBottom;
                });

                setTimeout(() => {
                    userExtras.dataset.isAnimating = 'false';
                }, transitionDuration);
            });

            cell.addEventListener('mouseleave', function() {
                if (userExtras.dataset.isAnimating === 'true' && userExtras.style.opacity === '0') return;
                userExtras.dataset.isAnimating = 'true';

                userExtras.style.opacity = '0';
                userExtras.style.maxHeight = '0px';
                userExtras.style.paddingTop = '0px';
                userExtras.style.paddingBottom = '0px';

                setTimeout(() => {
                    if (!cell.matches(':hover')) {
                         userExtras.style.display = 'none';
                    }
                    userExtras.dataset.isAnimating = 'false';
                }, transitionDuration);
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('div.block-body.js-replyNewMessageContainer article.message');

    if (!articles.length) {
        return;
    }

    articles.forEach(article => {
        article.classList.remove('is-visible');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    articles.forEach(article => {
        intersectionObserver.observe(article);
    });
});
// ================================================================================================
// انتهى: محتوى من ملف "تاثيرات بيانات الاعضاء فى التعليقات.txt"
// ================================================================================================


// ================================================================================================
// ابدأ: محتوى من ملف "كود المجله فى المنتديات الثانوية.txt" (Vanilla JS)
// ================================================================================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.movie-card-ahla');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.01
        };

        function resetCardAnimation(card) {
            card.classList.remove('animate-slide-in');
        }

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    if (!card.classList.contains('animate-slide-in')) {
                        card.style.animationDelay = '0s';
                        card.classList.add('animate-slide-in');
                    }
                } else {
                    resetCardAnimation(card);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        cards.forEach(card => {
            resetCardAnimation(card);
            observer.observe(card);
        });

    } else {
        cards.forEach(card => {
            card.style.opacity = '1';
        });
    }
});
// ================================================================================================
// انتهى: محتوى من ملف "كود المجله فى المنتديات الثانوية.txt"
// ================================================================================================

// --- نهاية الكود المدمج ---
