import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import styles from './styles.module.css';

function VietnamFlag() {
  return (
    <svg className={styles.flagIcon} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#da251d" />
      <path
        fill="#ff0"
        d="M16 6.2l2.25 6.93h7.29l-5.9 4.28 2.25 6.93L16 20.06l-5.9 4.28 2.25-6.93-5.9-4.28h7.29L16 6.2z"
      />
    </svg>
  );
}

function UnitedStatesFlag() {
  return (
    <svg className={styles.flagIcon} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <clipPath id="usFlagClip">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#usFlagClip)">
        <path fill="#fff" d="M0 0h32v32H0z" />
        {Array.from({length: 7}).map((_, index) => (
          <path key={index} fill="#b22234" d={`M0 ${index * 4.92}h32v2.46H0z`} />
        ))}
        <path fill="#3c3b6e" d="M0 0h15.2v17.2H0z" />
        {Array.from({length: 18}).map((_, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          return (
            <circle
              key={index}
              cx={2.4 + col * 4.6 + (row % 2) * 1.2}
              cy={2.5 + row * 2.8}
              r="0.55"
              fill="#fff"
            />
          );
        })}
      </g>
    </svg>
  );
}

function FlagIcon({locale}) {
  return locale === 'en' ? <UnitedStatesFlag /> : <VietnamFlag />;
}

function LocaleLabel({locale, children}) {
  return (
    <span className={styles.flagLabel}>
      <FlagIcon locale={locale} />
      <span>{children}</span>
    </span>
  );
}

function useLocaleDropdownUtils() {
  const {
    siteConfig,
    i18n: {localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  const getLocaleConfig = (locale) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(`No locale config found for locale=${locale}`);
    }
    return localeConfig;
  };

  const getBaseURLForLocale = (locale) => {
    const localeConfig = getLocaleConfig(locale);
    const isSameDomain = localeConfig.url === siteConfig.url;
    if (isSameDomain) {
      return `pathname://${alternatePageUtils.createUrl({
        locale,
        fullyQualified: false,
      })}`;
    }
    return alternatePageUtils.createUrl({
      locale,
      fullyQualified: true,
    });
  };

  return {
    getURL: (locale, options) => {
      const finalSearch = mergeSearchStrings([search, options.queryString], 'append');
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale) => getLocaleConfig(locale).label,
    getLang: (locale) => getLocaleConfig(locale).htmlLang,
  };
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}) {
  const utils = useLocaleDropdownUtils();
  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();

  const localeItems = locales.map((locale) => ({
    label: <LocaleLabel locale={locale}>{utils.getLabel(locale)}</LocaleLabel>,
    lang: utils.getLang(locale),
    to: utils.getURL(locale, {queryString}),
    target: '_self',
    autoAddBaseUrl: false,
    className:
      locale === currentLocale
        ? mobile
          ? 'menu__link--active'
          : 'dropdown__link--active'
        : '',
  }));

  const dropdownLabel = mobile
    ? translate({
        message: 'Ngôn ngữ',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : utils.getLabel(currentLocale);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={<LocaleLabel locale={currentLocale}>{dropdownLabel}</LocaleLabel>}
      items={[...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter]}
    />
  );
}
