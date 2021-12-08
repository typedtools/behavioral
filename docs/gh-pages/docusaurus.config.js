/* eslint-disable */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Behavioral',
  tagline: 'Makes BDD easy',
  url: 'https://typedtools.github.io',
  baseUrl: '/behavioral/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'typedtools',
  projectName: 'behavioral',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/typedtools/behavioral/edit/docs/gh-pages/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Behavioral',
        logo: {
          alt: 'Behavioral Logo',
          src: '/behavioral/img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'installation',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/typedtools/behavioral',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/installation',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/behavioral',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/behavioral',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/behavioral',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/typedtools/behavioral',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TypedTools, Inc. Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: ['gherkin'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
