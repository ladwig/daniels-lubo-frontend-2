'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Link href="/" className="hover:text-primary">
        Home
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/${paths.slice(0, index + 1).join('/')}`}
            className="hover:text-primary capitalize"
          >
            {path}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
} 