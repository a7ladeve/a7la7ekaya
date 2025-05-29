  let excelData = [];
    let columnIndexMap = {};

    // --- هيكل البيانات الموسع للمحافظات والإدارات والمصادر ---
    // !!! هام جداً: يجب عليك مراجعة وتوسيع هذا الهيكل ليشمل جميع البيانات الدقيقة المطلوبة !!!
    const allLocationsData = {
        'أسيوط': {
            'أبنوب': [
                "مستشفى أبنوب المركزي", "إدارة صحة أبنوب", "وحدة صحية أبنوب البلد", "وحدة صحية بني محمديات", "وحدة صحية عام (أبنوب)"
            ],
            'أبو تيج': [
                "مستشفى أبو تيج المركزي", "إدارة صحة أبو تيج", "وحدة صحية أبو تيج", "عيادة خاصة أبو تيج"
            ],
            'البداري': [
                "مستشفى البداري المركزي", "إدارة صحة البداري", "وحدة صحية البداري"
            ],
            'بندر أسيوط أول': [
                "مستشفى أسيوط العام", "مستشفى الإيمان العام بأسيوط", "مستشفى معهد جنوب مصر للأورام",
                "مستشفى الصدر بأسيوط", "مستشفى الحميات بأسيوط", "مستشفى التأمين الصحي بأسيوط",
                "مستشفى الشرطة بأسيوط", "مستشفى القوات المسلحة بأسيوط", "إدارة صحة بندر أسيوط أول"
            ],
            'بندر أسيوط ثان': [
                "مستشفى أسيوط الجامعي الرئيسي", "مستشفى صحة المرأة الجامعي بأسيوط", "مستشفى الأطفال الجامعي بأسيوط",
                "مستشفى القلب وجراحة الصدر الجامعي بأسيوط", "مستشفى الكلى والمسالك البولية الجامعي بأسيوط",
                "مستشفى الإصابات والطوارئ الجامعي بأسيوط", "إدارة صحة بندر أسيوط ثان"
            ],
            'ديروط': [
                "مستشفى ديروط المركزي", "إدارة صحة ديروط", "وحدة صحية ديروط الشريف"
            ],
            'ساحل سليم': [
                "مستشفى ساحل سليم المركزي", "إدارة صحة ساحل سليم", "وحدة صحية ساحل سليم"
            ],
            'صدفا': [
                "مستشفى صدفا المركزي", "إدارة صحة صدفا", "وحدة صحية صدفا"
            ],
            'الغنايم': [
                "مستشفى الغنايم المركزي", "إدارة صحة الغنايم", "وحدة صحية الغنايم"
            ],
            'الفتح': [
                "مستشفى الفتح المركزي", "إدارة صحة الفتح", "وحدة صحية الفتح"
            ],
            'القوصية': [
                "مستشفى القوصية المركزي", "إدارة صحة القوصية", "وحدة صحية القوصية"
            ],
            'مركز أسيوط': [
                "إدارة صحة مركز أسيوط", "وحدة صحية منقباد", "وحدة صحية بني قره"
            ],
            'منفلوط': [
                "مستشفى منفلوط المركزي", "إدارة صحة منفلوط", "وحدة صحية منفلوط"
            ],
            'مديرية الشئون الصحية بأسيوط': [
                "مديرية الشئون الصحية بأسيوط"
            ]
        },
        'القاهرة': {
            'القاهرة الجديدة': ['مستشفى القاهرة الجديدة', 'مركز طبي التجمع الخامس', 'عيادة التجمع الصحي'],
            'مصر القديمة': ['مستشفى القصر العيني', 'وحدة صحة مصر القديمة', 'مركز صحي الملك الصالح'],
            'الزيتون': ['مستشفى الزيتون التخصصي', 'مركز صحة الزيتون', 'وحدة صحية الزيتون'],
            'مدينة نصر': ['مستشفى مدينة نصر للتأمين الصحي', 'مركز صحة مدينة نصر', 'وحدة صحة حي السفارات']
        },
        'الجيزة': {
            'الهرم': ['مستشفى الهرم', 'مستشفى الشيخ زايد التخصصي', 'عيادة الهرم الطبية', 'مستشفى دار الفؤاد'],
            'إمبابة': ['مستشفى إمبابة العام', 'وحدة صحة إمبابة', 'مستشفى الحميات بإمبابة'],
            'أكتوبر': ['مستشفى أكتوبر المركزي', 'وحدة صحة 6 أكتوبر', 'مستشفى جامعة 6 أكتوبر']
        },
        'الإسكندرية': {
            'المنتزة': ['مستشفى المنتزة العام', 'وحدة صحية المنتزة أول', 'مستشفى جمال عبد الناصر'],
            'العجمي': ['مستشفى العجمي المركزي', 'مركز طبي العجمي', 'وحدة صحة البيطاش'],
            'وسط الإسكندرية': ['مستشفى الإسكندرية الجامعي', 'مستشفى رأس التين العام']
        },
        'أسوان': {
            'أسوان': ['مستشفى أسوان الجامعي', 'مستشفى أسوان التخصصي', 'وحدة صحة أسوان']
        },
        'الأقصر': {
            'الأقصر': ['مستشفى الأقصر الدولي', 'مستشفى الأقصر العام', 'وحدة صحة الأقصر']
        },
        'البحر الأحمر': {
            'الغردقة': ['مستشفى الغردقة العام', 'وحدة صحة الغردقة']
        },
        'البحيرة': {
            'دمنهور': ['مستشفى دمنهور التعليمي', 'مستشفى دمنهور العام']
        },
        'بني سويف': {
            'بني سويف': ['مستشفى بني سويف العام', 'مستشفى بني سويف الجامعي']
        },
        'بورسعيد': {
            'الشرق': ['مستشفى بورسعيد العام', 'مركز طبي الشرق']
        },
        'جنوب سيناء': {
            'شرم الشيخ': ['مستشفى شرم الشيخ الدولي', 'وحدة صحة شرم الشيخ']
        },
        'الدقهلية': {
            'المنصورة': ['مستشفى المنصورة الجامعي', 'مستشفى الأطفال الجامعي بالمنصورة']
        },
        'دمياط': {
            'دمياط': ['مستشفى دمياط العام', 'مستشفى دمياط التخصصي']
        },
        'سوهاج': {
            'سوهاج': ['مستشفى سوهاج الجامعي', 'مستشفى سوهاج العام']
        },
        'السويس': {
            'السويس': ['مستشفى السويس العام', 'مستشفى السويس العسكري']
        },
        'الشرقية': {
            'الزقازيق': ['مستشفى الزقازيق الجامعي', 'مستشفى الأحرار التعليمي']
        },
        'شمال سيناء': {
            'العريش': ['مستشفى العريش العام', 'وحدة صحة العريش']
        },
        'الغربية': {
            'طنطا': ['مستشفى طنطا الجامعي', 'مستشفى المنشاوي العام']
        },
        'الفيوم': {
            'الفيوم': ['مستشفى الفيوم العام', 'مستشفى الفيوم الجامعي']
        },
        'القليوبية': {
            'بنها': ['مستشفى بنها الجامعي', 'مستشفى بنها التعليمي']
        },
        'قنا': {
            'قنا': ['مستشفى قنا العام', 'مستشفى قنا الجامعي']
        },
        'كفر الشيخ': {
            'كفر الشيخ': ['مستشفى كفر الشيخ العام', 'مستشفى كفر الشيخ الجامعي']
        },
        'مطروح': {
            'مرسى مطروح': ['مستشفى مطروح العام', 'وحدة صحة مطروح']
        },
        'المنوفية': {
            'شبين الكوم': ['مستشفى شبين الكوم التعليمي', 'مستشفى شبين الكوم الجامعي']
        },
        'المنيا': {
            'المنيا': ['مستشفى المنيا الجامعي', 'مستشفى المنيا العام']
        },
        'الوادي الجديد': {
            'الخارجة': ['مستشفى الخارجة العام', 'وحدة صحة الخارجة']
        },
        // أضف المزيد من المحافظات والإدارات والمصادر هنا
    };

    // قائمة الجنسيات العالمية لـ <select> (جزء فقط، يمكنك توسيعها)
    const nationalitiesList = [
        "مصرية", "سعودية", "جزائرية", "مغربية", "تونسية", "سودانية", "عراقية", "سورية", "لبنانية", "أردنية",
        "فلسطينية", "كويتية", "بحرينية", "قطرية", "إماراتية", "عمانية", "يمنية", "ليبية", "صومالية", "جيبوتية",
        "موريتانية", "كومورية", "ألمانية", "أمريكية", "إنجليزية", "إيطالية", "فرنسية", "روسية", "صينية",
        "يابانية", "هندية", "برازيلية", "كندية", "مكسيكية", "جنوب أفريقية", "أسترالية", "نيوزلندية",
        "تركية", "إيرانية", "باكستانية", "إندونيسية", "ماليزية", "فلبينية", "بنغلاديشية", "إثيوبية",
        "نيجيرية", "غانية", "إسبانية", "برتغالية", "سويسرية", "سويدية", "نرويجية", "فنلندية", "هولندية",
        "بلجيكية", "نمساوية", "يونانية", "بولندية", "أوكرانية", "رومانية", "بلغارية", "تشيكية", "مجريّة",
        "كورية جنوبية", "فيتنامية", "تايلاندية", "أفغانية", "ألبانية", "أيرلندية", "أيسلندية", "أوغندية",
        "إكوادورية", "أوروغوايانية", "باراغوايانية", "بليزية", "بوليفية", "بيروفية", "تشيلية", "كولومبية",
        "كوستاريكية", "غواتيمالية", "هندوراسية", "نيكاراغوية", "بنغولية", "بنغولية", "فنزويلية", "كوبية",
        "هاييتية", "دومينيكية", "جامايكية", "ترينيدادية", "فيجية", "سنغافورية", "بنغالية", "كمبودية",
        "لاوسية", "سريلانكية", "نيبالية", "بوتانية", "مالديفية", "ليتوانية", "لاتفية", "إستونية", "سلوفاكية",
        "سلوفينية", "كرواتية", "بوسنية", "صربية", "مونتينيغرية", "مقدونية", "قبرصية", "مالطية", "آذرية",
        "جورجية", "أرمينية", "قازاخية", "أوزبكية", "تركمانستانية", "طاجيكية", "قرغيزية", "مولدوفية",
        "بيلاروسية", "أوكرانية", "فنلندية", "باهاماسية", "باربادوسية", "غرينادية", "جامايكية", "تنزانية",
        "كنغية", "موزمبيقية", "رواندية", "زامبية", "زيمبابوية", "جنوب سودانية", "مالاوية", "أنغولية",
        "بنينية", "بوركينا فاسو", "بوتسوانية", "بوروندية", "تشادية", "إريترية", "إيسواتينية", "غابونية",
        "غامبية", "غينية", "غينيا بيساو", "ليبيرية", "ليسوتو", "مدغشقرية", "مالاوية", "مالية", "موريتانية",
        "موريشيوسية", "ناميبية", "نيجيرية", "نيجرية", "رواندية", "ساو تومي وبرينسيبية", "سنغالية",
        "سيشل", "سيراليونية", "صومالية", "جنوب سودانية", "سوازيلاندية", "تنزانية", "توغولية", "أوغندية",
        "زامبية", "زيمبابوية", "كمبودية", "لاوسية", "فيجية", "ساموية", "تونغية", "فانواتوية", "ناورونية",
        "كيريباتية", "جزر مارشال", "جزر سليمان", "ميكرونيزية", "بالاوية", "بابوا غينيا الجديدة", "توكلوية",
        "توفالوية", "سنغافورية"
    ];

    // قائمة الأقسام الثابتة للمستشفى
    const hospitalDepartments = [
        "داخلي", "خارجي", "عيادة خارجية", "استقبال/طوارىء", "قسم داخلى", "رعاية مركزة", "بنك دم",
        "وحدة غسيل كلوى", "فحص مسافرين", "معمل", "قادمين من الخارج", "مسح صحى"
    ];

    // قائمة الأمراض للتشخيص (لم تتغير)
    const surveillanceDiseases = [
        "ARI", "حمى التيفوئيد", "حمى نظيرة التيفود (الباراتيفود)", "الملاريا",
        "الالتهاب السحائي الجرثومي", "الالتهاب السحائي الفيروسي", "الحصبة", "الحصبة الألمانية",
        "النكاف", "شلل الأطفال الرخو الحاد", "الدفتيريا", "السعال الديكي", "التيتانوس الوليدي",
        "التيتانوس (غير وليدي)", "الالتهاب الكبدي الفيروسي أ", "الالتهاب الكبدي الفيروسي ب الحاد",
        "الالتهاب الكبدي الفيروسي ج الحاد", "الالتهاب الكبدي الفيروسي هـ", "جدري الماء", "الجذام",
        "الدرن الرئوي", "الدرن خارج الرئة", "الإسهال الدموي (الديزونتاريا)", "الكوليرا", "تسمم غذائي",
        "داء البروسيلات", "الجمرة الخبيثة", "داء الكلب في الإنسان", "الحمى النزفية الفيروسية",
        "كوفيد-19", "إنفلونزا الطيور في الإنسان", "متلازمة الشرق الأوسط التنفسية (MERS-CoV)",
        "الليشمانيا الجلدية", "الليشمانيا الحشوية", "التهاب شعبي", "التهاب رئوي",
        "حمى مجهولة السبب", "أخرى"
    ];

    // --- وظائف مساعدة لتعبئة القوائم المنسدلة بشكل ديناميكي ---

    // تعبئة قائمة المحافظات
    function populateGovernorates() {
        const governorateSelect = document.getElementById('governorate');
        governorateSelect.innerHTML = '<option value="">اختر...</option>';
        Object.keys(allLocationsData).sort().forEach(gov => { // فرز أبجدي للمحافظات
            governorateSelect.add(new Option(gov, gov));
        });
    }

    // تعبئة قائمة الإدارات بناءً على المحافظة المختارة
    function populateAdministrations(governorate) {
        const adminSelect = document.getElementById('administration');
        adminSelect.innerHTML = '<option value="">اختر...</option>'; // مسح الخيارات الحالية
        if (governorate && allLocationsData[governorate]) {
            Object.keys(allLocationsData[governorate]).sort().forEach(admin => { // فرز أبجدي للإدارات
                adminSelect.add(new Option(admin, admin));
            });
        }
        // بعد التعبئة، امسح قائمة مصادر الإبلاغ لأن الإدارة تغيرت (أو لم يتم اختيار محافظة بعد)
        populateReportSources(null, null); 
    }

    // تعبئة قائمة مصادر الإبلاغ بناءً على المحافظة والإدارة المختارة
    function populateReportSources(governorate, administration) {
        const reportSourceSelect = document.getElementById('reportSource');
        reportSourceSelect.innerHTML = '<option value="">اختر...</option>'; // مسح الخيارات الحالية
        if (governorate && administration && allLocationsData[governorate] && allLocationsData[governorate][administration]) {
            allLocationsData[governorate][administration].sort().forEach(source => { // فرز أبجدي للمصادر
                reportSourceSelect.add(new Option(source, source));
            });
        }
    }

    // دالة لتحديد المحافظة بناءً على الإدارة الصحية من بيانات الإكسل
    function getGovernorateByAdministration(adminName) {
        if (!adminName) return null;
        const normalizedAdminName = normalizeArabicString(adminName);
        for (const govKey in allLocationsData) {
            if (allLocationsData.hasOwnProperty(govKey)) {
                const administrations = allLocationsData[govKey];
                for (const adminKey in administrations) {
                    // نستخدم normalizeArabicString للمقارنة بين اسم الإدارة المخزن والاسم الذي تم تطبيعه من الإكسل
                    if (administrations.hasOwnProperty(adminKey) && normalizeArabicString(adminKey) === normalizedAdminName) {
                        return govKey; // إرجاع اسم المحافظة الأصلي
                    }
                }
            }
        }
        return null; // الإدارة غير موجودة في أي محافظة مسجلة
    }

    // دالة لتعبئة قائمة الأقسام الثابتة للمستشفى
    function populateHospitalDepartments() {
        const sectionSelect = document.getElementById('section');
        sectionSelect.innerHTML = '<option value="">اختر...</option>';
        hospitalDepartments.sort().forEach(dept => { // فرز أبجدي للأقسام
            sectionSelect.add(new Option(dept, dept));
        });
    }

    // دالة لتعبئة قائمة الجنسيات العالمية في select dropdown
    function populateNationalitiesSelect() {
        const nationalitySelect = document.getElementById('nationality');
        nationalitySelect.innerHTML = '<option value="">اختر...</option>'; // مسح الخيارات القديمة
        nationalitiesList.sort().forEach(nationality => {
            const option = document.createElement('option');
            option.value = nationality;
            option.textContent = nationality;
            nationalitySelect.appendChild(option);
        });
    }

    // دالة للتحكم في حقل الرقم القومي/جواز السفر بناءً على الجنسية
    function handleNationalityChange() {
        const nationalitySelect = document.getElementById('nationality');
        const nationalIdLabel = document.getElementById('nationalIdLabel');
        const nationalIdInput = document.getElementById('nationalId');
        
        // استخدام normalizeArabicString للمقارنة بشكل موحد
        if (normalizeArabicString(nationalitySelect.value) === normalizeArabicString('مصرية')) {
            nationalIdLabel.textContent = 'الرقم القومي';
            nationalIdInput.placeholder = 'أدخل الرقم القومي';
        } else {
            nationalIdLabel.textContent = 'رقم جواز السفر';
            nationalIdInput.placeholder = 'أدخل رقم جواز السفر';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // تعبئة القوائم المنسدلة عند تحميل الصفحة
        populateGovernorates();
        populateHospitalDepartments(); // تعبئة أقسام المستشفى
        populateNationalitiesSelect(); // تعبئة قائمة الجنسيات

        // إضافة مستمعي الأحداث لتحديث القوائم المنسدلة بشكل ديناميكي
        document.getElementById('governorate').addEventListener('change', function() {
            const selectedGovernorate = this.value;
            populateAdministrations(selectedGovernorate);
        });

        document.getElementById('administration').addEventListener('change', function() {
            const selectedGovernorate = document.getElementById('governorate').value;
            const selectedAdministration = this.value;
            populateReportSources(selectedGovernorate, selectedAdministration);
        });

        // مستمع حدث لتغيير حقل الجنسية (لتغيير تسمية الرقم القومي/جواز السفر)
        const nationalitySelect = document.getElementById('nationality');
        nationalitySelect.addEventListener('change', handleNationalityChange);

        // تعبئة قائمة التشخيصات (كما كانت)
        const diagnosisSelect = document.getElementById('diagnosis');
        surveillanceDiseases.forEach(disease => {
            if (!Array.from(diagnosisSelect.options).some(opt => opt.value === disease)) {
                diagnosisSelect.add(new Option(disease, disease));
            }
        });
    });

    document.getElementById('excelFile').addEventListener('change', handleFile);

    // دالة لتطبيع النصوص العربية للمطابقة (تحسينات إضافية)
    function normalizeArabicString(str) {
        if (typeof str !== 'string') return '';
        str = str.trim();

        // 1. توحيد الألفات والياءات والتاءات المربوطة
        str = str.replace(/[\u0622\u0623\u0625]/g, '\u0627'); // Alef variants (آ أ إ) to bare Alef (ا)
        str = str.replace(/\u0649/g, '\u064A'); // Alef Maksura (ى) to Yeh (ي)
        str = str.replace(/\u0629/g, '\u0647'); // Taa Marbuta (ة) to Heh (ه)
        
        // 2. استبدالات الاختصارات الشائعة والتوحيد
        // نستخدم \b للتأكد من أنها مطابقة لكلمة كاملة (مثل "م." وليس جزء من كلمة "مطروح")
        str = str.replace(/\bم\s*\./g, 'مستشفى');   // Convert "م." or "م ." to "مستشفى"
        str = str.replace(/\bو\s*\./g, 'وحدة');     // Convert "و." or "و ." to "وحدة"
        str = str.replace(/ادارة\s*صحة\s*مركز/g, 'إدارة صحة مركز'); // Unify spacing for "ادارة صحة مركز"
        str = str.replace(/الرئه/g, 'الرئة'); // Correct "الرئه" to "الرئة"
        
        // 3. إزالة جميع الأحرف غير العربية/اللاتينية/الرقمية/المسافات (أكثر شمولاً)
        // هذا يساعد في التخلص من الرموز الخفية أو التي لا ينبغي أن تؤثر على المطابقة
        // النطاق: أحرف لاتينية صغيرة وكبيرة، أحرف عربية، أرقام، مسافات.
        str = str.replace(/[^a-zA-Z\u0600-\u06FF\u0030-\u0039\s]/g, ''); 

        // 4. دمج المسافات المتعددة إلى مسافة واحدة
        str = str.replace(/\s+/g, ' '); 

        return str.toLowerCase();
    }

    // دالة لربط عناوين أعمدة الإكسل بأسماء المتغيرات في الكود
    function mapColumnHeaders(headerRow) {
        columnIndexMap = {};
        console.log("صف العناوين الأصلي من الإكسل:", headerRow);

        const expectedHeaders = { 
            hospitalName: ["اسم المستشفى", "م. المستشفى", "مصدر الإبلاغ"], 
            disease: ["المرض", "الأعراض", "المرض العام"], 
            fullName: ["الاسم", "اسم المريض"],
            age: ["السن"],
            ageType: ["نوع العمر"],
            gender: ["النوع", "الجنس"],
            phone: ["رقم التليفون", "التليفون"],
            job: ["الوظيفة"],
            schoolName: ["اسم المدرسة فى حالة الطالب / مدرس", "اسم المدرسه في حاله الطالب / مدرس"],
            residenceAdmin: ["ادارة السكن", "ادارة السكن "], 
            detailedAddress: ["العنوان بالتفصيل", "العنوان"],
            department: ["القسم", "القسم "], // ** القسم: أضفت بديل بمسافة **
            finalDiagnosis: ["النتيجة النهائية", "التشخيص"], 
            nationalId: ["الرقم القومي", "رقم قومي", "الرقم القومى", "رقم قومى", "رقم قومي ", "national id", "nationalid"], 
            // ** الجنسية: أضفت بدائل أكثر شمولاً **
            nationality: ["الجنسية", "الجن سية", "الجنسيه", "جنسية", "الجنسية ", "الجنسيه ", "الجنسي ة", "nationality", "nationality "] 
            // ملاحظة: إذا كان اسم عمود الجنسية في الإكسل لا يزال لا يُطابق، يرجى التحقق من وجوده في ملف الإكسل بالضبط
        };

        if (!headerRow || headerRow.length === 0) {
            showError("لم يتم العثور على صف العناوين في ملف الإكسل.");
            return false;
        }

        const normalizedExcelHeaders = headerRow.map(h => normalizeArabicString(String(h || "")));
        console.log("صف العناوين بعد التطبيع العربي (للمقارنة):", normalizedExcelHeaders);
        console.log("ملاحظة هامة: إذا لم يتم جلب حقل 'الجنسية' أو 'القسم'، فتأكد من وجود هذا العمود بالضبط في ملف الإكسل وأن الخلية ليست فارغة.");


        let allCriticalColumnsFound = true; 

        for (const keyInCode in expectedHeaders) {
            const possibleExcelNames = expectedHeaders[keyInCode];
            let foundIndex = -1;

            for (const excelNameVariation of possibleExcelNames) {
                const normalizedExpectedName = normalizeArabicString(excelNameVariation);
                foundIndex = normalizedExcelHeaders.indexOf(normalizedExpectedName);
                if (foundIndex !== -1) {
                    break;
                }
            }

            if (foundIndex !== -1) {
                columnIndexMap[keyInCode] = foundIndex;
                console.log(`تم ربط: "${keyInCode}" بعمود الإكسل رقم ${foundIndex} (العنوان الأصلي: "${headerRow[foundIndex]}")`);
            } else {
                console.warn(`تحذير: لم يتم العثور على عمود مطابق لـ "${keyInCode}" (الأسماء المتوقعة المطبعة: ${possibleExcelNames.map(n => normalizeArabicString(n)).join(", ")})`);
                if (keyInCode === 'fullName' || keyInCode === 'finalDiagnosis') {
                    allCriticalColumnsFound = false; 
                }
            }
        }
        
        if (!allCriticalColumnsFound) {
             showError("أعمدة 'الاسم' و/أو 'النتيجة النهائية' مطلوبة ولم يتم العثور عليها في ملف الإكسل. لا يمكن متابعة المعالجة.");
             return false;
        }

        console.log("خريطة الأعمدة النهائية:", columnIndexMap);
        return true;
    }

    // دالة لاستنتاج الجنسية من الرقم القومي/جواز السفر
    function inferNationalityFromNationalId(nationalId) {
        if (!nationalId) {
            return ''; // لا يوجد رقم، لا يمكن الاستنتاج
        }
        // إزالة أي مسافات أو رموز من الرقم
        const cleanedId = String(nationalId).replace(/\D/g, ''); 
        
        // تحقق من النمط المصري (14 رقمًا ويبدأ بـ '2' أو '3' للدلالة على القرن)
        if (cleanedId.length === 14 && (cleanedId.startsWith('2') || cleanedId.startsWith('3'))) {
            return 'مصرية';
        }
        // يمكنك إضافة منطق آخر هنا لجنسيات أخرى إذا كان لديك نمط معروف
        return 'أجنبية'; // إذا لم يتطابق مع النمط المصري
    }


    // دالة لمعالجة ملف الإكسل المرفوع
    function handleFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: "" });

                    if (jsonData.length < 6) { 
                        showError("ملف الإكسل لا يحتوي على عدد كاف من الصفوف (العناوين + البيانات).");
                        populatePatientSelector([]);
                        return;
                    }

                    const titleHeaderRow = jsonData[3] ? jsonData[3].join(' ') : ""; 
                    const dateRegex = /(\d{1,2})\s*-\s*(\d{1,2})\s*-\s*(\d{4})/;
                    const dateMatch = titleHeaderRow.match(dateRegex);
                    let reportDateISO = "";
                    if (dateMatch) {
                        reportDateISO = `${dateMatch[3]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}`;
                    }

                    const reportTitleCell = jsonData[3] && (jsonData[3][3] || jsonData[3][2]) ? String(jsonData[3][3] || jsonData[3][2]).trim() : "البلاغ المؤقت بحالات الامراض المعدية";

                    const headerRowData = jsonData[4]; 
                    console.log("فحص صف العناوين قبل mapColumnHeaders:", headerRowData);
                    if (!mapColumnHeaders(headerRowData)) { 
                        console.error("فشل ربط الأعمدة، لن تتم معالجة البيانات.");
                        populatePatientSelector([]); 
                        return;
                    }

                    excelData = [];
                    for (let i = 5; i < jsonData.length; i++) { 
                        const row = jsonData[i];
                        if (!row || columnIndexMap.fullName === undefined || row[columnIndexMap.fullName] === undefined) {
                            console.warn(`تجاهل الصف ${i+1} بسبب بيانات مفقودة أو اسم مريض فارغ.`);
                            continue;
                        }
                        const patientNameValue = String(row[columnIndexMap.fullName] || "").trim();

                        if (patientNameValue && patientNameValue.toLowerCase() !== "اختر") {
                            const patientRecord = { reportDate: reportDateISO, reportTitle: reportTitleCell };
                            for (const keyInCode in columnIndexMap) { 
                                const excelColIndex = columnIndexMap[keyInCode];
                                if (excelColIndex !== undefined && row[excelColIndex] !== undefined) {
                                    patientRecord[keyInCode] = String(row[excelColIndex]).trim();
                                } else {
                                    patientRecord[keyInCode] = ""; 
                                }
                            }
                            // *** تعبئة المحافظة لكل سجل في excelData ***
                            // إذا لم يكن عمود "المحافظة" موجودًا مباشرة في الإكسل، نستنتجها من residenceAdmin
                            if (!patientRecord.governorate) { 
                                patientRecord.governorate = getGovernorateByAdministration(patientRecord.residenceAdmin);
                            }
                            // *** استنتاج الجنسية من الرقم القومي إذا لم يتم جلبها من الإكسل ***
                            // يتم استدعاء inferNationalityFromNationalId فقط إذا كانت patientRecord.nationality فارغة
                            if (!patientRecord.nationality) { 
                                patientRecord.nationality = inferNationalityFromNationalId(patientRecord.nationalId);
                            }
                            excelData.push(patientRecord);
                        }
                    }
                    populatePatientSelector(excelData); 
                    if (excelData.length === 0 && jsonData.length > 5) {
                        showError("لم يتم العثور على بيانات مرضى صالحة في الملف (قد تكون أسماء المرضى فارغة أو 'اختر').");
                    } else if (excelData.length === 0 && jsonData.length <= 5 ) {
                         showError("الملف لا يحتوي على صفوف بيانات للمرضى.");
                    }


                } catch (err) {
                    console.error("حدث خطأ أثناء معالجة ملف الإكسل:", err);
                    showError("حدث خطأ أثناء معالجة ملف الإكسل: " + err.message);
                    populatePatientSelector([]); 
                }
            };
            reader.onerror = function() {
                showError("حدث خطأ أثناء قراءة الملف.");
                populatePatientSelector([]);
            };
            reader.readAsArrayBuffer(file);
        }
    }

    // دالة لتعيين قيمة في قائمة منسدلة أو إضافتها إذا لم تكن موجودة
    function setSelectValueOrAddOption(selectElement, value) {
        const stringValue = String(value || "").trim();
        console.log(`----------------------------------------------------`);
        console.log(`[${selectElement.id}] ==> محاولة تعيين القيمة: "${stringValue}"`);

        if (stringValue === "") {
            selectElement.value = "";
            console.log(`[${selectElement.id}] القيمة من الإكسل فارغة. تم إعادة تعيين القائمة.`);
            console.log(`----------------------------------------------------`);
            return;
        }
        let optionExists = false;
        const stringValueNormalized = normalizeArabicString(stringValue); 

        for (let i = 0; i < selectElement.options.length; i++) {
            const optionValNormalized = normalizeArabicString(selectElement.options[i].value);
            const optionTextNormalized = normalizeArabicString(selectElement.options[i].text);

            console.log(`[${selectElement.id}] مقارنة مع الخيار [${i}]:`);
            console.log(`    النص الأصلي في الخيار: "${selectElement.options[i].text}"، النص المطبع: "${optionTextNormalized}"`);
            console.log(`    القيمة الأصلية في الخيار: "${selectElement.options[i].value}"، القيمة المطبعة: "${optionValNormalized}"`);

            if (optionValNormalized === stringValueNormalized || optionTextNormalized === stringValueNormalized) {
                selectElement.value = selectElement.options[i].value;
                optionExists = true;
                console.log(`[${selectElement.id}] !!!!! تم العثور على تطابق !!!!!`);
                console.log(`[${selectElement.id}] تم العثور على الخيار "${stringValue}" وتحديده في القائمة: ${selectElement.id}`);
                break;
            }
        }
        if (!optionExists) {
            // إذا لم يتم العثور على تطابق، أضف الخيار الجديد وتحديده.
            const newOption = new Option(stringValue, stringValue, false, true);
            selectElement.add(newOption);
            selectElement.value = stringValue;
            console.log(`تم إضافة خيار جديد "${stringValue}" وتحديده في القائمة المنسدلة: ${selectElement.id}`);
        }
        console.log(`[${selectElement.id}] القيمة النهائية المحددة في القائمة: "${selectElement.value}" (النص: "${selectElement.options[selectElement.selectedIndex]?.text || 'غير محدد'}")`);
        console.log(`----------------------------------------------------`);
    }

    // دالة لتعبئة حقول النموذج ببيانات مريض محدد
    function populateFormWithPatientData(patient) {
        resetAllForms();
        if (!patient) return;

        console.log("تعبئة النموذج ببيانات المريض:", patient);

        // 1. تعبئة المحافظة أولاً
        console.log(`[populateFormWithPatientData] محاولة تعبئة المحافظة بقيمة: "${patient.governorate}"`);
        setSelectValueOrAddOption(document.getElementById('governorate'), patient.governorate || '');
        const currentGovernorateValue = document.getElementById('governorate').value;

        // 2. تعبئة الإدارات بناءً على المحافظة المحددة وتعيين الإدارة
        if (currentGovernorateValue) {
            populateAdministrations(currentGovernorateValue);
        }
        console.log(`[populateFormWithPatientData] محاولة تعبئة الإدارة بقيمة: "${patient.residenceAdmin}"`);
        setSelectValueOrAddOption(document.getElementById('administration'), patient.residenceAdmin || '');
        const currentAdministrationValue = document.getElementById('administration').value;

        // 3. تعبئة مصادر الإبلاغ بناءً على المحافظة والإدارة المحددة وتعيين المصدر
        if (currentGovernorateValue && currentAdministrationValue) {
            populateReportSources(currentGovernorateValue, currentAdministrationValue);
        }
        console.log(`[populateFormWithPatientData] محاولة تعبئة مصدر الإبلاغ بقيمة: "${patient.hospitalName}"`);
        setSelectValueOrAddOption(document.getElementById('reportSource'), patient.hospitalName || '');
        
        // تعبئة القسم: يتم تعبئة القائمة بالكامل أولاً، ثم تعيين القيمة من الإكسل باستخدام setSelectValueOrAddOption
        populateHospitalDepartments(); // التأكد من تعبئة القائمة بالكامل أولاً
        console.log(`[populateFormWithPatientData] قيمة 'patient.department' من الإكسل قبل التعيين: "${patient.department}". (ملاحظة: إذا كانت هذه القيمة فارغة، فالرجاء مراجعة ملف الإكسل.)`);
        setSelectValueOrAddOption(document.getElementById('section'), patient.department || ""); 
        console.log(`[populateFormWithPatientData] قيمة 'section' بعد التعيين في النموذج: "${document.getElementById('section').value}"`);

        document.getElementById('discoveryDate').value = patient.reportDate || ""; 
        document.getElementById('discoveryTime').value = patient.discoveryTime || ""; 
        
        // تعبئة الجنسية: يجب أن تُجلب من الإكسل إذا كان العمود موجوداً
        console.log(`[populateFormWithPatientData] قيمة 'patient.nationality' من الإكسل قبل التعيين: "${patient.nationality}". (ملاحظة: إذا كانت هذه القيمة فارغة، فالرجاء مراجعة ملف الإكسل.)`);
        // استخدم setSelectValueOrAddOption لتعبئة الجنسية في الـ select dropdown الجديد
        setSelectValueOrAddOption(document.getElementById('nationality'), patient.nationality || 'مصرية'); 
        handleNationalityChange(); // تحديث حقل الرقم القومي/جواز السفر فور تعبئة الجنسية
        console.log(`[populateFormWithPatientData] قيمة 'nationality' بعد التعيين في النموذج: "${document.getElementById('nationality').value}"`);

        document.getElementById('nationalId').value = patient.nationalId || ''; // ** الرقم القومي **
        document.getElementById('relation').value = patient.relation || ''; 

        const nameParts = (patient.fullName || "").split(' ').map(s => s.trim()).filter(s => s);
        document.getElementById('firstName').value = nameParts[0] || '';
        document.getElementById('fatherName').value = nameParts[1] || '';
        document.getElementById('grandName').value = nameParts[2] || '';
        document.getElementById('familyName').value = nameParts.slice(3).join(' ') || '';
        document.getElementById('phone1').value = patient.phone || ''; 
        document.getElementById('phone2').value = patient.phone2 || ''; 
        setSelectValueOrAddOption(document.getElementById('gender'), (patient.gender || "").toLowerCase() === "ذكر" ? "ذكر" : ((patient.gender || "").toLowerCase().includes("انثى") ? "أنثى" : ""));
        document.getElementById('birthDate').value = patient.birthDate || "";
        document.getElementById('age').value = patient.age || '';

        const ageTypeSelect = document.getElementById('ageType');
        const ageTypeFromExcel = (patient.ageType || "").toLowerCase();
        if (ageTypeFromExcel.includes("سن") || ageTypeFromExcel.includes("سنين")) ageTypeSelect.value = "سنة";
        else if (ageTypeFromExcel.includes("شهر") || ageTypeFromExcel.includes("شهور")) ageTypeSelect.value = "شهر";
        else if (ageTypeFromExcel.includes("يوم") || ageTypeFromExcel.includes("ايام")) ageTypeSelect.value = "يوم";
        else ageTypeSelect.value = "";

        document.getElementById('maritalStatus').value = patient.maritalStatus || "";
        document.getElementById('jobCategory').value = (patient.job && patient.job.toLowerCase() === "طفل") ? "طفل" : ((patient.job && patient.job.toLowerCase() === "طالب") ? "طالب" : "");
        document.getElementById('job').value = patient.job || '';
        document.getElementById('workPlace').value = patient.workPlace || '';

        document.getElementById('cityResidence').value = patient.residenceAdmin || '';
        document.getElementById('detailedAddress').value = patient.detailedAddress || '';
        
        console.log(`[populateFormWithPatientData] قيمة 'patient.disease' من الإكسل: "${patient.disease}"`);
        document.getElementById('symptoms').value = patient.disease || '';
        console.log(`[populateFormWithPatientData] قيمة 'symptoms' بعد التعيين في النموذج: "${document.getElementById('symptoms').value}"`);


        console.log(`محاولة تعبئة حقل التشخيص للمريض ${patient.fullName} بالقيمة من الإكسل ("النتيجة النهائية"): "${patient.finalDiagnosis}"`);
        setSelectValueOrAddOption(document.getElementById('diagnosis'), patient.finalDiagnosis);
    }

    // دالة لتعبئة قائمة اختيار المرضى
    function populatePatientSelector(patients) {
        const selector = document.getElementById('patientSelector');
        selector.innerHTML = ''; // مسح الخيارات القديمة

        if (!patients || patients.length === 0) {
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = document.getElementById('excelFile').files.length > 0 ? "-- لا يوجد مرضى في الملف --" : "-- يرجى رفع ملف أولاً --";
            selector.appendChild(defaultOption);
            return;
        }
        
        const choosePatientOption = document.createElement('option');
        choosePatientOption.value = "";
        choosePatientOption.textContent = "-- اختر مريضاً --";
        selector.appendChild(choosePatientOption);

        patients.forEach((patient, index) => {
            const option = document.createElement('option');
            option.value = index.toString(); // استخدام فهرس المريض في مصفوفة excelData
            option.textContent = patient.fullName || `مريض ${index + 1} (بيانات غير كاملة)`;
            selector.appendChild(option);
        });

        selector.onchange = function() {
            const selectedIndex = this.value;
            if (selectedIndex !== "" && excelData[parseInt(selectedIndex)]) {
                populateFormWithPatientData(excelData[parseInt(selectedIndex)]);
            } else {
                resetAllForms();
            }
        };
    }

    // دالة لإعادة تعيين جميع حقول النموذج
    function resetAllForms() {
        document.querySelectorAll('form').forEach(form => form.reset());
        
        // إعادة تعيين القوائم المنسدلة الديناميكية وإعادة تعبئة المحافظات
        populateGovernorates(); 
        document.getElementById('administration').innerHTML = '<option value="">اختر...</option>';
        document.getElementById('reportSource').innerHTML = '<option value="">اختر...</option>';

        populateHospitalDepartments(); // إعادة تعبئة قائمة الأقسام
        populateNationalitiesSelect(); // إعادة تعبئة قائمة الجنسيات
        document.getElementById('nationality').value = "مصرية"; // قيمة افتراضية للجنسية (مهم أن تكون بعد populateNationalitiesSelect)
        handleNationalityChange(); // تحديث حقل الرقم القومي/جواز السفر بعد إعادة تعيين الجنسية
        document.getElementById('diagnosis').value = ""; // لضمان إعادة تعيين التشخيص
        
        // إزالة حدود التحقق الحمراء
        document.querySelectorAll('form [required]').forEach(input => {
            input.style.border = "";
        });
    }

    // دوال عرض الرسائل
    function showMessage(message, isError = false) {
        const messageElement = isError ? document.getElementById('errorMessage') : document.getElementById('saveMessage');
        const otherMessageElement = isError ? document.getElementById('saveMessage') : document.getElementById('errorMessage');
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        otherMessageElement.style.display = 'none';
        setTimeout(() => { messageElement.style.display = 'none'; }, 7000);
    }
    function showError(message) { showMessage(message, true); }

    // دالة مساعدة لجلب البيانات من حقول النموذج لحالة فردية
    function getFormDataForSinglePatient() {
        const generalForm = document.getElementById('generalForm');
        const demoForm = document.getElementById('demographicsForm');
        const residenceForm = document.getElementById('residenceForm');
        const symptomsForm = document.getElementById('symptomsForm');
        const diagnosisForm = document.getElementById('diagnosisForm');

        // الحصول على المريض المحدد حاليًا في القائمة المنسدلة للحالات (للحصول على قيم الإكسل الأصلية كـ fallback)
        const patientSelector = document.getElementById('patientSelector');
        const selectedIndex = patientSelector.value;
        const currentExcelPatient = (selectedIndex !== "" && excelData[parseInt(selectedIndex)]) ? excelData[parseInt(selectedIndex)] : {};

        // تتبع قيمة المرض العام من النموذج (للتصحيح)
        console.log(`[getFormDataForSinglePatient] قيمة 'symptoms' من النموذج: "${symptomsForm.elements.symptoms.value}"`);

        return {
            // General Tab
            governorate: generalForm.elements.governorate.options[generalForm.elements.governorate.selectedIndex]?.text || '',
            administration: generalForm.elements.administration.options[generalForm.elements.administration.selectedIndex]?.text || '',
            reportSource: generalForm.elements.reportSource.options[generalForm.elements.reportSource.selectedIndex]?.text || '',
            section: generalForm.elements.section.options[generalForm.elements.section.selectedIndex]?.text || '',
            discoveryDate: generalForm.elements.discoveryDate.value || '',
            discoveryTime: generalForm.elements.discoveryTime.value || '',
            nationality: generalForm.elements.nationality.value || '',
            nationalId: generalForm.elements.nationalId.value || '',
            relation: generalForm.elements.relation.value || '',

            // Demographics Tab
            firstName: demoForm.elements.firstName.value || '',
            fatherName: demoForm.elements.fatherName.value || '',
            grandName: demoForm.elements.grandName.value || '',
            familyName: demoForm.elements.familyName.value || '',
            phone1: demoForm.elements.phone1.value || '',
            phone2: demoForm.elements.phone2.value || '',
            gender: demoForm.elements.gender.options[demoForm.elements.gender.selectedIndex]?.text || '',
            birthDate: demoForm.elements.birthDate.value || '',
            age: demoForm.elements.age.value || '',
            ageType: demoForm.elements.ageType.options[demoForm.elements.ageType.selectedIndex]?.text || '',
            maritalStatus: demoForm.elements.maritalStatus.options[demoForm.elements.maritalStatus.selectedIndex]?.text || '',
            jobCategory: demoForm.elements.jobCategory.options[demoForm.elements.jobCategory.selectedIndex]?.text || '',
            job: demoForm.elements.job.value || '',
            workPlace: demoForm.elements.workPlace.value || '',

            // Residence Tab
            cityResidence: residenceForm.elements.cityResidence.value || '',
            detailedAddress: residenceForm.elements.detailedAddress.value || '',

            // Symptoms Tab: استخدام قيمة النموذج أولاً، ثم fallback لقيمة الإكسل الأصلية
            symptoms: symptomsForm.elements.symptoms.value || currentExcelPatient.disease || '', 

            // Diagnosis Tab
            diagnosis: diagnosisForm.elements.diagnosis.options[diagnosisForm.elements.diagnosis.selectedIndex]?.text || '',

            // Combine for full name if needed for single view
            fullName: `${demoForm.elements.firstName.value} ${demoForm.elements.fatherName.value} ${demoForm.elements.grandName.value} ${demoForm.elements.familyName.value}`.trim()
        };
    }

    // دالة لإنشاء تقرير HTML (لحالة فردية أو كل الحالات)
    function generateReportHTML(patientsToReport, isBatchMode = false) {
        // التحقق من الصحة: يتم تطبيقه فقط إذا كان التقرير لحالة فردية يتم تعديلها في النموذج
        if (!isBatchMode) {
            let validationPassed = true;
            const requiredFields = document.querySelectorAll('form [required]');
            requiredFields.forEach(input => {
                if (!input.value.trim()) {
                    input.style.border = "2px solid red";
                    validationPassed = false;
                } else {
                    input.style.border = ""; // إعادة تعيين الحدود إذا كانت صالحة
                }
            });

            if (!validationPassed) {
                showError("يرجى ملء جميع الحقول المطلوبة (*).");
                return null;
            }
        } else {
             // مسح أي أخطاء تحقق سابقة عند التبديل إلى وضع الدفعة
            document.querySelectorAll('form [required]').forEach(input => {
                input.style.border = "";
            });
        }

        let tableHtml = "<table class='saved-data-formatted-data' id='reportTable'><thead><tr>";
        // تحديث عناوين الأعمدة في التقرير لتشمل "الرقم القومي"
        const headers = ["م", "اسم المستشفى/مصدر الإبلاغ", "المرض العام", "الاسم الكامل", "السن", "نوع العمر", "النوع", "رقم التليفون", "الوظيفة", "ادارة السكن", "العنوان بالتفصيل", "القسم", "النتيجة النهائية", "المحافظة", "تاريخ الاكتشاف", "الجنسية", "الرقم القومي"];
        headers.forEach(h => tableHtml += `<th>${h}</th>`);
        tableHtml += "</tr></thead><tbody>";

        let reportTitle;
        let reportDateForDisplay;

        if (isBatchMode) {
            reportTitle = "تقرير بجميع حالات الأمراض المعدية";
            const today = new Date();
            reportDateForDisplay = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        } else {
            const patientSelector = document.getElementById('patientSelector');
            const selectedPatientOriginalIndex = patientSelector.value !== "" ? parseInt(patientSelector.value) : -1;
            const excelPatientRecord = selectedPatientOriginalIndex !== -1 && excelData[selectedPatientOriginalIndex] ? excelData[selectedPatientOriginalIndex] : {};
            
            reportTitle = excelPatientRecord.reportTitle || document.title || "بيانات النموذج"; // استخدم عنوان الإكسل الأصلي إن وجد
            reportDateForDisplay = document.getElementById('discoveryDate').value || "تاريخ غير محدد"; // استخدم تاريخ النموذج الحالي
            if (reportDateForDisplay.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const parts = reportDateForDisplay.split('-');
                reportDateForDisplay = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        }

        patientsToReport.forEach((patient, index) => {
            const patientDataSource = isBatchMode ? patient : getFormDataForSinglePatient();

            tableHtml += `<tr>`;
            tableHtml += `<td>${index + 1}</td>`;
            tableHtml += `<td>${patientDataSource.reportSource || patientDataSource.hospitalName || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.symptoms || patientDataSource.disease || 'N/A'}</td>`;

            let fullName = "";
            if (isBatchMode) { 
                fullName = patientDataSource.fullName || "";
            } else {
                fullName = patientDataSource.fullName; 
            }
            tableHtml += `<td>${fullName.trim()}</td>`;

            tableHtml += `<td>${patientDataSource.age || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.ageType || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.gender || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.phone1 || patientDataSource.phone || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.job || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.administration || patientDataSource.residenceAdmin || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.detailedAddress || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.section || patientDataSource.department || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.diagnosis || patientDataSource.finalDiagnosis || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.governorate || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.discoveryDate || patientDataSource.reportDate || 'N/A'}</td>`;
            tableHtml += `<td>${patientDataSource.nationality || 'N/A'}</td>`; // ** الجنسية في التقرير **
            tableHtml += `<td>${patientDataSource.nationalId || 'N/A'}</td>`; // ** الرقم القومي في التقرير **
            tableHtml += `</tr>`;
        });

        tableHtml += "</tbody></table>";

        // إضافة أزرار التصدير في صفحة التقرير الجديدة
        const exportButtonsHtml = `
            <div class="export-buttons-container">
                <button id="exportExcel">تصدير كـ Excel</button>
                <button id="exportPdf">تصدير كـ PDF</button>
                <button id="exportWord">تصدير كـ Word</button>
            </div>
        `;

        // دالة JavaScript التي ستُضاف داخل النافذة المنبثقة
        const inlineScript = `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const reportTable = document.getElementById('reportTable');
                    const reportTitle = document.querySelector('.saved-data-report-title-main').textContent;
                    const reportDate = document.querySelector('.saved-data-report-date-line').textContent.replace('عن يوم الموافق ', '').trim();

                    // دالة تصدير Excel
                    document.getElementById('exportExcel').addEventListener('click', function() {
                        if (!reportTable) {
                            alert('لا يوجد جدول لتصديره.');
                            return;
                        }
                        const ws = XLSX.utils.table_to_sheet(reportTable);
                        const wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, "التقرير");
                        XLSX.writeFile(wb, \`\${reportTitle} - \${reportDate}.xlsx\`);
                    });

                    // دالة تصدير PDF
                    document.getElementById('exportPdf').addEventListener('click', function() {
                        const { jsPDF } = window.jspdf;
                        const pdf = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4' });
                        pdf.html(document.body, { // تصدير كامل محتوى body النافذة
                            callback: function (doc) {
                                doc.save(\`\${reportTitle} - \${reportDate}.pdf\`);
                            },
                            x: 15, y: 15,
                            html2canvas: { 
                                scale: 0.65, 
                                useCORS: true, 
                                logging: true, 
                                letterRendering: true, 
                                windowWidth: document.body.scrollWidth, 
                                windowHeight: document.body.scrollHeight 
                            },
                            width: pdf.internal.pageSize.getWidth() - 30,
                            windowWidth: document.body.scrollWidth // استخدام عرض الـ body لتجنب الاقتصاص
                        });
                    });

                    // دالة تصدير Word (HTML to DOC hack)
                    document.getElementById('exportWord').addEventListener('click', function() {
                        const content = document.body.innerHTML; // الحصول على كامل محتوى الـ body
                        const fileName = \`\${reportTitle} - \${reportDate}.doc\`;
                        
                        // إضافة رأس ملف Word الأساسي لضمان التنسيق
                        const htmlDoc = \`
                            <html xmlns:v="urn:schemas-microsoft-com:vml"
                            xmlns:o="urn:schemas-microsoft-com:office:office"
                            xmlns:w="urn:schemas-microsoft-com:office:word"
                            xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
                            xmlns="http://www.w3.org/TR/REC-html40">
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                <meta name=ProgId content=Word.Document>
                                <meta name=Generator content="Microsoft Word 15">
                                <meta name=Originator content="Microsoft Word 15">
                                <style>
                                    /* تضمين الـ CSS الخاص بالتقرير هنا */
                                    body { margin: 20px; font-family: 'Arial Unicode MS', Arial, sans-serif; direction: rtl; }
                                    .report-header { text-align: center; margin-bottom: 20px; }
                                    .report-title-main { font-size: 16px; font-weight: bold; }
                                    .report-date-line { font-size: 14px; margin-top: 5px; }
                                    .saved-data-formatted-data { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10pt; }
                                    .saved-data-formatted-data th, .saved-data-formatted-data td { border: 1px solid #000; padding: 4px; text-align: center; vertical-align: middle; word-wrap: break-word; }
                                    .saved-data-formatted-data th { background-color: #e0e0e0; font-weight: bold; }
                                    .export-buttons-container { display: none; } /* إخفاء الأزرار في ملف Word */
                                </style>
                            </head>
                            <body dir="rtl">
                                \${content}
                            </body>
                            </html>
                        \`;

                        const blob = new Blob([htmlDoc], { type: 'application/msword;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    });
                });
            </script>
        `;


        return `
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>${reportTitle}</title>
                <style>
                    body { margin: 20px; font-family: 'Arial Unicode MS', Arial, sans-serif; direction: rtl; }
                    .report-header { text-align: center; margin-bottom: 20px; }
                    .report-title-main { font-size: 16px; font-weight: bold; }
                    .report-date-line { font-size: 14px; margin-top: 5px; }
                    .saved-data-formatted-data { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10pt; }
                    .saved-data-formatted-data th, .saved-data-formatted-data td { border: 1px solid #000; padding: 4px; text-align: center; vertical-align: middle; word-wrap: break-word; }
                    .saved-data-formatted-data th { background-color: #e0e0e0; font-weight: bold; }
                    .export-buttons-container { text-align: center; margin-top: 20px; }
                    .export-buttons-container button { margin: 5px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;}
                    .export-buttons-container button:hover { background: #218838; }

                    @media print {
                        .export-buttons-container { display: none; }
                    }
                </style>
            </head>
            <body class="saved-data-window-body">
                <div class="report-header saved-data-report-header">
                    <div class="report-title-main saved-data-report-title-main">${reportTitle}</div>
                    <div class="report-date-line saved-data-report-date-line">عن يوم الموافق ${reportDateForDisplay}</div>
                </div>
                ${tableHtml}
                ${exportButtonsHtml}
                ${inlineScript}
            </body>
            </html>`;
    }

    // دالة لإزالة المريض المحدد من القائمة المنسدلة (اختياري)
    function removeCurrentPatientFromSelector() {
        const selector = document.getElementById('patientSelector');
        const selectedOptionValue = selector.value; 

        if (selectedOptionValue !== "") { 
            const selectedIndexInOptions = selector.selectedIndex;
            if (selectedIndexInOptions > 0) { 
                selector.remove(selectedIndexInOptions);
            }

            selector.value = ""; 
            resetAllForms();

            if (selector.options.length <= 1) { 
                 if (selector.options.length === 1 && selector.options[0].value === "") { 
                    selector.options[0].textContent = "-- لا يوجد مرضى متبقون --";
                 }
            }
        }
    }

    // معالج حدث زر "عرض التقرير" (كان saveButton)
    document.getElementById('showReportButton').addEventListener('click', () => {
        const patientSelector = document.getElementById('patientSelector');
        const selectedIndex = patientSelector.value;
        let reportHtmlContent;

        if (selectedIndex === "") { // لم يتم اختيار مريض، عرض جميع المرضى
            if (excelData.length === 0) {
                showError("لا توجد بيانات مرضى في الذاكرة لإنشاء تقرير جماعي. يرجى رفع ملف إكسل أولاً.");
                return;
            }
            reportHtmlContent = generateReportHTML(excelData, true); // true لوضع الدفعة
            if (!reportHtmlContent) return; 

            const formWindow = window.open("about:blank", "_blank");
            if(formWindow){
                formWindow.document.write(reportHtmlContent);
                formWindow.document.close();
                showMessage("تم عرض جميع بيانات المرضى بنجاح!");
            } else {
                showError("تعذر فتح نافذة جديدة. يرجى التحقق من إعدادات مانع النوافذ المنبثقة.");
            }
        } else { // تم اختيار مريض، عرض تقرير المريض الفردي من بيانات النموذج الحالية
            reportHtmlContent = generateReportHTML([getFormDataForSinglePatient()], false); // false لوضع الفردي
            if (!reportHtmlContent) return; 

            const formWindow = window.open("about:blank", "_blank");
            if(formWindow){
                formWindow.document.write(reportHtmlContent);
                formWindow.document.close();
                showMessage("تم عرض البيانات بنجاح!");
                removeCurrentPatientFromSelector(); // إزالة المريض فقط في وضع العرض الفردي بعد الحفظ
            } else {
                showError("تعذر فتح نافذة جديدة. يرجى التحقق من إعدادات مانع النوافذ المنبثقة.");
            }
        }
    });

    // معالج حدث زر "تحميل PDF (النموذج الحالي)" (كان save-pdf)
    document.getElementById('downloadPdfButton').addEventListener('click', () => {
        const patientSelector = document.getElementById('patientSelector');
        const selectedIndex = patientSelector.value;
        let reportHtmlContent;

        // Note: This PDF download uses the original jspdf logic for the current form data,
        // it doesn't open a new window first.
        reportHtmlContent = generateReportHTML(selectedIndex === "" ? excelData : [getFormDataForSinglePatient()], selectedIndex === "");
        if (!reportHtmlContent) return;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4' });

        // لإزالة الأزرار من PDF الذي يتم إنشاؤه من الصفحة الرئيسية
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = reportHtmlContent;
        const buttonsContainer = tempDiv.querySelector('.export-buttons-container');
        if (buttonsContainer) {
            buttonsContainer.remove(); // إزالة أزرار التصدير من HTML قبل تحويله إلى PDF
        }

        pdf.html(tempDiv.innerHTML, {
            callback: function (doc) {
                const reportTitle = selectedIndex === "" ? "all_patients_report" : "single_patient_report";
                const today = new Date();
                const fileNameDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
                doc.save(`${reportTitle}_${fileNameDate}.pdf`);
                showMessage("تم إنشاء ملف PDF بنجاح!");
                if (selectedIndex !== "") {
                    removeCurrentPatientFromSelector(); // إزالة المريض فقط في وضع العرض الفردي بعد الحفظ
                }
            },
            x: 15, y: 15,
            html2canvas: { 
                scale: 0.65, 
                useCORS: true, 
                logging: true, 
                letterRendering: true, 
                windowWidth: document.documentElement.scrollWidth, 
                windowHeight: document.documentElement.scrollHeight 
            },
            width: pdf.internal.pageSize.getWidth() - 30,
            windowWidth: 1200
        });
    });


    // معالج حدث التبديل بين الألسنة
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });
