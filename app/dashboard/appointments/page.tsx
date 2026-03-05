'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function AppointmentsPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Randevular</h1>
            <p className="text-slate-400">Tüm randevularınızı yönetin</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Yeni Randevu
          </Button>
        </div>

        <Card className="p-12 text-center border-slate-700 bg-slate-800/50">
          <p className="text-slate-400 text-lg">Çok yakında eklenecek</p>
          <p className="text-slate-500 text-sm mt-2">
            Randevu yönetim sistemi geliştiriliyor...
          </p>
        </Card>
      </div>
    </div>
  )
}
