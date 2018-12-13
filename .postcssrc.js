// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: [
        '.ignore',
        '.hairlines',
        '.vux',
        '.vux-header',
        '.vux-header-left',
        '.vux-header-back',
        '.vux-header-title',
        '.vux-header-right',
        'vux-header',
        'vux-header-left',
        'vux-header-back',
        'vux-header-title',
        'vux-header-right',
        'left-arrow',
        'weui-grids',
        'weui-grid',
        'weui-grid__icon',
        'weui-grid__label',
        'weui-cell',
        'weui-cell__hd',
        'vux-x-input-n1lec',
        'weui-cell__bd',
        'weui-cell__ft',
        'weui-icon',
        'vux-toast',
        'weui-icon_toast',
        'weui-toast__content',
        'vux-x-dialog',
        'weui-dialog',
        'weui-dialog__hd',
        'weui-dialog__bd',
        'weui-dialog__ft',
        'weui-dialog__btn',
        'vux-actionsheet',
        'weui-actionsheet__menu',
        'weui-actionsheet__cell',
        'weui-tabbar',
        'weui-tabbar__item',
        'weui-tabbar__icon',
        'weui-tabbar__label',
        'select-person-main',
        'meeting-main'
      ],
      minPixelValue: 1,
      mediaQuery: false
    },
    "postcss-viewport-units": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
  }
}
