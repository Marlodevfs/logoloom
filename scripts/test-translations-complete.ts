import { UI_TRANSLATIONS } from '../lib/i18n/interface';
import { DOCUMENT_TRANSLATIONS } from '../lib/i18n/documents';
import { LOCALES_METADATA } from '../lib/i18n/meta';
import { InterfaceLang } from '../types';

const LOCALES: InterfaceLang[] = ['en', 'fr', 'es', 'de', 'pt', 'it'];

function checkObjectKeys(
  dictName: string,
  baseObj: any,
  targetObj: any,
  lang: string,
  path = ''
): { missing: string[]; empty: string[] } {
  const missing: string[] = [];
  const empty: string[] = [];

  for (const key of Object.keys(baseObj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (!(key in targetObj)) {
      missing.push(`[${dictName}] Language '${lang}' missing key: ${currentPath}`);
      continue;
    }

    const baseVal = baseObj[key];
    const targetVal = targetObj[key];

    if (typeof baseVal === 'string') {
      if (typeof targetVal !== 'string' || targetVal.trim().length === 0) {
        empty.push(`[${dictName}] Language '${lang}' has empty or invalid string at: ${currentPath}`);
      }
    } else if (Array.isArray(baseVal)) {
      if (!Array.isArray(targetVal) || targetVal.length === 0) {
        empty.push(`[${dictName}] Language '${lang}' has empty or missing array at: ${currentPath}`);
      } else {
        targetVal.forEach((item, idx) => {
          if (typeof item === 'string' && item.trim().length === 0) {
            empty.push(`[${dictName}] Language '${lang}' has empty string in array at: ${currentPath}[${idx}]`);
          } else if (typeof item === 'object' && item !== null) {
            const sub = checkObjectKeys(dictName, baseVal[idx] || baseVal[0], item, lang, `${currentPath}[${idx}]`);
            missing.push(...sub.missing);
            empty.push(...sub.empty);
          }
        });
      }
    } else if (typeof baseVal === 'object' && baseVal !== null) {
      if (typeof targetVal !== 'object' || targetVal === null) {
        missing.push(`[${dictName}] Language '${lang}' missing object at: ${currentPath}`);
      } else {
        const sub = checkObjectKeys(dictName, baseVal, targetVal, lang, currentPath);
        missing.push(...sub.missing);
        empty.push(...sub.empty);
      }
    }
  }

  return { missing, empty };
}

function runTranslationAudit() {
  console.log('🌐 Starting Automated Translation Completeness & Non-Empty Check...');
  let totalErrors = 0;

  // 1. Audit UI Translations
  console.log('\n🔍 Auditing UI Interface Translations:');
  const enUI = UI_TRANSLATIONS.en;
  for (const lang of LOCALES) {
    if (lang === 'en') continue;
    const { missing, empty } = checkObjectKeys('UI', enUI, UI_TRANSLATIONS[lang], lang);
    if (missing.length === 0 && empty.length === 0) {
      console.log(`   ✅ [UI] ${lang.toUpperCase()}: 100% key parity & non-empty (${Object.keys(enUI).length} keys)`);
    } else {
      missing.forEach((msg) => console.error(`   ❌ ${msg}`));
      empty.forEach((msg) => console.error(`   ❌ ${msg}`));
      totalErrors += missing.length + empty.length;
    }
  }

  // 2. Audit Document Translations
  console.log('\n📄 Auditing Document Template Translations:');
  const enDoc = DOCUMENT_TRANSLATIONS.en;
  for (const lang of LOCALES) {
    if (lang === 'en') continue;
    const { missing, empty } = checkObjectKeys('DOC', enDoc, DOCUMENT_TRANSLATIONS[lang], lang);
    if (missing.length === 0 && empty.length === 0) {
      console.log(`   ✅ [DOC] ${lang.toUpperCase()}: 100% key parity & non-empty across templates`);
    } else {
      missing.forEach((msg) => console.error(`   ❌ ${msg}`));
      empty.forEach((msg) => console.error(`   ❌ ${msg}`));
      totalErrors += missing.length + empty.length;
    }
  }

  // 3. Audit Locales Metadata
  console.log('\n🏷️ Auditing SEO Metadata Translations:');
  for (const lang of LOCALES) {
    const meta = LOCALES_METADATA[lang];
    if (meta && meta.title && meta.description && meta.ogLocale) {
      console.log(`   ✅ [SEO] ${lang.toUpperCase()}: Valid localized title, description & ogLocale (${meta.ogLocale})`);
    } else {
      console.error(`   ❌ [SEO] ${lang.toUpperCase()}: Incomplete SEO metadata`);
      totalErrors += 1;
    }
  }

  if (totalErrors === 0) {
    console.log('\n🎉 ALL TRANSLATION PARITY & QUALITY CHECKS PASSED (0 errors)!');
    process.exit(0);
  } else {
    console.error(`\n❌ TRANSLATION AUDIT FAILED with ${totalErrors} issue(s).`);
    process.exit(1);
  }
}

runTranslationAudit();
