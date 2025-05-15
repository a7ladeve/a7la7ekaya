document.addEventListener('DOMContentLoaded', function() {
    const userCells = document.querySelectorAll('.message-cell--user');
    const transitionDuration = 300; // مدة الانتقال بالمللي ثانية (0.3 ثانية)

    userCells.forEach(cell => {
        const userExtras = cell.querySelector('.message-userExtras');

        if (userExtras) {
            // 1. تطبيق الأنماط الأولية لجعل العنصر جاهزًا للانتقال ومخفيًا
            // حتى لو كان style="" فارغًا، هذا يضمن الحالة الأولية الصحيحة
            userExtras.style.opacity = '0';
            userExtras.style.maxHeight = '0px';
            userExtras.style.overflow = 'hidden';
            userExtras.style.display = 'none'; // نبدأه مخفيًا تمامًا
            userExtras.style.transition = `opacity ${transitionDuration}ms ease-in-out, max-height ${transitionDuration}ms ease-in-out, padding-top ${transitionDuration}ms ease-in-out, padding-bottom ${transitionDuration}ms ease-in-out`;

            // إذا كنت تريد إضافة padding عند الظهور فقط (كما في الأمثلة السابقة)
            // قم بتعيين padding-left و padding-right هنا بشكل دائم إذا أردت،
            // و padding-top و padding-bottom إلى 0 مبدئيًا.
            // مثال: userExtras.style.padding = '0px 10px';
            // أو دع التنسيق الأصلي للـ padding كما هو إذا كان مناسبًا.
            // للتوضيح، سأضيف padding كما في الأمثلة السابقة عند الظهور.
            const basePaddingLeftRight = window.getComputedStyle(userExtras).paddingLeft; // أو قيمة ثابتة مثل '10px'
            const basePaddingTopBottom = '8px'; // قيمة الـ padding العمودي عند الظهور

            userExtras.style.paddingTop = '0px';
            userExtras.style.paddingBottom = '0px';
            // إذا أردت الحفاظ على padding أفقي موجود:
            // userExtras.style.paddingLeft = basePaddingLeftRight;
            // userExtras.style.paddingRight = basePaddingLeftRight;


            cell.addEventListener('mouseenter', function() {
                // منع تشغيل متعدد إذا كان الماوس يدخل ويخرج بسرعة
                if (userExtras.dataset.isAnimating === 'true') return;
                userExtras.dataset.isAnimating = 'true';

                // أظهر العنصر للسماح بحساب scrollHeight وتطبيق الانتقالات
                userExtras.style.display = 'block'; // أو 'flex' أو حسب تنسيقك الأصلي

                // احسب الارتفاع اللازم
                const requiredHeight = userExtras.scrollHeight;

                // استخدام requestAnimationFrame يضمن أن المتصفح
                // قد عالج تغيير display: block قبل تطبيق التغييرات التي ستؤدي للانتقال
                requestAnimationFrame(() => {
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
                if (userExtras.dataset.isAnimating === 'true' && userExtras.style.opacity === '0') return; // إذا كان يختفي بالفعل
                userExtras.dataset.isAnimating = 'true';

                userExtras.style.opacity = '0';
                userExtras.style.maxHeight = '0px';
                userExtras.style.paddingTop = '0px';
                userExtras.style.paddingBottom = '0px';

                // بعد انتهاء الانتقال، أعد display: none
                setTimeout(() => {
                    // تحقق مرة أخرى أن الماوس ليس فوق العنصر لتجنب إخفاءه إذا عاد الماوس بسرعة
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
    // استهداف كل عنصر "article" داخل الحاويات المحددة
    // إذا كان لديك عدة حاويات .js-replyNewMessageContainer وكل واحدة تحتوي على articles
    // هذا الكود سيجد كل الـ articles داخلها.
    const articles = document.querySelectorAll('div.block-body.js-replyNewMessageContainer article.message');

    if (!articles.length) {
        return; // لا تفعل شيئًا إذا لم يتم العثور على أي مقالات
    }

    // خطوة احترازية: إزالة 'is-visible' من جميع المقالات إذا كانت موجودة مبدئيًا
    articles.forEach(article => {
        article.classList.remove('is-visible');
    });

    const observerOptions = {
        root: null, // المراقبة بالنسبة للـ viewport
        rootMargin: '0px', // يمكن تعديل هذا لـ "تحميل مسبق" للحركة
        threshold: 0.1    // تشغيل عندما يكون 10% من المقال مرئيًا.
                          // قيمة صغيرة تجعل التأثير يبدأ مبكرًا.
                          // جرب قيمًا مختلفة مثل 0.05 أو 0.15 لتجد الأنسب.
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // المقال دخل نافذة العرض أو جزء منه أصبح مرئيًا
                entry.target.classList.add('is-visible');
            } else {
                // المقال خرج بالكامل من نافذة العرض
                entry.target.classList.remove('is-visible');
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    articles.forEach(article => {
        intersectionObserver.observe(article);
    });
});
