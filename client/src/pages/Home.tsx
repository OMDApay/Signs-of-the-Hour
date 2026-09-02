/*
Design philosophy: «أفق الآخرة» — editorial cinematic, reverent, and source-aware.
This page uses a deep navy/ivory/antique-gold palette, symbolic imagery, a chronological journey,
and read-only content. No edit controls are rendered anywhere in the application.
*/

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  BookOpen,
  Check,
  ExternalLink,
  Globe2,
  Library,
  Menu,
  Moon,
  Quote,
  ShieldCheck,
  X,
} from "lucide-react";

type Language = "ar" | "en";
type SectionKey = "past" | "present" | "future" | "major";

type Hadith = {
  ar: string;
  en: string;
  sourceAr: string;
  sourceEn: string;
  tagAr: string;
  tagEn: string;
};

type SectionData = {
  key: SectionKey;
  number: string;
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  imageAltAr: string;
  imageAltEn: string;
  accent: string;
  hadiths: Hadith[];
};

const ASSETS = {
  hero: "/assets/ashrat-hero.webp",
  past: "/assets/ashrat-past.webp",
  present: "/assets/ashrat-present.webp",
  future: "/assets/ashrat-future.webp",
  major: "/assets/ashrat-major.webp",
};

const sections: SectionData[] = [
  {
    key: "past",
    number: "01",
    eyebrowAr: "المحور الأول",
    eyebrowEn: "Chapter one",
    titleAr: "علامات انقضت",
    titleEn: "Signs that have passed",
    descriptionAr: "أشراط ظهرت في صدر الإسلام أو وقعت بعده، فكانت تذكيراً بصدق الخبر النبوي وبأن الزمن يمضي نحو غايته التي لا يعلم وقتها إلا الله.",
    descriptionEn: "Signs that appeared in the early history of Islam or soon after it — reminders that the prophetic account is true, while the Hour remains known only to Allah.",
    image: ASSETS.past,
    imageAltAr: "مخطوطة رمزية في أرشيف تاريخي",
    imageAltEn: "A symbolic manuscript in a historical archive",
    accent: "ochre",
    hadiths: [
      { ar: "بُعِثْتُ أَنَا وَالسَّاعَةَ كَهَاتَيْنِ، وَيُشِيرُ بِإِصْبَعَيْهِ فَيَمُدُّ بِهِمَا.", en: "I was sent and the Hour are like these two; and he gestured with his two fingers.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "بعثة النبي ﷺ", tagEn: "The Prophet’s mission" },
      { ar: "اعْدُدْ سِتًّا بَيْنَ يَدَيِ السَّاعَةِ: مَوْتِي، ثُمَّ فَتْحُ بَيْتِ الْمَقْدِسِ، ثُمَّ مُوتَانٌ...", en: "Count six signs before the Hour: my death, then the conquest of Jerusalem, then a widespread mortality…", sourceAr: "رواه البخاري", sourceEn: "Reported by al-Bukhari", tagAr: "حديث عوف بن مالك", tagEn: "The hadith of Awf ibn Malik" },
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى يُبْعَثَ دَجَّالُونَ كَذَّابُونَ قَرِيبٌ مِنْ ثَلَاثِينَ، كُلٌّ يَزْعُمُ أَنَّهُ رَسُولُ اللَّهِ.", en: "The Hour will not come until nearly thirty impostors appear, each claiming to be a messenger of Allah.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "ظهور الدجاجلة", tagEn: "Impostors" },
    ],
  },
  {
    key: "present",
    number: "02",
    eyebrowAr: "المحور الثاني",
    eyebrowEn: "Chapter two",
    titleAr: "علامات نعيشها",
    titleEn: "Signs we witness",
    descriptionAr: "أوصاف تتكرر في المجتمعات والسنين، لا لتبرير اليأس أو إطلاق الأحكام على الناس، بل لتجديد الوعي والأمانة والعمل الصالح.",
    descriptionEn: "Patterns that recur across societies and generations — not a license for despair or judgment, but a call to renew integrity, awareness, and good works.",
    image: ASSETS.present,
    imageAltAr: "مدينة حديثة ومبانٍ شاهقة عند الغروب",
    imageAltEn: "A modern skyline of high-rise buildings at dusk",
    accent: "blue",
    hadiths: [
      { ar: "إِذَا ضُيِّعَتِ الْأَمَانَةُ فَانْتَظِرِ السَّاعَةَ. قِيلَ: كَيْفَ إِضَاعَتُهَا؟ قَالَ: إِذَا أُسْنِدَ الْأَمْرُ إِلَى غَيْرِ أَهْلِهِ فَانْتَظِرِ السَّاعَةَ.", en: "When trust is lost, then await the Hour. He was asked how it would be lost, and said: when authority is entrusted to those unqualified for it.", sourceAr: "رواه البخاري", sourceEn: "Reported by al-Bukhari", tagAr: "ضياع الأمانة", tagEn: "Loss of trust" },
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى يَكْثُرَ الْهَرْجُ. قَالُوا: وَمَا الْهَرْجُ؟ قَالَ: الْقَتْلُ الْقَتْلُ.", en: "The Hour will not come until al-harj becomes frequent. They asked, ‘What is al-harj?’ He said: killing, killing.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "كثرة الهرج", tagEn: "Violence and turmoil" },
      { ar: "أَنْ تَرَى الْحُفَاةَ الْعُرَاةَ الْعَالَةَ رِعَاءَ الشَّاءِ يَتَطَاوَلُونَ فِي الْبُنْيَانِ.", en: "That you see barefoot, destitute shepherds competing in constructing lofty buildings.", sourceAr: "من حديث جبريل — رواه مسلم", sourceEn: "From the Hadith of Jibril — reported by Muslim", tagAr: "التطاول في البنيان", tagEn: "Competing in height" },
      { ar: "لَيَكُونَنَّ مِنْ أُمَّتِي أَقْوَامٌ يَسْتَحِلُّونَ الْحِرَ وَالْحَرِيرَ وَالْخَمْرَ وَالْمَعَازِفَ.", en: "Among my ummah there will be people who deem lawful illicit relations, silk, wine, and musical instruments.", sourceAr: "رواه البخاري تعليقاً، وصححه جمع من أهل الحديث", sourceEn: "Reported by al-Bukhari in suspended form; authenticated by a number of hadith scholars", tagAr: "الاستحلال والفساد", tagEn: "Moral corruption" },
    ],
  },
  {
    key: "future",
    number: "03",
    eyebrowAr: "المحور الثالث",
    eyebrowEn: "Chapter three",
    titleAr: "علامات مستقبلية",
    titleEn: "Future minor signs",
    descriptionAr: "أشراط لم يثبت وقوعها بعد في المادة المعتمدة هنا. نعرضها بصيغة النقل لا بصيغة التنبؤ، ونردّ علم وقتها إلى الله وحده.",
    descriptionEn: "Signs not established as having occurred in the sources used here. They are presented as transmitted reports, never as predictions; their timing belongs to Allah alone.",
    image: ASSETS.future,
    imageAltAr: "وادي أخضر ونهر في أرض عربية",
    imageAltEn: "A green valley and river in an Arabian landscape",
    accent: "green",
    hadiths: [
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى تَخْرُجَ نَارٌ مِنْ أَرْضِ الْحِجَازِ تُضِيءُ أَعْنَاقَ الْإِبِلِ بِبُصْرَى.", en: "The Hour will not come until a fire emerges from the land of Hijaz and illuminates the necks of camels at Busra.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "نار الحجاز", tagEn: "The fire of Hijaz" },
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى تَعُودَ أَرْضُ الْعَرَبِ مُرُوجًا وَأَنْهَارًا.", en: "The Hour will not come until the land of Arabia returns to meadows and rivers.", sourceAr: "رواه مسلم", sourceEn: "Reported by Muslim", tagAr: "عودة أرض العرب", tagEn: "Arabia’s return to green land" },
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى تَقْتَتِلَ فِئَتَانِ عَظِيمَتَانِ، دَعْوَاهُمَا وَاحِدَةٌ.", en: "The Hour will not come until two great groups fight one another, while their claim is one.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "اقتتال الفئتين", tagEn: "Two great groups" },
    ],
  },
  {
    key: "major",
    number: "04",
    eyebrowAr: "المحور الرابع",
    eyebrowEn: "Chapter four",
    titleAr: "العلامات الكبرى",
    titleEn: "The major signs",
    descriptionAr: "آيات عظيمة متتابعة، ورد أصلها في حديث حذيفة بن أسيد رضي الله عنه. لا نرتبها ترتيباً جازماً إلا حيث دل النص، ولا نحول الغيب إلى مشهد ترفيهي.",
    descriptionEn: "Extraordinary signs described in the hadith of Hudhayfah ibn Usayd. We avoid claiming a definitive sequence where the text does not establish one, and we treat the unseen with restraint.",
    image: ASSETS.major,
    imageAltAr: "سماء مهيبة ودخان وضوء بعيد",
    imageAltEn: "A solemn sky of smoke and distant light",
    accent: "gold",
    hadiths: [
      { ar: "إِنَّهَا لَنْ تَقُومَ حَتَّى تَرَوْنَ قَبْلَهَا عَشْرَ آيَاتٍ: خَسْفًا بِالْمَشْرِقِ، وَخَسْفًا بِالْمَغْرِبِ، وَخَسْفًا بِجَزِيرَةِ الْعَرَبِ، وَالدُّخَانَ، وَالدَّجَّالَ، وَالدَّابَّةَ...", en: "The Hour will not come until you see ten signs before it: a landslide in the east, a landslide in the west, a landslide in Arabia, the smoke, the Dajjal, the Beast…", sourceAr: "رواه مسلم", sourceEn: "Reported by Muslim", tagAr: "حديث العلامات العشر", tagEn: "The ten signs" },
      { ar: "مَا مِنْ نَبِيٍّ إِلَّا أَنْذَرَ أُمَّتَهُ الْأَعْوَرَ الْكَذَّابَ، أَلَا إِنَّهُ أَعْوَرُ وَإِنَّ رَبَّكُمْ لَيْسَ بِأَعْوَرَ.", en: "Every prophet warned his people against the one-eyed liar. He is one-eyed, while your Lord is not one-eyed.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "فتنة الدجال", tagEn: "The Dajjal’s trial" },
      { ar: "وَالَّذِي نَفْسِي بِيَدِهِ، لَيُوشِكَنَّ أَنْ يَنْزِلَ فِيكُمُ ابْنُ مَرْيَمَ حَكَمًا عَدْلًا، فَيَكْسِرَ الصَّلِيبَ، وَيَقْتُلَ الْخِنْزِيرَ، وَيَضَعَ الْجِزْيَةَ.", en: "By Him in whose hand is my soul, the son of Mary will soon descend among you as a just judge; he will break the cross, kill the swine, and abolish the jizyah.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "نزول عيسى عليه السلام", tagEn: "The descent of Jesus" },
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى تَطْلُعَ الشَّمْسُ مِنْ مَغْرِبِهَا، فَإِذَا طَلَعَتْ وَرَآهَا النَّاسُ آمَنُوا أَجْمَعُونَ.", en: "The Hour will not come until the sun rises from the west; when people see it, they will all believe.", sourceAr: "رواه البخاري ومسلم", sourceEn: "Reported by al-Bukhari and Muslim", tagAr: "طلوع الشمس من مغربها", tagEn: "The sun from the west" },
      { ar: "لَا تَقُومُ السَّاعَةُ حَتَّى يَخْرُجَ يَأْجُوجُ وَمَأْجُوجُ، وَهُمْ مِنْ كُلِّ حَدَبٍ يَنْسِلُونَ.", en: "The Hour will not come until Gog and Magog emerge, rushing down from every elevation.", sourceAr: "رواه البخاري ومسلم بمعناه", sourceEn: "Reported by al-Bukhari and Muslim in meaning", tagAr: "يأجوج ومأجوج", tagEn: "Gog and Magog" },
      { ar: "ثَلَاثٌ إِذَا خَرَجْنَ لَا يَنْفَعُ نَفْسًا إِيمَانُهَا لَمْ تَكُنْ آمَنَتْ مِنْ قَبْلُ: طُلُوعُ الشَّمْسِ مِنْ مَغْرِبِهَا، وَالدَّجَّالُ، وَدَابَّةُ الْأَرْضِ.", en: "When three things appear, faith will not benefit a soul that had not believed before: the sun rising from the west, the Dajjal, and the Beast of the earth.", sourceAr: "رواه مسلم", sourceEn: "Reported by Muslim", tagAr: "إغلاق باب التوبة", tagEn: "The closing of repentance" },
    ],
  },
];

const majorItems: Array<[string, string, string]> = [
  ["01", "الدجال", "The Dajjal"], ["02", "نزول عيسى ابن مريم", "The descent of Jesus"], ["03", "يأجوج ومأجوج", "Gog and Magog"], ["04", "الدخان", "The smoke"], ["05", "الدابة", "The Beast"], ["06", "طلوع الشمس من مغربها", "The sun from the west"], ["07", "خسف بالمشرق", "A landslide in the east"], ["08", "خسف بالمغرب", "A landslide in the west"], ["09", "خسف بجزيرة العرب", "A landslide in Arabia"], ["10", "نار تخرج من اليمن", "The fire from Yemen"],
];

const copy = {
  ar: {
    nav: ["البداية", "المنهج", "المراحل", "المراجع"], language: "English", kicker: "أرشيف معرفي في أشراط الساعة", heroTitle: "علامات الساعة\nبين الخبر والعمل", heroBody: "رحلة هادئة في الأحاديث الصحيحة التي تحدثت عن أشراط الساعة؛ من العلامات التي مضت إلى الآيات الكبرى، دون تنبؤ أو تهويل.", cta: "ابدأ الرحلة", secondary: "اقرأ المنهج", liveLabel: "المادة الأساسية", liveValue: "صحيح البخاري ومسلم", introEyebrow: "لماذا هذا الموضوع؟", introTitle: "المعرفة هنا ليست موعداً\nبل أمانة.", introBody: "لم يحدد الوحي وقت الساعة، لكنه دلّ على أشراطها. لذلك يعرض هذا الموقع النصوص في سياقها، ويفصل بين الحديث الثابت وبين التأويلات المعاصرة، ليبقى المقصد هو اليقظة والعمل الصالح.", sourceLine: "لا نحدد موعداً للساعة؛ نعرض ما صح من أشراطها.", methodology: "منهج القراءة", methodologyItems: ["نقدم نص الحديث مختصراً مع مصدره، ونحافظ على المعنى دون ادعاء الإحاطة بكل طرق الرواية.", "نميز بين ما وقع، وما يتكرر، وما لم يثبت وقوعه بعد في المادة المعتمدة.", "لا نسقط العلامات على أحداث معاصرة قطعاً، ولا نستخدم الغيب للتنبؤ السياسي أو الزمني."], stages: "المراحل الأربع", stagesBody: "اتبع الخط الزمني من الماضي إلى الآيات الكبرى.", readHadiths: "اقرأ الأحاديث", close: "إغلاق", hadithCount: "أحاديث مختارة", majorList: "قائمة العلامات العشر", majorListBody: "وردت مجتمعة في حديث حذيفة بن أسيد رضي الله عنه.", references: "المراجع والضوابط", referencesBody: "المادة الحديثية الأساسية من صحيحي البخاري ومسلم، مع الاستئناس بشروح الموسوعة الحديثية. يجب مراجعة الطبعة المحققة عند الاستشهاد الأكاديمي.", footer: "موقع تعليمي للقراءة والتأمل — لا يتضمن أي أدوات تحرير.",
  },
  en: {
    nav: ["Start", "Method", "Stages", "Sources"], language: "العربية", kicker: "A knowledge archive of the Signs of the Hour", heroTitle: "Signs of the Hour\nbetween report and response", heroBody: "A quiet journey through authentic narrations about the Signs of the Hour — from what has passed to the major signs, without prediction or sensationalism.", cta: "Begin the journey", secondary: "Read the method", liveLabel: "Core material", liveValue: "Sahih al-Bukhari & Muslim", introEyebrow: "Why this subject?", introTitle: "Knowledge is not a date.\nIt is a trust.", introBody: "Revelation did not set a time for the Hour, but it described its signs. This site presents the reports in context, distinguishes transmitted evidence from modern interpretation, and keeps the destination close: awareness and righteous action.", sourceLine: "We do not date the Hour; we present what is sound from its signs.", methodology: "Reading method", methodologyItems: ["We present selected wording with its source, preserving meaning without claiming to cover every chain of transmission.", "We distinguish what has passed, what recurs, and what is not established as having occurred in the source material.", "We do not apply signs conclusively to current events or turn the unseen into political or chronological prediction."], stages: "Four stages", stagesBody: "Follow the timeline from the past toward the major signs.", readHadiths: "Read the hadiths", close: "Close", hadithCount: "Selected hadiths", majorList: "The ten-sign list", majorListBody: "Presented together in the hadith of Hudhayfah ibn Usayd.", references: "Sources & guardrails", referencesBody: "The core hadith material is drawn from Sahih al-Bukhari and Sahih Muslim, with supporting reference to hadith scholarship. Consult a verified edition for academic citation.", footer: "An educational reading space — no editing tools are included.",
  },
};

function SectionImage({ section, language }: { section: SectionData; language: Language }) {
  return <div className={`section-image-wrap ${section.accent}`}><img src={section.image} alt={language === "ar" ? section.imageAltAr : section.imageAltEn} className="section-image" /><div className="image-caption"><span>{section.number}</span><span>{language === "ar" ? "صورة رمزية" : "Symbolic image"}</span></div></div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [activeSection, setActiveSection] = useState<SectionKey>("past");
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const direction = language === "ar" ? "rtl" : "ltr";
  const activeData = useMemo(() => sections.find((item) => item.key === openSection) ?? null, [openSection]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = language === "ar" ? "أشراط الساعة | علامات الساعة" : "Signs of the Hour | Ashrat";
  }, [direction, language]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setMenuOpen(false); };

  return (
    <main className="site-shell" dir={direction}>
      <header className="site-header"><div className="container header-inner">
        <button className="brand-lockup" onClick={() => scrollTo("home")} aria-label="العودة إلى البداية"><span className="brand-mark"><Moon size={18} strokeWidth={1.5} /></span><span className="brand-text"><strong>{language === "ar" ? "أشراط الساعة" : "ASHRAT"}</strong><small>{language === "ar" ? "أرشيف القراءة" : "A READING ARCHIVE"}</small></span></button>
        <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="فتح القائمة">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="التنقل الرئيسي"><button onClick={() => scrollTo("home")}>{t.nav[0]}</button><button onClick={() => scrollTo("method")}>{t.nav[1]}</button><button onClick={() => scrollTo("stages")}>{t.nav[2]}</button><button onClick={() => scrollTo("sources")}>{t.nav[3]}</button></nav>
        <button className="language-switch" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}><Globe2 size={16} /><span>{t.language}</span></button>
      </div></header>

      <section className="hero" id="home"><img className="hero-image" src={ASSETS.hero} alt={language === "ar" ? "مشهد رمزي للساعة والميزان" : "A symbolic scene of the Hour and a scale"} /><div className="hero-overlay" /><div className="hero-grain" /><div className="container hero-inner"><div className="hero-copy"><div className="eyebrow light"><span className="eyebrow-dot" />{t.kicker}</div><h1>{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p>{t.heroBody}</p><div className="hero-actions"><button className="button button-gold" onClick={() => scrollTo("stages")}>{t.cta}<ArrowLeft size={17} className={language === "en" ? "flip-icon" : ""} /></button><button className="button button-ghost" onClick={() => scrollTo("method")}>{t.secondary}<ArrowDown size={16} /></button></div></div><div className="hero-index" aria-hidden="true"><span>01</span><div className="index-line" /><span>04</span></div></div><div className="hero-foot container"><div className="hero-foot-item"><span>{t.liveLabel}</span><strong>{t.liveValue}</strong></div><div className="hero-foot-item"><span>{language === "ar" ? "الأبواب" : "Chapters"}</span><strong>04</strong></div><div className="hero-foot-item"><span>{language === "ar" ? "اللغة" : "Language"}</span><strong>{language === "ar" ? "العربية / EN" : "EN / العربية"}</strong></div></div></section>

      <section className="intro-section" id="method"><div className="container intro-grid"><div className="intro-aside"><div className="number-stamp">00</div><div className="vertical-label">{language === "ar" ? "قبل البداية" : "Before we begin"}</div></div><div className="intro-copy"><div className="eyebrow"><span className="eyebrow-dot" />{t.introEyebrow}</div><h2>{t.introTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p className="lead">{t.introBody}</p><div className="source-line"><Quote size={20} /><span>{t.sourceLine}</span></div></div><div className="method-card"><div className="method-card-head"><ShieldCheck size={18} /><span>{t.methodology}</span></div>{t.methodologyItems.map((item, index) => <div className="method-row" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></div></section>

      <section className="stages-section" id="stages"><div className="container section-heading-row"><div><div className="eyebrow"><span className="eyebrow-dot" />{t.stages}</div><h2>{language === "ar" ? "خط زمني للعلامات" : "A timeline of the signs"}</h2></div><p>{t.stagesBody}</p></div><div className="container timeline"><div className="timeline-rail" />{sections.map((section, index) => <article className={`stage-row ${index % 2 === 1 ? "reverse" : ""}`} key={section.key} onMouseEnter={() => setActiveSection(section.key)}><div className="stage-marker"><span>{section.number}</span></div><div className={`stage-visual ${activeSection === section.key ? "is-active" : ""}`}><SectionImage section={section} language={language} /></div><div className="stage-copy"><div className="eyebrow"><span className="eyebrow-dot" />{language === "ar" ? section.eyebrowAr : section.eyebrowEn}</div><h3>{language === "ar" ? section.titleAr : section.titleEn}</h3><p>{language === "ar" ? section.descriptionAr : section.descriptionEn}</p><button className="text-button" onClick={() => setOpenSection(section.key)}>{t.readHadiths}<ArrowLeft size={16} className={language === "en" ? "flip-icon" : ""} /></button></div></article>)}</div></section>

      <section className="major-list-section"><div className="container major-list-grid"><div className="major-list-copy"><div className="eyebrow"><span className="eyebrow-dot" />{t.majorList}</div><h2>{language === "ar" ? "عشر آيات،\nوسؤال واحد: ماذا أعددنا؟" : "Ten signs,\none question: what have we prepared?"}</h2><p>{t.majorListBody}</p><div className="hadith-ribbon"><BookOpen size={18} /><span>{language === "ar" ? "ورد في صحيح مسلم" : "Recorded in Sahih Muslim"}</span></div></div><div className="major-list">{majorItems.map(([number, ar, en]) => <div className="major-item" key={number}><span>{number}</span><strong>{language === "ar" ? ar : en}</strong><Check size={15} /></div>)}</div></div></section>

      <section className="sources-section" id="sources"><div className="container sources-grid"><div className="sources-icon"><Library size={30} strokeWidth={1.5} /></div><div><div className="eyebrow"><span className="eyebrow-dot" />{t.references}</div><h2>{language === "ar" ? "أمانة المصدر قبل جمال العرض" : "Source integrity before visual polish"}</h2><p>{t.referencesBody}</p></div><div className="source-links"><a href="https://sunnah.com/bukhari" target="_blank" rel="noreferrer">{language === "ar" ? "صحيح البخاري" : "Sahih al-Bukhari"}<ExternalLink size={14} /></a><a href="https://sunnah.com/muslim" target="_blank" rel="noreferrer">{language === "ar" ? "صحيح مسلم" : "Sahih Muslim"}<ExternalLink size={14} /></a><a href="https://dorar.net/hadith" target="_blank" rel="noreferrer">{language === "ar" ? "الموسوعة الحديثية" : "Hadith Encyclopedia"}<ExternalLink size={14} /></a></div></div></section>

      <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><span className="brand-mark"><Moon size={16} /></span><strong>{language === "ar" ? "أشراط الساعة" : "ASHRAT"}</strong></div><p>{t.footer}</p><span className="footer-year">2026</span></div></footer>

      {activeData && <div className="modal-backdrop" role="presentation" onClick={() => setOpenSection(null)}><div className="hadith-modal" role="dialog" aria-modal="true" aria-label={language === "ar" ? activeData.titleAr : activeData.titleEn} onClick={(event) => event.stopPropagation()}><div className="modal-topline"><span>{language === "ar" ? activeData.eyebrowAr : activeData.eyebrowEn}</span><button onClick={() => setOpenSection(null)} aria-label={t.close}><X size={20} /></button></div><div className="modal-heading"><h2>{language === "ar" ? activeData.titleAr : activeData.titleEn}</h2><span>{activeData.hadiths.length.toString().padStart(2, "0")} {t.hadithCount}</span></div><div className="hadith-list">{activeData.hadiths.map((hadith, index) => <article className="hadith-card" key={`${hadith.tagAr}-${index}`}><div className="hadith-card-top"><span className="hadith-number">0{index + 1}</span><span className="hadith-tag">{language === "ar" ? hadith.tagAr : hadith.tagEn}</span></div><p className="hadith-text">“{language === "ar" ? hadith.ar : hadith.en}”</p><div className="hadith-source"><BookOpen size={14} />{language === "ar" ? hadith.sourceAr : hadith.sourceEn}</div></article>)}</div></div></div>}
    </main>
  );
}

export { sections };
export type { SectionKey };
