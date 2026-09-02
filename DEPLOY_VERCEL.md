# نشر Signs of the Hour على Vercel — حسب الواجهة الحالية

## أولاً: ما الذي تم إنجازه؟

المستودع الفعلي هو:

`https://github.com/OMDApay/Signs-of-the-Hour`

تم رفع الكود إلى فرع `main`. وعند التحقق من GitHub كان المستودع في البداية فارغاً بلا فروع، ولذلك لم يكن يظهر في Vercel. أصبح الآن غير فارغ وفرعه الافتراضي هو `main`.

## لماذا لا يظهر المستودع في شاشة New Project؟

الشاشة التي تظهر لديك تعرض مستودعات من حساب GitHub المسموح لتطبيق Vercel بالوصول إليه. في الصورة يظهر نطاق حساب مختلف مثل `galalemad75-creator`، بينما المستودع الذي تم رفعه موجود تحت المالك `OMDApay`. لذلك عدم ظهوره لا يعني أن المستودع غير موجود؛ غالباً يعني أن Vercel لم يحصل بعد على صلاحية رؤية هذا المالك أو هذا المستودع.

## المسار المطابق للشاشة التي أمامك

1. من شاشة **New Project** اضغط الزر الموجود فعلاً باسم **Import Git Repository**.
2. إذا ظهرت قائمة الحسابات أو النطاقات، اختر حساب GitHub الذي يملك المستودع. ابحث عن `OMDApay`، وليس `galalemad75-creator`، ما لم تكن قد نقلت المستودع إلى ذلك الحساب.
3. في خانة **Search** اكتب الاسم الكامل أو جزءاً منه: `Signs-of-the-Hour`.
4. إذا لم يظهر المستودع، استخدم الرابط المباشر من مربع الإدخال العلوي الذي يقول: **Ask v0 to build or enter a Git repository URL…** والصق:

   `https://github.com/OMDApay/Signs-of-the-Hour`

5. إذا طلبت Vercel صلاحية GitHub، وافق على تثبيت تطبيق Vercel لحساب GitHub الصحيح، واختر المستودع `Signs-of-the-Hour` ضمن المستودعات المسموح بها. إذا كان التطبيق مضبوطاً على مستودعات محددة، يجب إضافة هذا المستودع يدوياً من إعدادات GitHub لتطبيق Vercel.
6. ارجع إلى شاشة **New Project**، وافتح **Import Git Repository** مرة أخرى، ثم ابحث عن المستودع.

## إعدادات المشروع بعد اختيار المستودع

اترك **Root Directory** عند جذر المستودع، أي لا تختَر مجلد `client`. إذا ظهرت إعدادات البناء، استخدم القيم التالية:

| الحقل الظاهر | القيمة |
|---|---|
| Framework Preset | Vite، إن ظهر الحقل |
| Root Directory | `.` أو جذر المستودع |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Output Directory | `dist/public` |

ملف `vercel.json` موجود بالفعل في جذر المستودع ويحتوي هذه الإعدادات، لذلك لا تغيّرها إلا إذا عرضت Vercel قيمة مختلفة صراحةً.

بعدها اضغط زر **Deploy** الظاهر في شاشة إعداد المشروع. لا تحتاج هذه النسخة إلى Environment Variables أو قاعدة بيانات لتشغيل الواجهة.

## كيف تعرف أن النشر نجح؟

افتح رابط Vercel الناتج وتحقق من ظهور عنوان «علامات الساعة» وصورة الساعة. جرّب زر **English**، ثم مرّر إلى قسم المراحل واضغط **اقرأ الأحاديث**. إذا ظهرت هذه العناصر فالموقع يعمل فعلاً وليس صفحة بيضاء.

## التحديثات المستقبلية بنفسك

من جهازك، نفّذ الأوامر التالية:

```bash
git clone https://github.com/OMDApay/Signs-of-the-Hour.git
cd Signs-of-the-Hour
pnpm install
pnpm build
git checkout main
# بعد تعديل الملفات
git add .
git commit -m "Describe the update"
git push origin main
```

بعد ربط مشروع Vercel بالمستودع، تنشئ Vercel معاينات للفروع الأخرى، وتُنشر التغييرات إلى الموقع الإنتاجي عند الدفع إلى فرع الإنتاج، وغالباً يكون `main`.[1] إذا لم يكن `main` هو فرع الإنتاج، افتح مشروعك في Vercel ثم **Settings → Environments → Production → Branch Tracking**، اكتب `main`، ثم اضغط **Save**.[2]

## إذا ظهرت صفحة بيضاء

افحص هذه النقاط بالترتيب: يجب أن يكون المستودع هو `OMDApay/Signs-of-the-Hour`، ويجب أن يكون **Root Directory** هو الجذر وليس `client`، ويجب أن يكون **Output Directory** هو `dist/public`. افتح **Build Logs** في Vercel وابحث عن أول خطأ في البناء. إذا نجح البناء ولم تظهر الصفحة، افتح أدوات المطور في المتصفح وتحقق من أخطاء JavaScript أو أخطاء تحميل `/assets/ashrat-hero.webp`.

## ملاحظة أمنية

لا ترسل كلمة مرور GitHub أو Vercel أو رمز الدخول في المحادثة أو البريد. منح الصلاحية يتم من صفحة GitHub الرسمية، ويمكن إلغاء صلاحية تطبيق Vercel لاحقاً من إعدادات GitHub.

## المراجع

[1] [Vercel — Deploying Git Repositories](https://vercel.com/docs/git)

[2] [Vercel — How to use a non-default branch for production deployments](https://vercel.com/kb/guide/can-i-use-a-non-default-branch-for-production)

[3] [Vercel — How to fix an unavailable GitHub repository](https://vercel.com/kb/guide/unable-to-find-github-repository)
