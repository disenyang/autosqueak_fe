import React from 'react';
import './index.scss';
import { Input } from 'antd';
import { UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';

export default function BasicLayout(params = { children: {} }) {
  return (
    <section className='basic-layout'>
      <header>
        <div className="head">Free UK Delivery - Orders over £100 </div>
        <div className="maxWidth">
          <div className="header flex-between">
            <a href="/homepage/">
              <div className="logo"></div>
            </a>
            <div className="flex-center shop nav">
              <div className="flex-center nav-first shop-nav active" style={{ "line-height": "1rem" }}>
                <a href="###">
                  <div>Shop</div>
                </a>
                <img src="/img/index/up1.png" className="down" />
                <img src="/img/index/UP.png" className="down-y" />
                <div className="imgUl">
                  <div className="flex-center" style={{ flexWrap: 'wrap' }}>
                    <a href="/store/?id=3" className="carui_box">
                      <img src="/img/index/carui1.png" className="carUi" />
                      <div className="carName">
                        <div>Chemical</div>
                        <div>Products</div>
                      </div>
                    </a>
                    <a href="/store/?id=4" className="carui_box">
                      <img src="/img/index/carui2.png" className="carUi" />
                      <div className="carName">
                        <div>Air</div>
                        <div>Fresheners</div>
                      </div>
                    </a>
                    <a href="/store/?id=6" className="carui_box">
                      <img src="/img/index/carui3.png" className="carUi" />
                      <div className="carName">
                        <div>H.P. Pump</div>
                        <div>and Parts</div>
                      </div>
                    </a>
                    <a href="/store/?id=7" className="carui_box">
                      <img src="/img/index/carui4.png" className="carUi" />
                      <div className="carName">
                        <div>Vacuum</div>
                        <div>Cleaners</div>
                      </div>
                    </a>
                    <a href="/store/?id=8" className="carui_box">
                      <img src="/img/index/carui5.png" className="carUi" />
                      <div className="carName">
                        <div>Aerosol</div>
                        <div>Products</div>
                      </div>
                    </a>
                    <a href="/store/?id=5" className="carui_box">
                      <img src="/img/index/carui6.png" className="carUi" />
                      <div className="carName">
                        <div>Compression</div>
                        <div>Sprayers</div>
                      </div>
                    </a>
                    <a href="/store/?id=9" className="carui_box">
                      <img src="/img/index/carui7.png" className="carUi" />
                      <div className="carName">
                        <div>Valeting</div>
                        <div>Accessories</div>
                      </div>
                    </a>
                    <a href="/store/?id=20" className="carui_box">
                      <img src="/img/index/carui8.png" className="carUi" />
                      <div className="carName">
                        <div>Pipe Fixing</div>
                        <div>And Fitting</div>
                      </div>
                    </a>
                    <a href="/store/?id=12" className="carui_box">
                      <img src="/img/index/carui12.png" className="carUi" />
                      <div className="carName">
                        <div>Microfibre</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <a href="/shapes/?id=17">
                <div className="design nav-item" style={{ margin: '0 0.28rem', fontWeight: '600' }}>Design My Air Freshener</div>
              </a>
              <a href="/about/">
                <div className="about nav-item">About</div>
              </a>
              <a href="/contact/">
                <div style={{ "margin": "0 0.28rem" }} className="contens nav-item">Contact</div>
              </a>
              {/* {% if request.user.is_anonymous %} */}
              <a href="login">
                <div className="about nav-item">Login/Register</div>
              </a>
              {/* {% else %} */}
              <a href="/my_details/manage_address/">
                <div style={{ margin: '0 0.2rem' }} className="about nav-item">My Account </div>
              </a>
              <a href="logout">
                <div className="about nav-item"> Log Out</div>
              </a>
              {/* {% endif %} */}
              <div className="flex-center" style={{ margin: '0 0.2rem 0 0.34rem' }}>
                <img src="/img/index/search.png" className="search" />
                <input placeholder="" className="ipt" />
              </div>
            </div>
            <div className="flex-center">
              <a href="cart" style={{ position: 'relative' }}>
                <img src="/img/index/box.png" className="box" />
                {/* <div className="round-num">{{ cartItems }}</div> */}
              </a>
              <button className="all">
                <img src="/img/index/menu.png" />
              </button>
            </div>
          </div>
          <div className="mask"></div>
          <div className="right-menu">
            <div className="flex-center" style={{ fontSize: '0.3rem', fontWeight: 600 }}>
              <div>Shop</div>
              <img src="/img/index/down3.png" style={{ width: '0.3rem', height: '0.34rem', marginLeft: '0.1rem' }} />
            </div>
            <div className="shopContent">
              <div><a href="/store/?id=3">Chemical Products</a></div>
              <div><a href="/store/?id=4">Air Fresheners</a></div>
              <div><a href="/store/?id=6">
                <div>H.P. Pump and Parts</div>
              </a></div>
              <div><a href="/store/?id=7">Vacuum Cleaners</a></div>
              <div><a href="/store/?id=8">Aerosol Products</a></div>
              <div><a href="/store/?id=5">
                <div>Compression Sprayers</div>
              </a></div>
              <div><a href="/store/?id=9">
                <div>Valeting Accessories</div>
              </a></div>
              <div><a href="/store/?id=20">
                <div>Pipe Fixing and Fitting</div>
              </a></div>
              <div><a href="/store/?id=12">
                <div>Microfibre</div>
              </a></div>
            </div>
            <div className="line"></div>
            <div className="mask_bottom">
              <a href="/shapes/?id=17" style={{ fontWeight: 600, lineHeight: "0.4rem", marginBottom: "0.3rem", fontSize: "0.3rem" }}>
                <div>Design My</div>
                <div>Air Freshener</div>
              </a>
              <a href="/about/">About</a>
              <a href="/contact/">Contact</a>
              {/* {% if request.user.is_anonymous %} */}
              <a href="url">Login / Register</a>
              {/* {% else %} */}
              <a href="/my_details/manage_address/">My Account</a>
              <a href="url">Log Out</a>
              {/* {% endif %} */}
              <div className="flex-center">
                <img src="/img/index/search.png" className="mask_search" />
                <input placeholder="" className="mask_ipt" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='basic-layout-content'>
        {params.children}
      </div>

      <footer>
        <div class="bottom">
          <a href="/homepage/"><img src="/img/index/logo1.png" class="botmImg" /></a>
          <div class="flex bottomBox">
            <div class="btmUl"><a href="/about/" style={{color: 'white'}}>About</a></div>
            <div class="btmUl"><a href="/contact/" style={{color: 'white'}}>Contact</a></div>
            <div class="btmUl"><a href="/termsdelivery/" style={{color: 'white'}}>Delivery & Returns</a></div>
            <div class="btmUl"><a href="/condition/" style={{color: 'white'}}>Terms & Conditions</a></div>
            <div class="btmUl"><a href="/privatepolicy/" style={{color: 'white'}}>Privacy Policy</a></div>
          </div>
          <div>Customer Support Team: 01234 555555</div>
        </div>
        <div class="foot">Copyright © 2021 AutoSqueak. All rights reserved.</div>
      </footer>

    </section>
  );
}
