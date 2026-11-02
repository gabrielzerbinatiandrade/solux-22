/** URLs públicas compatíveis com / e com a pasta de produção /solux/. */
export function assetUrl(path:string){return `${import.meta.env.BASE_URL}${path.replace(/^\//,'')}`}
