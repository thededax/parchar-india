import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/portfolio', '/contact']
  return routes.map(route => ({
    url: `https://parcharindia.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))
}
