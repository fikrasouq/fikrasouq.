import { ChartPoint, Metric, Order } from "@/types";

export const userDashboardMetrics: Metric[] = [
  { label: "إجمالي المشتريات", value: "18", change: "+3 هذا الشهر", tone: "positive" },
  { label: "الأرباح التقديرية", value: "12,480 ريال", change: "+22% عن الشهر الماضي", tone: "positive" },
  { label: "الأفكار المحفوظة", value: "27", change: "5 مميزة", tone: "neutral" },
  { label: "حالة التوثيق", value: "قيد المراجعة", change: "يرجى استكمال الوثائق", tone: "alert" },
];

export const earningsChart: ChartPoint[] = [
  { label: "أكتوبر", value: 38 },
  { label: "نوفمبر", value: 46 },
  { label: "ديسمبر", value: 59 },
  { label: "يناير", value: 64 },
  { label: "فبراير", value: 81 },
  { label: "مارس", value: 93 },
];

export const purchasesChart: ChartPoint[] = [
  { label: "مشاريع تجارية", value: 12 },
  { label: "خدمات رقمية", value: 18 },
  { label: "متاجر إلكترونية", value: 15 },
  { label: "طلاب", value: 10 },
  { label: "محتوى", value: 14 },
];

export const userOrders: Order[] = [
  { id: "SO-1024", item: "باقة تنفيذ متجر سلة للمبتدئين", buyer: "أنت", seller: "نورة الحربي", date: "22 مارس 2026", amount: "420 ريال", status: "مكتمل" },
  { id: "SO-1018", item: "خدمة إعداد خطط محتوى لمشاريع التجميل", buyer: "أنت", seller: "لمى الشهري", date: "17 مارس 2026", amount: "275 ريال", status: "قيد الوصول" },
  { id: "SO-1012", item: "متجر ملفات Canva جاهزة للمشاريع", buyer: "أنت", seller: "حصة العتيبي", date: "11 مارس 2026", amount: "230 ريال", status: "مكتمل" },
  { id: "SO-1009", item: "فكرة خدمة كتابة سيرة ذاتية احترافية", buyer: "أنت", seller: "يوسف العنزي", date: "8 مارس 2026", amount: "170 ريال", status: "مكتمل" },
];

export const userPublishedIdeas = [
  { title: "خدمة تنسيق ملفات تسويق للمطاعم المنزلية", status: "منشور", views: "1,240", sales: "18", earnings: "3,640 ريال" },
  { title: "باقة إطلاق متجر منتجات رقمية للمخططات الدراسية", status: "قيد المراجعة", views: "540", sales: "4", earnings: "920 ريال" },
  { title: "فكرة نشرة فرص للمبتدئين في التصميم", status: "مرفوضة", views: "0", sales: "0", earnings: "0 ريال" },
];

export const userActivities = [
  { title: "أضفت فكرة جديدة إلى المفضلة", body: "تم حفظ فكرة منصة اشتراكات لمذكرات الاختبارات للمراجعة لاحقًا.", time: "منذ 25 دقيقة" },
  { title: "تم شراء باقة تنفيذ جديدة", body: "اكتمل طلب باقة تنفيذ متجر سلة للمبتدئين وأصبحت الملفات متاحة.", time: "منذ 3 ساعات" },
  { title: "طلب توثيق قيد المراجعة", body: "تم استلام وثيقة العمل الحر وسيتم إشعارك فور اكتمال المراجعة.", time: "اليوم" },
  { title: "رسالة جديدة من بائع موثق", body: "أرسل لك فهد القحطاني تحديثًا على نموذج التسعير الخاص بإحدى الخدمات.", time: "أمس" },
];

export const adminMetrics: Metric[] = [
  { label: "إجمالي المستخدمين", value: "18,420", change: "+9.4%", tone: "positive" },
  { label: "إجمالي الأفكار", value: "2,457", change: "+126 هذا الأسبوع", tone: "positive" },
  { label: "الإيرادات", value: "482,000 ريال", change: "+14.1%", tone: "positive" },
  { label: "الأفكار المعلقة", value: "38", change: "بحاجة إلى مراجعة", tone: "alert" },
  { label: "البلاغات", value: "17", change: "5 جديدة اليوم", tone: "alert" },
  { label: "البائعون الموثقون", value: "214", change: "+12 هذا الشهر", tone: "neutral" },
];

export const adminGrowthChart: ChartPoint[] = [
  { label: "السبت", value: 41 },
  { label: "الأحد", value: 58 },
  { label: "الاثنين", value: 63 },
  { label: "الثلاثاء", value: 76 },
  { label: "الأربعاء", value: 74 },
  { label: "الخميس", value: 88 },
  { label: "الجمعة", value: 61 },
];

export const adminRevenueChart: ChartPoint[] = [
  { label: "يناير", value: 52 },
  { label: "فبراير", value: 71 },
  { label: "مارس", value: 84 },
  { label: "أبريل", value: 79 },
  { label: "مايو", value: 92 },
  { label: "يونيو", value: 96 },
];

export const adminUsersTable = [
  { name: "مشاعل الزهراني", role: "بائعة", joined: "اليوم", status: "نشط", ideas: "4" },
  { name: "يوسف الجهني", role: "مشتري", joined: "اليوم", status: "نشط", ideas: "-" },
  { name: "رهف القاسم", role: "بائعة", joined: "أمس", status: "قيد التوثيق", ideas: "2" },
  { name: "طلال الشريف", role: "مشتري", joined: "أمس", status: "نشط", ideas: "-" },
  { name: "ميادة العبدالله", role: "بائعة", joined: "منذ يومين", status: "معلق", ideas: "1" },
];

export const adminRecentPurchases: Order[] = [
  { id: "PO-8821", item: "متجر منتجات رقمية لتنظيم الدراسة", buyer: "شهد المطيري", seller: "حصة العتيبي", date: "27 مارس 2026", amount: "190 ريال", status: "مكتمل" },
  { id: "PO-8819", item: "خدمة إدارة حسابات لمتاجر صغيرة", buyer: "سلطان الدوسري", seller: "فهد القحطاني", date: "27 مارس 2026", amount: "240 ريال", status: "قيد التسليم" },
  { id: "PO-8816", item: "فكرة قناة تيك توك عن مراجعة خدمات محلية", buyer: "أريج السلمي", seller: "لمى الشهري", date: "26 مارس 2026", amount: "260 ريال", status: "مكتمل" },
  { id: "PO-8810", item: "باقة مشروع طباعة حسب الطلب", buyer: "فيصل العتيبي", seller: "يوسف العنزي", date: "26 مارس 2026", amount: "450 ريال", status: "مكتمل" },
];

export const adminPendingIdeas = [
  { title: "خدمة تلخيص دروس خصوصية عبر واتساب", seller: "رهف القاسم", submittedAt: "منذ 4 ساعات", category: "خدمات مدرسية", status: "بانتظار المراجعة" },
  { title: "متجر باقات مناسبات التأسيس", seller: "عبدالرحمن السويلم", submittedAt: "منذ 7 ساعات", category: "أفكار موسمية", status: "بحاجة لتعديل" },
  { title: "فكرة تطبيق متابعة وجبات الموظفين", seller: "عمار الحربي", submittedAt: "اليوم", category: "تطبيقات ومواقع", status: "بانتظار الفحص" },
];

export const adminReports = [
  { item: "فكرة مشروع قهوة متنقل داخل الأحياء", reason: "وصف مبالغ فيه للأرباح المتوقعة", reporter: "مستخدم موثق", date: "منذ ساعتين", severity: "متوسط" },
  { item: "متجر بطاقات تهنئة رقمية عربية", reason: "تشابه مع منتج منشور سابقًا", reporter: "بائع", date: "اليوم", severity: "منخفض" },
  { item: "خدمة إدارة حسابات لمتاجر صغيرة", reason: "نقص في تفاصيل المعاينة", reporter: "مشتري", date: "أمس", severity: "منخفض" },
];
