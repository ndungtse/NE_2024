import React from 'react';
import { Helmet } from 'react-helmet-async';

type OpenGraph = {
   [key: string]: string;
};

interface Metadata {
   title?: string;
   description?: string;
   image?: string;
   url?: string;
   type?: string;
   keywords?: string | string[];
   openGraph?: OpenGraph;
}

/**
 * This is a Higher Order Component that takes a component and a metadata
 * @author Ndungutse Charles
 * @param Component
 * @param metadata
 * # Example
 * ```tsx
 * const MyComponent = () => {
 *    return (
 *      <div>
 *         <h1>My Component</h1>
 *         <p>This is my component</p>
 *         <p>It has a head tag</p>
 *      </div>
 *    )
 *  }
 *
 *  const metadata = {
 *    title: 'My Component',
 *    description: 'This is my component',
 *    keywords: ['my', 'component', 'head'],
 *    openGraph: {
 *       title: 'My Component',
 *       description: 'This is my component',
 *       image: 'https://example.com/image.png',
 *    }
 *  }
 *
 *  export default withMeta(MyComponent, metadata)
 *  ```
 */
export default function withMeta(Component: React.FC<any>, metadata: Metadata) {
   return (props: any) => {
      return (
         <>
            <Helmet>
               <title>{metadata.title}</title>
               <meta name="description" content={metadata.description} />
               <meta
                  name="keywords"
                  content={Array.isArray(metadata.keywords) ? metadata.keywords.join(', ') : metadata.keywords}
               />
               {Object.values(metadata.openGraph || {}).map((key) => (
                  <meta key={key} property={`og:${key}`} content={metadata.openGraph?.[key]} />
               ))}
            </Helmet>
            <Component {...props} />
         </>
      );
   };
}
