# نشر موقع Signs of the Hour بنفسك

## الوضع الحالي

المستودع موجود هنا: https://github.com/OMDApay/Signs-of-the-Hour

الفرع الأساسي الآن هو `main`، وقد تم رفع الكود والصور وإعداد `vercel.json`. تم اختبار البناء محلياً بنجاح، كما أن نسخة المعاينة تعمل وتُظهر العنوان والمحتوى والصور، وليست صفحة بيضاء.

## الطريقة الأسهل من لوحة Vercel

1. افتح https://vercel.com/new وسجّل الدخول إلى حسابك.
2. اختر **Import Git Repository** ثم اختر مستودع `OMDApay/Signs-of-the-Hour`.
3. اترك **Root Directory** على جذر المشروع (`.`)، ولا تختَر مجلد `client`.
4. اترك إعدادات البناء كما هي؛ ملف `vercel.json` يحدد تلقائياً:
   - Framework: Vite
   - Install Command: `pnpm install --frozen-lockfile`
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
5. اضغط **Deploy** وانتظر انتهاء البناء.
6. افتح رابط Vercel الناتج. تحقق من ظهور صورة الساعة والعناوين، ثم اضغط **English**، وبعدها افتح زر **اقرأ الأحاديث / Read the hadiths**.

لا تحتاج هذه النسخة إلى متغيرات بيئية أو قاعدة بيانات لتعمل كواجهة قراءة ثابتة.

## التحديثات المستقبلية

بعد تعديل الملفات محلياً، استخدم الأوامر التالية من داخل مجلد المشروع:

```bash
git checkout main
git pull origin main
pnpm install
pnpm build
git add .
git commit -m "Describe the update"
git push origin main
```

إذا كان أول رفع من جهازك، استخدم رابط المستودع كوجهة `origin`:

```bash
git remote add origin https://github.com/OMDApay/Signs-of-the-Hour.git
git push -u origin main
```

بعد كل `push` إلى `main` سيبدأ Vercel عملية نشر جديدة تلقائياً إذا تم تفعيل الربط من إعدادات المشروع.

## اختبار محلي قبل الرفع

```bash
pnpm install
pnpm build
pnpm dev
```

ثم افتح الرابط الذي يظهره Vite. يجب أن ترى الصفحة الرئيسية، وألا تكون وحدة التحكم مليئة بأخطاء تحميل الصور أو JavaScript.

## إذا ظهرت صفحة بيضاء

تحقق أولاً من أن **Root Directory** هو جذر المستودع وليس `client`. ثم تأكد من أن أمر البناء هو `pnpm build` وأن مجلد الإخراج هو `dist/public`. افتح تبويب **Build Logs** في Vercel وابحث عن أول خطأ، لا عن آخر سطر فقط.

إذا ظهرت الصفحة لكن الصور مفقودة، تأكد من وجود الملفات الخمسة داخل `client/public/assets/` ومن استخدام مسارات تبدأ بـ `/assets/`. إذا كان البناء ناجحاً والصفحة فارغة، افتح أدوات المطور في المتصفح وتحقق من أخطاء JavaScript، ثم أعد النشر بعد مسح الكاش من خيار **Redeploy**.

## ملاحظة أمنية

لا ترسل كلمة مرور GitHub أو Vercel أو رموز الدخول عبر البريد أو المحادثة. الربط الصحيح يتم من خلال شاشة GitHub/Vercel نفسها، ويمكنك إلغاء الصلاحيات من إعدادات الحساب في أي وقت.
