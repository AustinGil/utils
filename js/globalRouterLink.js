// Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
// Example using the Next.js App Router.
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useLinkHandler() {
  let router = useRouter();

  useEffect(() => {
    let onClick = e => {
      let link = e.target;
      if (
        link instanceof HTMLAnchorElement &&
        link.href &&
        (!link.target || link.target === '_self') &&
        link.origin === location.origin &&
        e.button === 0 && // left clicks only
        !e.metaKey && // open in new tab (mac)
        !e.ctrlKey && // open in new tab (windows)
        !e.altKey && // download
        !e.shiftKey &&
        !e.defaultPrevented
      ) {
        e.preventDefault();
        router.push(e.target.href);
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [router]);
}
