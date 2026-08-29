/**
 * TypeScript 6 (TS2882) requires side-effect imports to resolve to a module.
 * Next.js only ships declarations for `*.module.css`, so global stylesheet
 * imports need this. Remove once Next.js declares them upstream.
 */
declare module '*.css'
