import PgFavoritesDesign from 'generated/pages/pgFavorites';
import lviFavorites from 'components/LviFavorites'
import store from '../store/index'
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';
import LviFavorites from 'components/LviFavorites';

export default class PgFavorites extends PgFavoritesDesign {
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnAddAllToCart.text = global.lang.addAllToCart
    }
    initFavoriteList() {
        const products = store.getState().products;
        this.listView1.onRowBind = (listViewItem: lviFavorites, index: number) => {
            listViewItem.itemPrice = products[index].price
            listViewItem.itemTitle = products[index].name
            listViewItem.itemDesc = products[index].description
            listViewItem.itemImage = products[index].image
        };
        this.listView1.onRowHeight = (index) => LviFavorites.getHeight();
        this.listView1.itemCount = products.length;
        this.listView1.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgFavorites, superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = global.lang.favouriteHeader
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgFavorites, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false
    this.headerBar.title = 'Favorites'
    this.headerBar.backgroundColor = Color.WHITE;
    this.headerBar.android.elevation = 0;
    this.initFavoriteList();
}
