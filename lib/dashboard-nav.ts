export const dashboardNavItems = [
  { label: "نظرة عامة", href: "/dashboard" },
  { label: "مشترياتي", href: "/dashboard/purchases" },
  { label: "أفكاري المنشورة", href: "/dashboard/published" },
  { label: "الأرباح", href: "/dashboard/earnings" },
  { label: "المفضلة", href: "/dashboard/favorites" },
  { label: "الإشعارات", href: "/dashboard/notifications" },
  { label: "النشاط الأخير", href: "/dashboard/activity" },
  { label: "تعديل الملف الشخصي", href: "/dashboard/profile" },
  { label: "حالة التوثيق", href: "/dashboard/verification" },
] as const;

export function getDashboardNav(activeHref: string) {
  return dashboardNavItems.map((item) => ({
    ...item,
    active: item.href === activeHref,
  }));
}
