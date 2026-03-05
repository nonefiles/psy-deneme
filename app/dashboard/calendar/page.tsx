'use client'

import { Card } from '@/components/ui/card'

export default function CalendarPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Takvim</h1>
          <p className="text-slate-400">Randevularınızı takvim görünümünde izleyin</p>
        </div>

        <Card className="p-12 text-center border-slate-700 bg-slate-800/50">
          <p className="text-slate-400 text-lg">Çok yakında eklenecek</p>
          <p className="text-slate-500 text-sm mt-2">
            Takvim görünümü geliştiriliyor...
          </p>
        </Card>
      </div>
    </div>
  )
}
