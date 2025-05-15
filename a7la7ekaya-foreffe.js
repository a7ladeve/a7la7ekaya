document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.movie-card-ahla');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // هامش لتشغيل الأنيميشن قبل الظهور الكامل
            threshold: 0.01 // يبدأ عندما يظهر جزء صغير
        };

        function resetCardAnimation(card) {
            card.classList.remove('animate-slide-in');
            // ضمان أن البطاقة مخفية تمامًا قبل إعادة الأنيميشن
            // card.style.opacity = '0'; // عادة الأنيميشن يهتم بهذا
            // card.style.transform = 'translateX(-100%)'; // لإعادة التعيين الكامل إذا لزم الأمر
        }

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    // البطاقة دخلت مجال الرؤية
                    // لا يوجد تأخير، فقط شغل الأنيميشن إذا لم يكن يعمل بالفعل
                    if (!card.classList.contains('animate-slide-in')) {
                        // إزالة أي animation-delay قد يكون موجودًا من محاولات سابقة (احتياطي)
                        card.style.animationDelay = '0s';
                        card.classList.add('animate-slide-in');
                    }
                } else {
                    // البطاقة خرجت من مجال الرؤية
                    resetCardAnimation(card);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        cards.forEach(card => {
            resetCardAnimation(card); // تأكد من الحالة الأولية المخفية
            observer.observe(card);
        });

    } else {
        // كود احتياطي للمتصفحات القديمة: اجعل كل البطاقات مرئية مباشرة
        cards.forEach(card => {
            card.style.opacity = '1';
        });
    }
});