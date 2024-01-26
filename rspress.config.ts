import * as path from 'path';
import { defineConfig } from 'rspress/config';
import zhCN from 'antd/locale/zh_CN';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'BlockChainTools',
  description: 'blockchain tool, TgPet tool',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'twitter', mode: 'link', content: '' }
      // { icon: 'github', mode: 'link', content: 'https://github.com/web-infra-dev/rspress' },
    ],
  },
  markdown: {
    globalComponents: []
  },
  globalStyles: path.join(__dirname, 'styles/index.scss'),
  globalUIComponents: [
    // path.join(__dirname, 'components', 'Custom.tsx')
  ]
});
