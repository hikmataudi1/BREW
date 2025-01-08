import basket_icon from './basket_icon.png'
import logo from './logo.png'
import search_icon from './search_icon.png'
import menu_1 from './menu-v60.jpg'
import menu_2 from './menu-mp.jpg'
import menu_3 from './menu-chem.jpeg'
import menu_4 from './menu-fp.jpg'
import menu_5 from './menu-syph.jpg'
import menu_6 from './menu-sets.jpg'
import menu_7 from './menu-acc.jpg'
import product_1 from './product-1.png'
import product_2 from './product-2.jpeg'
import product_3 from './product-3.jpeg'
import product_4 from './product-4.jpeg'
import product_5 from './product-5.jpeg'
import product_6 from './product-6.png'
import product_7 from './product-7.png'
import product_8 from './product-8.jpeg'
import product_9 from './product-9.webp'
import product_10 from './product-10.webp'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'
import instagram_icon from './instagram_icon.png'
import whatsapp_icon from './whatsapp_icon.png'
import discount_icon from './discount_img.png'
import logo2 from './logo2.png'
import ebooklogo from './ebooklogo.png'
import arrow from './next.png'

export const assets = {
    logo,
    logo2,
    ebooklogo,
    basket_icon,
    // header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,
    whatsapp_icon,
    instagram_icon,
    discount_icon,
    arrow
}

export const menu_list = [
    {
        menu_name: "V60",
        menu_image: menu_1
    },
    {
        menu_name: "Moka Pot",
        menu_image: menu_2
    },
    {
        menu_name: "Chemex",
        menu_image: menu_3
    },
    {
        menu_name: "French Press",
        menu_image: menu_4
    },
    {
        menu_name: "Syphon",
        menu_image: menu_5
    },
    {
        menu_name: "Sets",
        menu_image: menu_6
    },
    {
        menu_name:"Accessories",
        menu_image:menu_7
    }
]

export const product_list = [
    {
        _id: "1",
        name: "Moka Pot",
        image: product_1,
        price: 12,
        description: "The best coffee maker in the world",
        category: "Moka Pot",
        type:"Premium"
    },
    {
        _id: "2",
        name: "Glass Chemex",
        image: product_2,
        price: 18,
        description: "The best coffee maker in the world",
        category: "Chemex",
        type:"Classic"
    }, {
        _id: "3",
        name: "Chemex",
        image: product_3,
        price: 16,
        description: "The best coffee maker in the world",
        category: "Chemex",
        type:"Premium"
    }, {
        _id: "4",
        name: "Glass French presss",
        image: product_4,
        price: 24,
        description: "The best coffee maker in the world",
        category: "French Press",
        type:"Classic"
    }, {
        _id: "5",
        name: "Stainless steel french press",
        image: product_5,
        price: 14,
        description: "The best coffee maker in the world",
        category: "French Press",
        type:"Premium"
    }, {
        _id: "6",
        name: "Coffee tamper",
        image: product_6,
        price: 12,
        description: "The best coffee maker in the world",
        category: "Accessories",
        type:"Classic"
    }, {
        _id: "7",
        name: "Syphon Coffee",
        image: product_7,
        price: 20,
        description: "The best coffee maker in the world",
        category: "Syphon",
        type:"Premium"
    }, {
        _id: "8",
        name: "Double Valve Moka Pot",
        image: product_8,
        price: 15,
        description: "The best coffee maker in the world",
        category: "Moka Pot",
        type:"Premium"
    }, {
        _id: "9",
        name: "Glass V60",
        image: product_9,
        price: 14,
        description: "The best coffee maker in the world",
        category: "V60",
        type:"Classic"
    }, {
        _id: "10",
        name: "V60 set",
        image: product_10,
        price: 22,
        description: "The best coffee maker in the world",
        category: "Sets",
        type:"Premium"
    }]
