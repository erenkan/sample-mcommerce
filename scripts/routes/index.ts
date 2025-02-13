import buildExtender from '@smartface/extension-utils/lib/router/buildExtender';
import '@smartface/extension-utils/lib/router/goBack'; // Implements onBackButtonPressed
import { BottomTabBarRouter, NativeRouter as Router, NativeStackRouter as StackRouter, Route } from '@smartface/router';
import * as Pages from 'pages';
import Color from '@smartface/native/ui/color';
import TabBarItem from '@smartface/native/ui/tabbaritem';
import Image from '@smartface/native/ui/image';
import backClose from '@smartface/extension-utils/lib/router/back-close';
import Application from '@smartface/native/application';
backClose.setDefaultBackStyle({ image: Image.createFromFile('images://backbtn.png'), hideTitle: true });
backClose.dismissBuilder = () => {
  return {
    image: Image.createFromFile('images://backbtn.png'),
    position: backClose.DismissPosition.LEFT,
  };
};
import store from '../store/index';

let btbItemCart = new TabBarItem();
btbItemCart.title = global.lang.cart;
btbItemCart.icon = Image.createFromFile('images://tabiconcart.png');
store.subscribe(() => {
  btbItemCart.badge.text = store.getState().basket && store.getState().basket.length > 0 ? store.getState().basket.reduce((total, product) => total + product.count, 0) : 0;
  if (parseInt(btbItemCart.badge.text) === 0) {
    btbItemCart.badge.visible = false; // default false
  } else {
    btbItemCart.badge.visible = true;
  }
  if (parseInt(btbItemCart.badge.text) > 10) {
    btbItemCart.badge.text = '10+';
  }
});
btbItemCart.badge.backgroundColor = Color.create('#53b175');

const router = Router.of({
  path: '/',
  isRoot: true,
  routes: [
    StackRouter.of({
      path: '/pages',
      routes: [
        Route.of({
          path: '/pages/pgWelcome',
          build: buildExtender({
            getPageClass: () => Pages.pgWelcome,
            headerBarStyle: { visible: true },
          }),
        }),
        Route.of({
          path: '/pages/pgSignIn',
          build: buildExtender({
            getPageClass: () => Pages.pgSignIn,
            headerBarStyle: { visible: true },
          }),
        }),
        Route.of({
          path: '/pages/pgNumber',
          build: buildExtender({
            getPageClass: () => Pages.pgNumber,
            headerBarStyle: { visible: true },
          }),
        }),
        Route.of({
          path: '/pages/pgVerification',
          build: buildExtender({
            getPageClass: () => Pages.pgVerification,
            headerBarStyle: { visible: true },
          }),
        }),
        Route.of({
          path: '/pages/pgLogin',
          build: buildExtender({
            getPageClass: () => Pages.pgLogin,
            headerBarStyle: { visible: true },
          }),
        }),
        Route.of({
          path: '/pages/pgSignUp',
          build: buildExtender({
            getPageClass: () => Pages.pgSignUp,
            headerBarStyle: { visible: true },
          }),
        }),
      ],
    }),
    BottomTabBarRouter.of({
      path: '/btb',
      to: '/btb/tab1/home',
      homeRoute: 0,
      tabbarParams: () => ({
        ios: { translucent: false },
        itemColor: {
          normal: Color.create('#181725'),
          selected: Color.create('#53B175'),
        },
        backgroundColor: Color.create('#FFFFFF'),
      }),
      items: [
        { title: global.lang.shop, icon: Image.createFromFile('images://tabiconhome.png') },
        { title: global.lang.explore, icon: Image.createFromFile('images://tabiconexplore.png') },
        btbItemCart,
        { title: global.lang.favourite, icon: Image.createFromFile('images://tabiconfavorite.png') },
        { title: global.lang.account, icon: Image.createFromFile('images://tabiconuser.png') },
      ],
      // tab1
      routes: [
        // tab1
        StackRouter.of({
          path: '/btb/tab1',
          to: '/btb/tab1/home',
          routes: [
            Route.of({
              path: '/btb/tab1/home',
              build: buildExtender({ getPageClass: () => require('pages/pgHome').default }),
            }),
            // Route.of({
            //     path: "/btb/tab1/productDetail",
            //     build: buildExtender({ getPageClass: () => require("pages/pgProductDetail").default })
            // }),
            StackRouter.of({
              path: '/btb/tab1/productDetail',
              to: '/btb/tab1/productDetail/main',
              modal: true,
              routes: [
                Route.of({
                  path: '/btb/tab1/productDetail/main',
                  build: buildExtender({ getPageClass: () => require('pages/pgProductDetail').default, headerBarStyle: { visible: true } }),
                }),
              ],
            }),
          ],
        }),
        // tab2
        StackRouter.of({
          path: '/btb/tab2',
          to: '/btb/tab2/categories',
          routes: [
            Route.of({
              path: '/btb/tab2/categories',
              build: buildExtender({ getPageClass: () => require('pages/pgCategories').default, headerBarStyle: { visible: true } }),
            }),
          ],
        }),
        StackRouter.of({
          path: '/btb/tab3',
          to: '/btb/tab3/cart',
          routes: [
            Route.of({
              path: '/btb/tab3/cart',
              build: buildExtender({ getPageClass: () => require('pages/pgCart').default, headerBarStyle: { visible: true } }),
            }),
          ],
        }),
        StackRouter.of({
          path: '/btb/tab4',
          to: '/btb/tab4/favorites',
          routes: [
            Route.of({
              path: '/btb/tab4/favorites',
              build: buildExtender({ getPageClass: () => require('pages/pgFavorites').default, headerBarStyle: { visible: true } }),
            }),
          ],
        }),
        StackRouter.of({
          path: '/btb/tab5',
          to: '/btb/tab5/account',
          routes: [
            Route.of({
              path: '/btb/tab5/account',
              build: buildExtender({ getPageClass: () => require('pages/pgAccount').default, headerBarStyle: { visible: true } }),
            }),
            StackRouter.of({
              path: '/btb/tab5/settings',
              to: '/btb/tab5/settings/main',
              modal: true,
              routes: [
                Route.of({
                  path: '/btb/tab5/settings/main',
                  build: buildExtender({ getPageClass: () => require('pages/pgUserSettings').default, headerBarStyle: { visible: true } }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

router.listen(() => {
  Application.hideKeyboard();
});
export default router;
