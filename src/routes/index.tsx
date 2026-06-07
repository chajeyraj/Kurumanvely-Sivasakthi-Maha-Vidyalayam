import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { AcademicsPage } from '@/pages/AcademicsPage'
import { AchievementsPage } from '@/pages/AchievementsPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { NewsPage } from '@/pages/NewsPage'
import { EventsPage } from '@/pages/EventsPage'
import { AdmissionsPage } from '@/pages/AdmissionsPage'
import { StaffPage } from '@/pages/StaffPage'
import { ContactPage } from '@/pages/ContactPage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { ArticlesAdminPage } from '@/pages/admin/ArticlesAdminPage'
import { GalleryAdminPage } from '@/pages/admin/GalleryAdminPage'
import { EventsAdminPage } from '@/pages/admin/EventsAdminPage'
import { AdmissionsAdminPage } from '@/pages/admin/AdmissionsAdminPage'
import { StaffAdminPage } from '@/pages/admin/StaffAdminPage'
import { RequireAdminRole } from '@/components/admin/RequireAdminRole'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route path="admin/login" element={<AdminLoginPage />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="articles" element={<ArticlesAdminPage />} />
        <Route path="gallery" element={<GalleryAdminPage />} />
        <Route path="events" element={<EventsAdminPage />} />
        <Route
          path="admissions"
          element={
            <RequireAdminRole allowedRoles={['super_admin', 'admissions_officer']}>
              <AdmissionsAdminPage />
            </RequireAdminRole>
          }
        />
        <Route
          path="staff"
          element={
            <RequireAdminRole allowedRoles={['super_admin']}>
              <StaffAdminPage />
            </RequireAdminRole>
          }
        />
        <Route path="news" element={<Navigate to="/admin/articles" replace />} />
        <Route path="applications" element={<Navigate to="/admin/admissions" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
