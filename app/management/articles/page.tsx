'use client';

import React, { useState } from 'react';
import { Search, Tags, RefreshCw, Bell, ChevronDown } from 'lucide-react';
import Sidebar from "@/components/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";
import GlobalSearch from "@/components/global-search";
import { cn } from '@/lib/utils';

// Mock data
const TAGS = ['Solar', 'Elektro', 'Heizung', 'Sanitär', 'Werkzeug'];

interface Article {
  id: string;
  erpId: string;
  gtin: string;
  uid: string;
  name: string;
  shortName: string;
  imageUrl: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: '1',
    erpId: 'ERP-001234',
    gtin: '4260123456789',
    uid: 'WR-FOX-12K',
    name: 'Wechselrichter FoxESS H3-12.0-E',
    shortName: 'WR FoxESS 12kW',
    imageUrl: '/images/wr-foxess.jpg',
    tags: ['Solar', 'Elektro'],
  },
  {
    id: '2',
    erpId: 'ERP-001235',
    gtin: '4260123456790',
    uid: 'HV-BAT-FOX',
    name: 'Hochvolt Batteriemodul FoxESS H3',
    shortName: 'HV Batt. FoxESS',
    imageUrl: '/images/battery-foxess.jpg',
    tags: ['Solar', 'Elektro'],
  },
  {
    id: '3',
    erpId: 'ERP-002156',
    gtin: '4260123456791',
    uid: 'PV-JINKO-440',
    name: 'Solarmodul Jinko Tiger Neo N-type 440W',
    shortName: 'PV Jinko 440W',
    imageUrl: '/images/pv-jinko.jpg',
    tags: ['Solar'],
  },
  {
    id: '4',
    erpId: 'ERP-003001',
    gtin: '4260123456792',
    uid: 'VITO-200-W',
    name: 'Viessmann Vitodens 200-W Gas-Brennwertgerät',
    shortName: 'Vitodens 200-W',
    imageUrl: '/images/heizung-1.jpg',
    tags: ['Heizung'],
  },
  {
    id: '5',
    erpId: 'ERP-003002',
    gtin: '4260123456793',
    uid: 'LOGAMAX-GB172',
    name: 'Buderus Logamax plus GB172',
    shortName: 'Logamax GB172',
    imageUrl: '/images/heizung-2.jpg',
    tags: ['Heizung'],
  },
  {
    id: '6',
    erpId: 'ERP-003003',
    gtin: '4260123456794',
    uid: 'ECOTEC-PLUS',
    name: 'Vaillant ecoTEC plus VC',
    shortName: 'ecoTEC plus',
    imageUrl: '/images/heizung-3.jpg',
    tags: ['Heizung'],
  },
  {
    id: '7',
    erpId: 'ERP-003101',
    gtin: '4260123456795',
    uid: 'VITOCAL-200-S',
    name: 'Viessmann Vitocal 200-S Wärmepumpe',
    shortName: 'Vitocal 200-S',
    imageUrl: '/images/wp-1.jpg',
    tags: ['Heizung'],
  },
  {
    id: '8',
    erpId: 'ERP-003102',
    gtin: '4260123456796',
    uid: 'ALTHERMA-3',
    name: 'Daikin Altherma 3 Wärmepumpe',
    shortName: 'Altherma 3',
    imageUrl: '/images/wp-2.jpg',
    tags: ['Heizung'],
  },
  {
    id: '9',
    erpId: 'ERP-004001',
    gtin: '4260123456797',
    uid: 'RAINSHOWER-SYSTEM',
    name: 'Grohe Rainshower SmartControl Duschsystem',
    shortName: 'Rainshower System',
    imageUrl: '/images/sanitaer-1.jpg',
    tags: ['Sanitär'],
  },
  {
    id: '10',
    erpId: 'ERP-004002',
    gtin: '4260123456798',
    uid: 'RAINDANCE-SELECT',
    name: 'Hansgrohe Raindance Select Duschkopf',
    shortName: 'Raindance Select',
    imageUrl: '/images/sanitaer-2.jpg',
    tags: ['Sanitär'],
  },
  {
    id: '11',
    erpId: 'ERP-004003',
    gtin: '4260123456799',
    uid: 'SUBWAY-2-0-WC',
    name: 'Villeroy & Boch Subway 2.0 WC',
    shortName: 'Subway 2.0 WC',
    imageUrl: '/images/sanitaer-3.jpg',
    tags: ['Sanitär'],
  },
  {
    id: '12',
    erpId: 'ERP-004004',
    gtin: '4260123456800',
    uid: 'DUOFIX-WC',
    name: 'Geberit Duofix Element für Wand-WC',
    shortName: 'Duofix WC',
    imageUrl: '/images/sanitaer-4.jpg',
    tags: ['Sanitär'],
  },
  {
    id: '13',
    erpId: 'ERP-004101',
    gtin: '4260123456801',
    uid: 'ADVANTIX-VARIO',
    name: 'Viega Advantix Vario Duschrinne',
    shortName: 'Advantix Vario',
    imageUrl: '/images/sanitaer-5.jpg',
    tags: ['Sanitär'],
  },
  {
    id: '14',
    erpId: 'ERP-004102',
    gtin: '4260123456802',
    uid: 'DRAINLINE',
    name: 'TECE drainline Duschrinne',
    shortName: 'drainline',
    imageUrl: '/images/sanitaer-6.jpg',
    tags: ['Sanitär'],
  },
  {
    id: '15',
    erpId: 'ERP-005001',
    gtin: '4260123456803',
    uid: 'TRONIC-4000',
    name: 'Junkers Bosch Tronic 4000 Durchlauferhitzer',
    shortName: 'Tronic 4000',
    imageUrl: '/images/warmwasser-1.jpg',
    tags: ['Heizung', 'Sanitär'],
  },
  {
    id: '16',
    erpId: 'ERP-005002',
    gtin: '4260123456804',
    uid: 'DHB-E-LCD',
    name: 'Stiebel Eltron DHB-E LCD Durchlauferhitzer',
    shortName: 'DHB-E LCD',
    imageUrl: '/images/warmwasser-2.jpg',
    tags: ['Heizung', 'Sanitär'],
  },
  {
    id: '17',
    erpId: 'ERP-005003',
    gtin: '4260123456805',
    uid: 'DDLE-LCD',
    name: 'AEG DDLE LCD Durchlauferhitzer',
    shortName: 'DDLE LCD',
    imageUrl: '/images/warmwasser-3.jpg',
    tags: ['Heizung', 'Sanitär'],
  },
  {
    id: '18',
    erpId: 'ERP-006001',
    gtin: '4260123456806',
    uid: 'SUPER-FIRE-4',
    name: 'Rothenberger Super Fire 4 Lötgerät',
    shortName: 'Super Fire 4',
    imageUrl: '/images/werkzeug-1.jpg',
    tags: ['Werkzeug'],
  },
  {
    id: '19',
    erpId: 'ERP-006002',
    gtin: '4260123456807',
    uid: 'CURVO-SET',
    name: 'Rems Curvo Rohrbieger Set',
    shortName: 'Curvo Set',
    imageUrl: '/images/werkzeug-2.jpg',
    tags: ['Werkzeug'],
  },
  {
    id: '20',
    erpId: 'ERP-006003',
    gtin: '4260123456808',
    uid: 'RIDGID-90',
    name: 'Ridgid Rohrzange Modell 90',
    shortName: 'Ridgid 90',
    imageUrl: '/images/werkzeug-3.jpg',
    tags: ['Werkzeug'],
  },
  {
    id: '21',
    erpId: 'ERP-006004',
    gtin: '4260123456809',
    uid: 'COBRA-ZANGE',
    name: 'Knipex Cobra Wasserpumpenzange',
    shortName: 'Cobra Zange',
    imageUrl: '/images/werkzeug-4.jpg',
    tags: ['Werkzeug'],
  },
  {
    id: '22',
    erpId: 'ERP-007001',
    gtin: '4260123456810',
    uid: 'VITOTRONIC-200',
    name: 'Viessmann Vitotronic 200 Heizungsregelung',
    shortName: 'Vitotronic 200',
    imageUrl: '/images/steuerung-1.jpg',
    tags: ['Heizung', 'Elektro'],
  },
  {
    id: '23',
    erpId: 'ERP-007002',
    gtin: '4260123456811',
    uid: 'LOGAMATIC-RC310',
    name: 'Buderus Logamatic RC310 Regelung',
    shortName: 'Logamatic RC310',
    imageUrl: '/images/steuerung-2.jpg',
    tags: ['Heizung', 'Elektro'],
  }
];

export default function Articles() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const lastSync = new Date().toLocaleString('de-DE');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.erpId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => article.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onCollapse={setIsSidebarCollapsed} />

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col bg-gray-50 min-h-screen transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Fixed Header Section */}
        <div className="sticky top-0 z-30 bg-white">
          {/* Main Header */}
          <header className="h-16 border-b flex items-center justify-between px-6">
            <div className="flex-1 flex items-center">
              <GlobalSearch />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full" />
                <span className="text-sm font-medium">Demo Account</span>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </header>

          {/* Breadcrumbs */}
          <div className="px-6 py-2 border-b bg-gray-50">
            <Breadcrumbs />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {/* Header with Search and Filters */}
          <div className="bg-white border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                {/* Search */}
                <div className="flex items-center gap-2 bg-white rounded-md border px-3 py-1.5 flex-1 max-w-md">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Suche nach Name, Kurzname oder ERP-ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 text-sm outline-none"
                  />
                </div>

                {/* Tag Filter */}
                <div className="flex items-center gap-2">
                  <Tags className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {TAGS.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(prev => 
                            prev.includes(tag) 
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full transition-colors",
                          selectedTags.includes(tag)
                            ? "bg-primary text-gray-900"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Last Sync Info */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4" />
                <span>Letzte Synchronisierung: {lastSync}</span>
              </div>
            </div>
          </div>

          {/* Articles Table */}
          <div className="bg-white border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">ERP-ID</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[140px]">GTIN</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Bild</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">Kurzname</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">{article.erpId}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{article.gtin}</td>
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400 text-xs">
                          Bild
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium text-gray-900">{article.name}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{article.shortName}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 