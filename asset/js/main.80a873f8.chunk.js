(this["webpackJsonpbabyghosts-website"] =
  this["webpackJsonpbabyghosts-website"] || []).push([
  [0],
  {
    233: function (e) {
      e.exports = JSON.parse(
        '[{"inputs":[{"internalType":"string","name":"_baseTokenURI","type":"string"},{"internalType":"string","name":"_contractURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"hasPresaleAccess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mainSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"preMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"preMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"presaleAccessList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseTokenURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_contractURI","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxMint","type":"uint256"}],"name":"setMaxMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPreMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addressList","type":"address[]"}],"name":"setPresaleAccessList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_mainSale","type":"bool"}],"name":"updateMainSaleStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"payable","type":"function"}]'
      );
    },
    247: function (e, t) {},
    249: function (e, t) {},
    251: function (e, t) {},
    255: function (e, t) {},
    282: function (e, t) {},
    284: function (e, t) {},
    293: function (e, t) {},
    295: function (e, t) {},
    305: function (e, t) {},
    307: function (e, t) {},
    423: function (e, t) {},
    425: function (e, t) {},
    432: function (e, t) {},
    433: function (e, t) {},
    451: function (e, t) {},
    524: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(22),
        i = n.n(a),
        s = n(212),
        p = n.n(s),
        u = n(14),
        r = n.n(u),
        o = n(24),
        y = n(66),
        l =
          (n(213),
          n(233),
          (0, n(525).createAlchemyWeb3)(
            "https://eth-mainnet.alchemyapi.io/v2/oGUEW2c1kufckRE46DYY_nzVinvDvx6w"
          ),
          (function () {
            var e = Object(o.a)(
              r.a.mark(function e() {
                var t;
                return r.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (window.ethereum) {
                            e.next = 2;
                            break;
                          }
                          return e.abrupt("return", {
                            status:
                              "\ud83e\udd8a You need to install <a href='https://metamask.io/download.html' rel='noreferrer' target='_blank'>Metamask</a>",
                          });
                        case 2:
                          return (
                            (e.prev = 2),
                            (e.next = 5),
                            window.ethereum.request({ method: "eth_accounts" })
                          );
                        case 5:
                          if (!((t = e.sent).length > 0)) {
                            e.next = 10;
                            break;
                          }
                          return e.abrupt("return", { address: t[0] });
                        case 10:
                          return e.abrupt("return", {
                            address: "",
                            status:
                              "\ud83e\udd8a Connect to Metamask using the button below",
                          });
                        case 11:
                          e.next = 16;
                          break;
                        case 13:
                          return (
                            (e.prev = 13),
                            (e.t0 = e.catch(2)),
                            e.abrupt("return", {
                              address: "",
                              status: "\ud83d\ude25 " + e.t0.message,
                            })
                          );
                        case 16:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[2, 13]]
                );
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })()),
        d = n(8),
        c = function () {
          var e = Object(a.useState)(""),
            t = Object(y.a)(e, 2),
            n = (t[0], t[1]),
            i = Object(a.useState)(""),
            s = Object(y.a)(i, 2),
            p = (s[0], s[1]),
            u = Object(a.useState)("0"),
            c = Object(y.a)(u, 2),
            m = (c[0], c[1], Object(a.useState)("10 000")),
            b = Object(y.a)(m, 2);
          b[0], b[1];
          Object(a.useEffect)(function () {
            function e() {
              return (e = Object(o.a)(
                r.a.mark(function e() {
                  var t, a, i;
                  return r.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), l();
                        case 2:
                          (t = e.sent),
                            (a = t.address),
                            (i = t.status),
                            n(a),
                            p(i),
                            window.initAnchors();
                        case 8:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )).apply(this, arguments);
            }
            !(function () {
              e.apply(this, arguments);
            })();
          }, []);
          var f = (function () {
            var e = Object(o.a)(
              r.a.mark(function e() {
                return r.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        window.gtag("event", "OpenSea", {
                          event_category: "Baby Ghosts Website",
                        });
                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
          return Object(d.jsxs)("div", {
            className: "form",
            children: [ 
              Object(d.jsx)("a",{ 
                onClick: f,
                href: "https://opensea.io/collection/the-drunk-divers",
                className: "btn-primary",
                target: "_blank",
                rel: "noreferrer",
                children: Object(d.jsxs)("span", {
                  className: "btn-inner",
                  children: [
                    "Lunching Soon",
                    
                  ],
                }),
              }),
            ],
          });
        };
      var m = function () {
          return Object(d.jsx)(c, {});
        },
        b = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 529))
              .then(function (t) {
                var n = t.getCLS,
                  a = t.getFID,
                  i = t.getFCP,
                  s = t.getLCP,
                  p = t.getTTFB;
                n(e), a(e), i(e), s(e), p(e);
              });
        };
      p.a.render(
        Object(d.jsx)(i.a.StrictMode, { children: Object(d.jsx)(m, {}) }),
        document.getElementById("mint")
      ),
        b();
    },
  },
  [[524, 1, 2]],
]);
