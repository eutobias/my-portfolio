// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_SiteLocaleAbout_getConfig } from './pages/(site)/[locale]/about';
// prettier-ignore
import type { getConfig as File_SiteLocaleContact_getConfig } from './pages/(site)/[locale]/contact';
// prettier-ignore
import type { getConfig as File_SiteLocaleExperience_getConfig } from './pages/(site)/[locale]/experience';
// prettier-ignore
import type { getConfig as File_SiteLocaleIndex_getConfig } from './pages/(site)/[locale]/index';
// prettier-ignore
import type { getConfig as File_SiteLocaleProjectsSlug_getConfig } from './pages/(site)/[locale]/projects/[slug]';
// prettier-ignore
import type { getConfig as File_SiteLocaleProjectsIndex_getConfig } from './pages/(site)/[locale]/projects/index';
// prettier-ignore
import type { getConfig as File_SiteLocaleSkills_getConfig } from './pages/(site)/[locale]/skills';
// prettier-ignore
import type { getConfig as File_AdminCollectionIndex_getConfig } from './pages/admin/[collection]/index';
// prettier-ignore
import type { getConfig as File_AdminBackup_getConfig } from './pages/admin/backup';
// prettier-ignore
import type { getConfig as File_AdminIndex_getConfig } from './pages/admin/index';
// prettier-ignore
import type { getConfig as File_AdminUsers_getConfig } from './pages/admin/users';
// prettier-ignore
import type { getConfig as File_Login_getConfig } from './pages/login';

// prettier-ignore
type Page =
| ({ path: '/[locale]/about' } & GetConfigResponse<typeof File_SiteLocaleAbout_getConfig>)
| ({ path: '/[locale]/contact' } & GetConfigResponse<typeof File_SiteLocaleContact_getConfig>)
| ({ path: '/[locale]/experience' } & GetConfigResponse<typeof File_SiteLocaleExperience_getConfig>)
| ({ path: '/[locale]' } & GetConfigResponse<typeof File_SiteLocaleIndex_getConfig>)
| ({ path: '/[locale]/projects/[slug]' } & GetConfigResponse<typeof File_SiteLocaleProjectsSlug_getConfig>)
| ({ path: '/[locale]/projects' } & GetConfigResponse<typeof File_SiteLocaleProjectsIndex_getConfig>)
| ({ path: '/[locale]/skills' } & GetConfigResponse<typeof File_SiteLocaleSkills_getConfig>)
| ({ path: '/admin/[collection]' } & GetConfigResponse<typeof File_AdminCollectionIndex_getConfig>)
| ({ path: '/admin/backup' } & GetConfigResponse<typeof File_AdminBackup_getConfig>)
| ({ path: '/admin' } & GetConfigResponse<typeof File_AdminIndex_getConfig>)
| ({ path: '/admin/users' } & GetConfigResponse<typeof File_AdminUsers_getConfig>)
| ({ path: '/login' } & GetConfigResponse<typeof File_Login_getConfig>);

// prettier-ignore
type Layout =
| { path: '/' }
| { path: '/admin' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
