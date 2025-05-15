
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
             if (event.type === 'keyup' && event.keyCode === 27) { 
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
        updateToggleButton('#dark-mode-toggle', darkMode);

        const showSidebar = localStorage.getItem('showSidebar') !== 'false';
        updateSidebar(showSidebar); // استدعاء الدالة المعدلة
        updateToggleButton('#sidebar-toggle', showSidebar);

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
    // تعديل هنا: دالة updateSidebar
    // =====================================================
    function updateSidebar(show) {
        const $sidebarWrapper = $('#sidebar-wrapper'); // استهداف الشريط الجانبي مباشرة

        // 1. التحكم المباشر في إظهار/إخفاء #sidebar-wrapper
        if (show) {
            $sidebarWrapper.show(); // إظهار الشريط الجانبي
        } else {
            $sidebarWrapper.hide(); // إخفاء الشريط الجانبي
        }

        // 2. (اختياري ومحافظ عليه من الكود الأصلي) تبديل الكلاس على body
        // هذا قد يكون مفيدًا إذا كانت هناك عناصر أخرى أو تنسيقات CSS تعتمد على هذا الكلاس
        body.toggleClass('sidebar-hidden', !show); 
        
        localStorage.setItem('showSidebar', show);
    }
    // =====================================================
    // نهاية التعديل في updateSidebar
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

    function updateToggleButton(selector, isOn) {
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

    // هذا الجزء يستدعي updateSidebar المعدلة
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