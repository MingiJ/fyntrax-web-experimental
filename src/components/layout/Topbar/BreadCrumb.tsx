"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Breadcrumbs = () => {
  const pathname = usePathname()

  // Split the pathname into segments
  const pathArray = pathname.split('/').filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb">
      <ol className='flex gap-3 text-xs text-tertiary'>
        {/* Home link */}
        <li>
          <Link href="/">General</Link>
        </li>

        {pathArray.map((segment, index) => {
          const breadcrumbPath = '/' + pathArray.slice(0, index + 1).join('/');

          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <>
              &gt;
              <li key={breadcrumbPath}>
                <Link href={breadcrumbPath}>{label}</Link>
              </li>
            </>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

