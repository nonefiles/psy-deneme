'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'

interface DashboardStats {
  clientsCount: number
  appointmentsToday: number
  monthlyIncome: number
  loadingStates: {
    clients: boolean
    appointments: boolean
    income: boolean
  }
  errors: {
    clients?: string
    appointments?: string
    income?: string
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    clientsCount: 0,
    appointmentsToday: 0,
    monthlyIncome: 0,
    loadingStates: { clients: true, appointments: true, income: true },
    errors: {},
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        // Fetch clients count
        try {
          const { count: clientsCount } = await supabase
            .from('clients')
            .select('*', { count: 'exact', head: true })
            .eq('psychologist_id', user.id)

          setStats((prev) => ({
            ...prev,
            clientsCount: clientsCount || 0,
            loadingStates: { ...prev.loadingStates, clients: false },
          }))
        } catch (error) {
          console.error('Error fetching clients:', error)
          setStats((prev) => ({
            ...prev,
            loadingStates: { ...prev.loadingStates, clients: false },
            errors: {
              ...prev.errors,
              clients: 'Danışanlar yüklenemedi',
            },
          }))
        }

        // Fetch today's appointments
        try {
          const today = new Date().toISOString().split('T')[0]
          const { count: appointmentsCount } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .eq('psychologist_id', user.id)
            .gte('start_at', today)
            .lt('start_at', `${today}T23:59:59`)

          setStats((prev) => ({
            ...prev,
            appointmentsToday: appointmentsCount || 0,
            loadingStates: { ...prev.loadingStates, appointments: false },
          }))
        } catch (error) {
          console.error('Error fetching appointments:', error)
          setStats((prev) => ({
            ...prev,
            loadingStates: { ...prev.loadingStates, appointments: false },
            errors: {
              ...prev.errors,
              appointments: 'Randevular yüklenemedi',
            },
          }))
        }

        // Fetch monthly income
        try {
          const currentDate = new Date()
          const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          )
          const lastDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          )

          const { data: transactions } = await supabase
            .from('transactions')
            .select('amount')
            .eq('psychologist_id', user.id)
            .eq('type', 'income')
            .gte('occurred_on', firstDay.toISOString().split('T')[0])
            .lte('occurred_on', lastDay.toISOString().split('T')[0])

          const totalIncome = transactions?.reduce(
            (sum, t) => sum + (t.amount || 0),
            0
          ) || 0

          setStats((prev) => ({
            ...prev,
            monthlyIncome: totalIncome,
            loadingStates: { ...prev.loadingStates, income: false },
          }))
        } catch (error) {
          console.error('Error fetching income:', error)
          setStats((prev) => ({
            ...prev,
            loadingStates: { ...prev.loadingStates, income: false },
            errors: {
              ...prev.errors,
              income: 'Gelir yüklenemedi',
            },
          }))
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchDashboardData()
  }, [supabase])

  const StatCard = ({
    icon: Icon,
    title,
    value,
    loading,
    error,
  }: {
    icon: typeof Users
    title: string
    value: string | number
    loading: boolean
    error?: string
  }) => (
    <Card className="p-6 border-slate-700 bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 bg-slate-700/50 rounded animate-pulse"></div>
          ) : error ? (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          ) : (
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
          )}
        </div>
        <Icon className="w-6 h-6 text-blue-500 flex-shrink-0" />
      </div>
    </Card>
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Gösterge Paneli
          </h1>
          <p className="text-slate-400">
            Klinik yönetiminizin özeti ve istatistikleri
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Toplam Danışanlar"
            value={stats.clientsCount}
            loading={stats.loadingStates.clients}
            error={stats.errors.clients}
          />
          <StatCard
            icon={Calendar}
            title="Bugünün Randevuları"
            value={stats.appointmentsToday}
            loading={stats.loadingStates.appointments}
            error={stats.errors.appointments}
          />
          <StatCard
            icon={DollarSign}
            title="Aylık Gelir"
            value={`₺${stats.monthlyIncome.toFixed(2)}`}
            loading={stats.loadingStates.income}
            error={stats.errors.income}
          />
          <StatCard
            icon={TrendingUp}
            title="Kullanıcı Durumu"
            value="Aktif"
            loading={false}
          />
        </div>

        {/* Quick Actions */}
        <Card className="p-6 border-slate-700 bg-slate-800/50 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            Hızlı İşlemler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-200 hover:text-white">
              Yeni Danışan Ekle
            </button>
            <button className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-200 hover:text-white">
              Randevu Oluştur
            </button>
            <button className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-200 hover:text-white">
              İşlem Kayıt Et
            </button>
            <button className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-slate-200 hover:text-white">
              Rapor Oluştur
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
